import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { products } from "../data/products";
import { generateCatalogPDF } from "../utils/Generatecatalogpdf";

export function Navbar() {
  const [generando, setGenerando] = useState(false);

  async function handleDescargar() {
    setGenerando(true);
    try {
      await generateCatalogPDF(products);
    } finally {
      setGenerando(false);
    }
  }

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <div className="navbar__brand-group">
          <div className="navbar__logo-wrap">
            <img
              src={`${import.meta.env.BASE_URL}logoOE.png`}
              alt="Olegario Espinoza"
              className="navbar__logo"
            />
          </div>
          <div className="navbar__brand-text">
            <h1>Olegario Espinoza</h1>
            <p>Puertas y Ventanas de Aluminio · Vidrio Templado</p>
          </div>
        </div>

        <div className="navbar__actions">
          <button
            className="navbar__download-btn"
            onClick={handleDescargar}
            disabled={generando}
          >
            {generando ? "Generando..." : "⬇ Descargar catálogo"}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
