import { motion } from "framer-motion";
import type { Product } from "../types/Product";

const gamaLabel: Record<Product["gama"], string> = {
  sencillo: "Diseño sencillo",
  intermedio: "Diseño intermedio",
  elaborado: "Diseño elaborado",
};

const colorLabel: Record<Product["colores"][number], string> = {
  blanco: "Blanco",
  negro: "Negro",
  madera: "Color madera",
  "gris-europa": "Gris europa",
};

interface Props {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: Props) {
  const cover = product.media[0];

  return (
    <motion.div
      className="product-card"
      onClick={onClick}
      whileHover={{ y: -6, boxShadow: '0 12px 24px rgba(0,0,0,0.25)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="product-card__media">
        {cover.type === 'image' ? (
          <img src={cover.src} alt={cover.alt} loading="lazy" />
        ) : (
          <video src={cover.src} muted loop autoPlay playsInline />
        )}
        <span className="product-card__badge">{gamaLabel[product.gama]}</span>
      </div>

      <div className="product-card__body">
        <h3>{product.nombre}</h3>
        <p className="product-card__desc">{product.descripcion}</p>

        <div className="product-card__colores">
          {product.colores.map((c) => (
            <span key={c} className="product-card__color-tag">
              {colorLabel[c]}
            </span>
          ))}
        </div>

        <span className="product-card__cta-hint">Ver detalles →</span>
      </div>
    </motion.div>
  );
}