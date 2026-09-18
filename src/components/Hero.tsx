import { CONTACT } from "../data/config";

export function Hero() {
  const mensaje = encodeURIComponent(
    "Hola, vi su catálogo y quiero más información.",
  );
  const whatsappLink = `https://wa.me/${CONTACT.whatsappNumber}?text=${mensaje}`;

  return (
    <section className="hero">
      <img
        src={`${import.meta.env.BASE_URL}logoOE.png`}
        alt=""
        className="hero__bg-logo"
        aria-hidden="true"
      />
      <div className="hero__content">
        <h1>Puertas y Ventanas de Aluminio a tu Medida</h1>
        <p>
          Diseños modernos, acabados de calidad y trabajo garantizado. Explora
          nuestro catálogo y cotiza tu proyecto.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hero__cta"
        >
          Cotizar por WhatsApp
        </a>
      </div>
    </section>
  );
}
