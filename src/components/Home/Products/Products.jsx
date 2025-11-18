import "./Products.css";
import Product from "@/components/Helpers/Product/Product.jsx";

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
          <Product
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            img={p.img}
          />
        ))}
      </div>
    </section>
  );
}
