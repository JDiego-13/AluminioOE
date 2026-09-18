import { CONTACT } from '../data/config';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div>
          <img
            src={`${import.meta.env.BASE_URL}logoOE.png`}
            alt={CONTACT.nombreNegocio}
            style={{ height: '56px', marginBottom: '12px' }}
          />
          <h2>{CONTACT.nombreNegocio}</h2>
          <p>Puertas y ventanas de aluminio, vidrio templado, instalación profesional.</p>
        </div>

        <div className="footer__contact">
          <p>
            📞 Teléfono / WhatsApp:{' '}
            <a href={`tel:+${CONTACT.whatsappNumber}`}>33 1850 2906</a>
          </p>
          <p>📍 Ubicación: CD. Manuel Doblado, Guanajuato</p>
          <p>Todos los precios se cotizan según medida y diseño.</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} {CONTACT.nombreNegocio} — Catálogo de trabajos</p>
      </div>
    </footer>
  );
}