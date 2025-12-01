// export default function Footer() {
//   return (
//     <footer className="w-full py-6 border-t border-[var(--border-color)] bg-[var(--card-bg)]">
//       <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-gray-600">
//         <p>© {new Date().getFullYear()} CraftCart</p>

//         <div className="flex items-center gap-6">
//           <a href="#" className="hover:text-[var(--primary)]">
//             About
//           </a>
//           <a href="#" className="hover:text-[var(--primary)]">
//             Contact
//           </a>
//           <a href="#" className="hover:text-[var(--primary)]">
//             Terms
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }

import "./layout.css";
import Link from "next/link.js";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mb-32 pt-32 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-6 grid-rows-2 md:grid-rows-1 md:grid-cols-5 gap-8 md:gap-16 gap-y-16">
        <div className="flex flex-col md:col-start-1 md:col-end-2 col-start-1 col-end-4 md:row-start-1 md:row-end-2 row-start-2 row-end-3">
          <h3 className="text-4xl font-bold text-primary cursor-pointer mb-12">
            craftcart
          </h3>

          <ul className="flex gap-6">
            <li>
              <a href="https://www.google.com/">
                <FaInstagram className="text-2xl text-gray-400 hover:text-gray-600 transition-colors duration-300 ease-in-out" />
              </a>
            </li>
            <li>
              <a href="https://www.google.com/">
                <FaFacebook className="text-2xl text-gray-400 hover:text-gray-600 transition-colors duration-300 ease-in-out" />
              </a>
            </li>
            <li>
              <a href="https://www.google.com/">
                <FaTwitter className="text-2xl text-gray-400 hover:text-gray-600 transition-colors duration-300 ease-in-out" />
              </a>
            </li>
          </ul>

          <p className="text-sm mt-auto text-gray-400 ">
            Copyright &copy; <span>2025</span> by CraftCart, Inc. All rights
            reserved.
          </p>
        </div>

        <div className="md:col-start-2 md:col-end-3 col-start-4 col-end-7 md:row-start-1 md:row-end-2 row-start-2 row-end-3">
          <p className="font-bold text-gray-600 mb-10 text-lg">Contact Us</p>
          <address>
            <p className="mb-6 text-gray-500 leading-6">
              One Pace Plaza, 2nd Floor, New York, NY 10038
            </p>
            <p className="leading-6">
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

        <nav className="md:col-start-3 md:col-end-4 col-start-1 col-end-3">
          <p className="font-bold text-gray-600 mb-10 text-lg">Account</p>
          <ul className="flex flex-col gap-4">
            <li>
              <Link className="footer__link" href="/register">
                Create Account
              </Link>
            </li>
            <li>
              <Link className="footer__link" href="/login">
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

        <nav className="md:col-start-4 md:col-end-5 col-start-3 col-end-5">
          <p className="font-bold text-gray-600 mb-10 text-lg">Company</p>
          <ul className="flex flex-col gap-4">
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

        <nav className="md:col-start-5 md:col-end-6 col-start-5 col-end-7">
          <p className="font-bold text-gray-600 mb-10 text-lg">Resources</p>
          <ul className="flex flex-col gap-4">
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
