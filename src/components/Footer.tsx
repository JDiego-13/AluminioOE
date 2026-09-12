export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div>
          <h2>Aluminios & Diseño</h2>
          <p>Trabajos de aluminio a la medida, con acabados de calidad.</p>
        </div>

        <div className="footer__contact">
          <p>📞 Teléfono / WhatsApp: <a href="tel:+52">33 1850 2906</a></p>
          <p>📍 Ubicación: CD. Manuel Doblado, Guanajuato</p>
          <p>Todos los precios se cotizan según medida y diseño.</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Aluminios & Diseño — Catálogo de trabajos</p>
      </div>
    </footer>
  );
}