import Link from "next/link.js";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="container nav">
      <div className="nav__left">
        <div className="nav__logo-container">
          <h3 className="nav__logo">craftcart</h3>
        </div>
      </div>
      <div className="nav__right">
        <ul className="nav__list">
          <li className="nav__list-item">
            <Link href="/" className="nav__link">
              Home
            </Link>
          </li>
          <li className="nav__list-item">
            <Link href="/" className="nav__link">
              Videos
            </Link>
          </li>
          <li className="nav__list-item">
            <Link href="/" className="nav__link">
              Shop
            </Link>
          </li>
          <li className="nav__list-item">
            <Link href="/" className="nav__link">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
