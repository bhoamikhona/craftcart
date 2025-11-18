import Searchbar from "@/components/Helpers/Searchbar/Searchbar";
import "./ProductGallery.css";
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
  {
    id: 4,
    name: "wool",
    price: 14.99,
    img: "./images/products/wool.png",
  },
  {
    id: 5,
    name: "scissors",
    price: 7.99,
    img: "./images/products/scissors.png",
  },
  {
    id: 6,
    name: "drill",
    price: 39.99,
    img: "./images/products/drill.png",
  },
  {
    id: 7,
    name: "glue",
    price: 4.99,
    img: "./images/products/glue.png",
  },
  {
    id: 8,
    name: "wool",
    price: 14.99,
    img: "./images/products/wool.png",
  },
  {
    id: 9,
    name: "scissors",
    price: 7.99,
    img: "./images/products/scissors.png",
  },
  {
    id: 10,
    name: "drill",
    price: 39.99,
    img: "./images/products/drill.png",
  },
  {
    id: 11,
    name: "glue",
    price: 4.99,
    img: "./images/products/glue.png",
  },
  {
    id: 12,
    name: "wool",
    price: 14.99,
    img: "./images/products/wool.png",
  },
  {
    id: 13,
    name: "scissors",
    price: 7.99,
    img: "./images/products/scissors.png",
  },
  {
    id: 14,
    name: "drill",
    price: 39.99,
    img: "./images/products/drill.png",
  },
  {
    id: 15,
    name: "glue",
    price: 4.99,
    img: "./images/products/glue.png",
  },
  {
    id: 16,
    name: "wool",
    price: 14.99,
    img: "./images/products/wool.png",
  },
];

export default function Products() {
  return (
    <>
      <Searchbar />
      <main className="product__gallery ">
        <h2 className="section__title">Our Top-Rated Products</h2>
        <div className="grid grid__3-cols">
          {productsData.map((p) => (
            <Product key={p.id} name={p.name} price={p.price} img={p.img} />
          ))}
        </div>
      </main>
    </>
  );
}
