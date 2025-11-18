import "./Cart.css";
import { CiHeart } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";

const productData = [
  {
    id: 1,
    src: "./images/products/square/scissors.png",
    price: 7.99,
    name: "All Purpose Scissors",
    type: "Stationary",
    color: "Red",
    size: "One Size",
    quantity: 1,
    maxQuantity: 5,
  },
  {
    id: 2,
    src: "./images/products/square/glue.png",
    price: 4.99,
    name: "Paper Glue",
    type: "Stationary",
    color: "White",
    size: "One Size",
    quantity: 1,
    maxQuantity: 5,
  },
  {
    id: 3,
    src: "./images/products/square/drill.png",
    price: 39.99,
    name: "Drill Gun",
    type: "Woodshop",
    color: "Black/Yellow",
    size: "One Size",
    quantity: 1,
    maxQuantity: 5,
  },
  {
    id: 4,
    src: "./images/products/square/wool.png",
    price: 14.99,
    name: "Cashmere Wool",
    type: "Knitting",
    color: "Multi",
    size: "One Size",
    quantity: 1,
    maxQuantity: 5,
  },
];

export default function Cart() {
  return (
    <main className="cart__container">
      <div className="grid grid__3-cols">
        <div className="bag">
          <h2 className="bag-title">Bag</h2>
          <div className="cart-items">
            {productData.map((p) => (
              <CartItem
                key={p.id}
                src={p.src}
                price={p.price}
                name={p.name}
                type={p.type}
                color={p.color}
                size={p.size}
                quantity={p.quantity}
                maxQuantity={p.maxQuantity}
              />
            ))}
          </div>
        </div>
        <div className="summary">
          <h2 className="summary-title">Summary</h2>

          <div class="summary--details">
            <div class="subtotal-row summary--row">
              <div class="Subtotal">
                <span> Subtotal </span>
                <ion-icon class="help-icon" name="help-circle"></ion-icon>
              </div>

              <span>$67.96</span>
            </div>
            <div class="delivery-row summary--row">
              <span>Estimated Delivery & Handling</span>
              <span>$6.49</span>
            </div>
            <div class="total-row summary--row">
              <span>Total</span>
              <span>$74.45</span>
            </div>
          </div>

          <div class="summary--buttons">
            <button class="btn btn--primary checkout-btn">Checkout</button>
          </div>
        </div>
      </div>
    </main>
  );
}

function CartItem({ src, price, name, type, color, size, quantity }) {
  return (
    <div className="cart-item">
      <div className="cart-item--img-box">
        <img src={src} alt={name} className="cart-item--img" />
      </div>
      <div className="cart-item--info">
        <p className="cart-item--price">${price}</p>
        <div className="cart-item--details">
          <p className="cart-item--name">{name}</p>
          <p className="cart-item--type">{type}</p>
          <p className="cart-item--color">{color}</p>

          <div className="cart-item--size-and-quantity">
            <div className="cart-item--size">
              <span>{size}</span>
            </div>
            <div className="cart-item--quantity">
              <span>Quantity</span>
              <select>
                <option value="1">{quantity}</option>
              </select>
            </div>
          </div>
          <div className="cart-item--icons">
            <CiHeart className="cart-item--icon" />
            <CiTrash className="cart-item--icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
