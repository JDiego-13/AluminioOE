import { jsPDF, GState } from 'jspdf';
import type { Product } from '../types/Product';
import { CONTACT } from '../data/config';

// Paleta (coincide con el acento de la web: --accent / --text)
const ACCENT: [number, number, number] = [82, 96, 109]; // #52606d
const ACCENT_DARK: [number, number, number] = [28, 30, 34]; // #1c1e22
const SURFACE_ALT: [number, number, number] = [238, 240, 243]; // #eef0f3
const TEXT_MUTED: [number, number, number] = [107, 114, 128]; // #6b7280

const gamaLabel: Record<Product['gama'], string> = {
  sencillo: 'Diseño sencillo',
  intermedio: 'Diseño intermedio',
  elaborado: 'Diseño elaborado',
};

const colorLabel: Record<Product['colores'][number], string> = {
  blanco: 'Blanco',
  negro: 'Negro',
  madera: 'Color madera',
  'gris-europa': 'Gris europa',
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Quema el texto de marca de agua directamente en los píxeles de la imagen.
function watermarkImage(img: HTMLImageElement, text: string): string {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d')!;

  ctx.drawImage(img, 0, 0);

  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  ctx.lineWidth = 2;
  ctx.font = `${Math.round(canvas.width * 0.045)}px sans-serif`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((-30 * Math.PI) / 180);

  const stepX = canvas.width * 0.95;
  const stepY = canvas.height * 0.6;

  for (let y = -canvas.height; y < canvas.height; y += stepY) {
    for (let x = -canvas.width; x < canvas.width; x += stepX) {
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
    }
  }
  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.85);
}

// Recorta la imagen en un círculo (para el logo de portada).
function makeCircularLogo(img: HTMLImageElement, size = 400): string {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.save();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  const scale = Math.max(size / img.naturalWidth, size / img.naturalHeight);
  const drawW = img.naturalWidth * scale;
  const drawH = img.naturalHeight * scale;
  ctx.drawImage(img, (size - drawW) / 2, (size - drawH) / 2, drawW, drawH);

  ctx.restore();

  return canvas.toDataURL('image/png');
}

// Header discreto para páginas de producto: logo pequeño + nombre + línea de acento.
function drawPageHeader(
  pdf: jsPDF,
  logo: HTMLImageElement | null,
  pageWidth: number,
  margin: number,
): number {
  const headerY = margin;

  if (logo) {
    const logoH = 14;
    const logoW = (logo.naturalWidth / logo.naturalHeight) * logoH;
    pdf.addImage(logo, 'PNG', margin, headerY, logoW, logoH);
  }

  pdf.setFontSize(10);
  pdf.setTextColor(...ACCENT);
  pdf.text(CONTACT.nombreNegocio, pageWidth - margin, headerY + 9, { align: 'right' });

  const lineY = headerY + 18;
  pdf.setDrawColor(...ACCENT);
  pdf.setLineWidth(0.6);
  pdf.line(margin, lineY, pageWidth - margin, lineY);

  return lineY + 8;
}

// Pastilla de color con texto centrado (badges y tags).
function drawPill(
  pdf: jsPDF,
  text: string,
  x: number,
  y: number,
  fill: [number, number, number],
  textColor: [number, number, number],
): number {
  pdf.setFontSize(9);
  const textWidth = pdf.getTextWidth(text);
  const paddingX = 4;
  const pillWidth = textWidth + paddingX * 2;
  const pillHeight = 6.5;

  pdf.setFillColor(...fill);
  pdf.roundedRect(x, y, pillWidth, pillHeight, 3, 3, 'F');
  pdf.setTextColor(...textColor);
  pdf.text(text, x + paddingX, y + 4.6);

  return pillWidth;
}

export async function generateCatalogPDF(
  products: Product[],
  onProgress?: (done: number, total: number) => void,
) {
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const watermarkText = `${CONTACT.nombreNegocio} · ${CONTACT.whatsappNumber}`;

  const logoPath = `${window.location.origin}${window.location.pathname.replace(/\/[^/]*$/, '/')}logoOE.png`;
  let logo: HTMLImageElement | null = null;
  try {
    logo = await loadImage(logoPath);
  } catch {
    // si no carga el logo, seguimos sin él
  }

  // ---------- Portada ----------

  // Fondo con degradado suave (generado en canvas)
  const bgCanvas = document.createElement('canvas');
  bgCanvas.width = 600;
  bgCanvas.height = Math.round((pageHeight / pageWidth) * 600);
  const bgCtx = bgCanvas.getContext('2d')!;
  const grad = bgCtx.createLinearGradient(0, 0, 0, bgCanvas.height);
  grad.addColorStop(0, '#1c1e22');
  grad.addColorStop(1, '#3a4048');
  bgCtx.fillStyle = grad;
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  const bandHeightRatio = 0.42;
  const bandHeight = pageHeight * bandHeightRatio;

  pdf.addImage(
    bgCanvas.toDataURL('image/jpeg', 0.9),
    'JPEG',
    0,
    0,
    pageWidth,
    bandHeight,
  );

  if (logo) {
    const logoSize = 50;
    const circularLogo = makeCircularLogo(logo);
    const logoY = bandHeight / 2 - logoSize / 2 - 6;

    pdf.setFillColor(255, 255, 255);
    pdf.circle(pageWidth / 2, logoY + logoSize / 2, logoSize / 2 + 3, 'F');
    pdf.addImage(circularLogo, 'PNG', pageWidth / 2 - logoSize / 2, logoY, logoSize, logoSize);
  }

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.text(CONTACT.nombreNegocio, pageWidth / 2, bandHeight - 14, { align: 'center' });

  pdf.setFontSize(11);
  pdf.setTextColor(210, 213, 218);
  pdf.text('PUERTAS Y VENTANAS DE ALUMINIO · VIDRIO TEMPLADO', pageWidth / 2, bandHeight - 6, {
    align: 'center',
  });

  let coverY = bandHeight + 26;

  pdf.setFontSize(16);
  pdf.setTextColor(...ACCENT_DARK);
  pdf.text('Catálogo de trabajos', pageWidth / 2, coverY, { align: 'center' });
  coverY += 8;

  pdf.setDrawColor(...ACCENT);
  pdf.setLineWidth(0.8);
  pdf.line(pageWidth / 2 - 18, coverY, pageWidth / 2 + 18, coverY);
  coverY += 14;

  pdf.setFontSize(11);
  pdf.setTextColor(...TEXT_MUTED);
  pdf.text('Diseños modernos, acabados de calidad y trabajo garantizado.', pageWidth / 2, coverY, {
    align: 'center',
  });
  coverY += 20;

  const contactText = `Cotizaciones y contacto: ${CONTACT.whatsappNumber}`;
  pdf.setFontSize(11);
  const contactWidth = pdf.getTextWidth(contactText) + 16;
  pdf.setFillColor(...ACCENT);
  pdf.roundedRect(pageWidth / 2 - contactWidth / 2, coverY, contactWidth, 10, 5, 5, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.text(contactText, pageWidth / 2, coverY + 6.8, { align: 'center' });
  coverY += 24;

  pdf.setFontSize(9);
  pdf.setTextColor(...TEXT_MUTED);
  pdf.text(
    'Puertas · Ventanas · Cancelería · Domos · Alacenas · Cocinas Integrales',
    pageWidth / 2,
    coverY,
    { align: 'center' },
  );

  // ---------- Una página por producto ----------
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    pdf.addPage();

    const contentTop = drawPageHeader(pdf, logo, pageWidth, margin);

    const imagenes = product.media.filter((m) => m.type === 'image');
    const gridTop = contentTop;
    const gridHeight = 115;
    const gap = 4;
    const cols = imagenes.length <= 1 ? 1 : 2;
    const rows = Math.max(1, Math.ceil(imagenes.length / cols));
    const cellWidth = (pageWidth - margin * 2 - gap * (cols - 1)) / cols;
    const cellHeight = (gridHeight - gap * (rows - 1)) / rows;

    for (let idx = 0; idx < imagenes.length; idx++) {
      const media = imagenes[idx];
      try {
        const img = await loadImage(media.src);
        const dataUrl = watermarkImage(img, watermarkText);

        const scale = Math.min(cellWidth / img.naturalWidth, cellHeight / img.naturalHeight);
        const drawW = img.naturalWidth * scale;
        const drawH = img.naturalHeight * scale;

        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const cellX = margin + col * (cellWidth + gap);
        const cellY = gridTop + row * (cellHeight + gap);
        const offsetX = cellX + (cellWidth - drawW) / 2;
        const offsetY = cellY + (cellHeight - drawH) / 2;

        pdf.addImage(dataUrl, 'JPEG', offsetX, offsetY, drawW, drawH);
      } catch {
        // si una foto falla, seguimos con las demás
      }
    }

    let y = gridTop + gridHeight + 10;

    pdf.setFontSize(16);
    pdf.setTextColor(...ACCENT_DARK);
    pdf.text(product.nombre, margin, y);

    const badgeText = gamaLabel[product.gama];
    pdf.setFontSize(9);
    const badgeWidth = pdf.getTextWidth(badgeText) + 8;
    drawPill(pdf, badgeText, pageWidth - margin - badgeWidth, y - 5, ACCENT, [255, 255, 255]);

    y += 8;

    pdf.setFontSize(10);
    const desc = pdf.splitTextToSize(product.descripcion, pageWidth - margin * 2 - 10);
    const boxHeight = desc.length * 5 + 8;

    pdf.setFillColor(...SURFACE_ALT);
    pdf.roundedRect(margin, y, pageWidth - margin * 2, boxHeight, 2, 2, 'F');
    pdf.setTextColor(...TEXT_MUTED);
    pdf.text(desc, margin + 5, y + 7);

    y += boxHeight + 8;

    pdf.setFontSize(9);
    pdf.setTextColor(...ACCENT_DARK);
    pdf.text('Colores disponibles:', margin, y + 4.6);
    let tagX = margin + pdf.getTextWidth('Colores disponibles:') + 6;

    for (const c of product.colores) {
      const label = colorLabel[c];
      const w = drawPill(pdf, label, tagX, y, [255, 255, 255], ACCENT);
      pdf.setDrawColor(...ACCENT);
      pdf.roundedRect(tagX, y, w, 6.5, 3, 3, 'S');
      tagX += w + 4;
    }

    onProgress?.(i + 1, products.length);
  }

  // ---------- Marca de agua diagonal de texto, en cada página ----------
  const totalPages = pdf.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    pdf.setPage(p);
    pdf.saveGraphicsState();
    pdf.setGState(new GState({ opacity: 0.07 }));
    pdf.setFontSize(46);
    pdf.setTextColor(120);
    pdf.text(CONTACT.nombreNegocio, pageWidth / 2, pageHeight - 20, {
      align: 'center',
      angle: 20,
    });
    pdf.restoreGraphicsState();
  }

  pdf.save('catalogo-olegario-espinoza.pdf');
}