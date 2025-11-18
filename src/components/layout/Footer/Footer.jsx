import Link from "next/link.js";
import "./Footer.css";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container grid grid__5-cols">
        <div className="logo-col">
          <h3 className="footer__logo">craftcart</h3>

          <ul className="social__links">
            <li>
              <a href="https://www.google.com/">
                <FaInstagram className="social__icon" />
              </a>
            </li>
            <li>
              <a href="https://www.google.com/">
                <FaFacebook className="social__icon" />
              </a>
            </li>
            <li>
              <a href="https://www.google.com/">
                <FaTwitter className="social__icon" />
              </a>
            </li>
          </ul>

          <p className="copyright">
            Copyright &copy; <span className="year">2027</span> by CraftCart,
            Inc. All rights reserved.
          </p>
        </div>
        <div className="address-col">
          <p className="footer__heading">Contact Us</p>
          <address className="contacts">
            <p className="address">
              One Pace Plaza, 2nd Floor, New York, NY 10038
            </p>
            <p>
              <a className="footer__link" href="tel:415-201-6370">
                212-208-9240
              </a>
              <br />
              <a className="footer__link" href="mailto:hello@omnifood.com">
                hello@craftcart.com
              </a>
            </p>
          </address>
        </div>

        <nav className="nav-col">
          <p className="footer__heading">Account</p>
          <ul className="footer__nav">
            <li>
              <Link className="footer__link" href="/">
                Create Account
              </Link>
            </li>
            <li>
              <Link className="footer__link" href="/">
                Sign In
              </Link>
            </li>
            <li>
              <Link className="footer__link" href="/">
                iOS App
              </Link>
            </li>
            <li>
              <Link className="footer__link" href="/">
                Android App
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer__heading">Company</p>
          <ul className="footer__nav">
            <li>
              <Link className="footer__link" href="/">
                About CraftCart
              </Link>
            </li>
            <li>
              <Link className="footer__link" href="/">
                For Business
              </Link>
            </li>
            <li>
              <Link className="footer__link" href="/">
                Partners
              </Link>
            </li>
            <li>
              <Link className="footer__link" href="/">
                Careers
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer__heading">Resources</p>
          <ul className="footer__nav">
            <li>
              <Link className="footer__link" href="/">
                Product Directory
              </Link>
            </li>
            <li>
              <Link className="footer__link" href="/">
                Help Center
              </Link>
            </li>
            <li>
              <Link className="footer__link" href="/">
                Privacy & Terms
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
