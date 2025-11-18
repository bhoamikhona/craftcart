import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";
export default function Searchbar() {
  return (
    <div className="search__section">
      <div className="input__control">
        <div className="search__icon-container">
          <FaSearch className="search__icon" />
        </div>
        <input className="input" placeholder="Search" type="text" />
      </div>
    </div>
  );
}
