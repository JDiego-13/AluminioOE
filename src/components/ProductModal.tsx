import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "../types/Product";
import { CONTACT } from "../data/config";

interface Props {
  product: Product | null;
  onClose: () => void;
}

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

export function ProductModal({ product, onClose }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const total = product?.media.length ?? 0;

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 3000);
    return () => clearInterval(timer);
  }, [total, index]);

  if (!product) return null;

  const actual = product.media[index];

  const siguiente = () => setIndex((i) => (i + 1) % total);
  const anterior = () => setIndex((i) => (i - 1 + total) % total);

  const mensaje = encodeURIComponent(
    `Hola, me interesa cotizar: ${product.nombre}`,
  );
  const whatsappLink = `https://wa.me/${CONTACT.whatsappNumber}?text=${mensaje}`;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal__close" onClick={onClose}>
            ✕
          </button>

          <div className="modal__slider">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="modal__slide"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
              >
                {actual.type === "image" ? (
                  <img src={actual.src} alt={actual.alt} />
                ) : (
                  <video src={actual.src} controls />
                )}
              </motion.div>
            </AnimatePresence>

            {total > 1 && (
              <>
                <button
                  className="modal__nav modal__nav--prev"
                  onClick={anterior}
                >
                  ‹
                </button>
                <button
                  className="modal__nav modal__nav--next"
                  onClick={siguiente}
                >
                  ›
                </button>

                <div className="modal__dots">
                  {product.media.map((_, i) => (
                    <button
                      key={i}
                      className={`modal__dot ${i === index ? "is-active" : ""}`}
                      onClick={() => setIndex(i)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="modal__body">
            <span className="modal__badge">{gamaLabel[product.gama]}</span>
            <h2>{product.nombre}</h2>
            <p>{product.descripcion}</p>

            <div className="modal__colores">
              {product.colores.map((c) => (
                <span key={c} className="product-card__color-tag">
                  {colorLabel[c]}
                </span>
              ))}
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__cta"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
