import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <div className="navbar__brand-group">
          <span className="navbar__logo-mark">AL</span>
          <div className="navbar__brand-text">
            <h1>Aluminios & Diseño</h1>
            <p>Puertas · Ventanas · Cancelería · Domos</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}