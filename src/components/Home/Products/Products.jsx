import "./Products.css";

const productsData = [
  {
    id: 1,
    name: "scissors",
    price: 7.99,
    img: "./images/products/scissors.png",
  },
  {
    id: 2,
    name: "drill",
    price: 39.99,
    img: "./images/products/drill.png",
  },
  {
    id: 3,
    name: "glue",
    price: 4.99,
    img: "./images/products/glue.png",
  },
];

export default function Products() {
  return (
    <section className="section__products">
      <h2 className="section__title">Our bestselling products</h2>
      <div className="grid grid__3-cols">
        {productsData.map((p) => (
          <Product key={p.id} name={p.name} price={p.price} img={p.img} />
        ))}
      </div>
    </section>
  );
}

function Product({ name, price, img }) {
  return (
    <article className="product">
      <div className="product__img-container">
        <img className="product__img" src={img} alt={name} />
      </div>
      <div className="product__details">
        <div className="product__details-left">
          <h3 className="product__title">{name}</h3>
          <p className="product__price">${price.toFixed(2)}</p>
        </div>
        <div className="product__details-right">
          <button className="btn btn--primary btn--sm">Add to cart</button>
        </div>
      </div>
    </article>
  );
}
