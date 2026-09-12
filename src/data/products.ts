import type { Product } from "../types/Product";

const base = import.meta.env.BASE_URL; // resuelve a '/catalogo-aluminio/' en build y dev

export const products: Product[] = [
  {
    id: "puerta-corrediza-01",
    nombre: "Puerta Corrediza Linea Moderna",
    categoria: "puertas",
    colores: ["blanco", "negro", "gris-europa"],
    gama: "intermedio",
    descripcion:
      "Perfil grueso, deslizamiento suave, ideal para accesos amplios a jardín o terraza.",
    media: [
      {
        type: "image",
        src: `${base}images/puerta-corrediza-01-1.jpg`,
        alt: "Puerta corrediza vista frontal",
      },
      {
        type: "image",
        src: `${base}images/puerta-corrediza-01-2.jpg`,
        alt: "Puerta corrediza detalle riel",
      },
    ],
  },
  {
    id: "ventana-fija-01",
    nombre: "Ventana Fija Minimalista",
    categoria: "ventanas",
    colores: ["blanco", "madera"],
    gama: "sencillo",
    descripcion:
      "Perfil delgado, máxima entrada de luz, acabado limpio sin divisiones.",
    media: [
      {
        type: "image",
        src: `${base}images/ventana-fija-01-1.png`,
        alt: "Ventana fija minimalista",
      },
    ],
  },
  {
    id: "canceleria-bano-01",
    nombre: "Cancelería de Baño Templada",
    categoria: "canceleria",
    colores: ["negro", "gris-europa"],
    gama: "elaborado",
    descripcion:
      "Vidrio templado con herrajes de acero inoxidable, diseño a la medida.",
    media: [
      {
        type: "image",
        src: `${base}images/canceleria-bano-01.png`,
        alt: "Cancelería de baño templada",
      },
    ],
  },
  {
    id: "domo-01",
    nombre: "Domo Estructural",
    categoria: "domos",
    colores: ["blanco"],
    gama: "elaborado",
    descripcion:
      "Estructura reforzada para grandes claros, ideal para patios centrales.",
    media: [
      {
        type: "image",
        src: `${base}images/domo-01-1.jpg`,
        alt: "Domo estructural instalado",
      },
    ],
  },
];
