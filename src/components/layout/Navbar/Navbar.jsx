import Link from "next/link.js";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="external__container">
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
              <Link href="/videos" className="nav__link">
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
            <li className="nav__list-item">
              <Link href="/login" className="nav__link">
                Login
              </Link>
            </li>
            <li className="nav__list-item">
              <Link href="/register" className="nav__link">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
