import "./Product.css";
import Link from "next/link.js";

export default function Product({ id, name, price, img }) {
  return (
    <article className="product">
      <div className="product__img-container">
        <img className="product__img" src={img} alt={name} />
      </div>
      <div className="product__details">
        <div className="product__details-left">
          <Link href={`/products/${id}`} className="product__link">
            <h3 className="product__title">{name}</h3>
          </Link>
          <p className="product__price">${price.toFixed(2)}</p>
        </div>
        <div className="product__details-right">
          <button className="btn btn--primary btn--sm">Add to cart</button>
        </div>
      </div>
    </article>
  );
}
