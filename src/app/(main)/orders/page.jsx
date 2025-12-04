import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { RiArrowDropRightLine } from "react-icons/ri";

// Dummy Order Data
const ordersData = [
  {
    id: "ORD-2024-001",
    date: "March 15, 2024",
    status: "Delivered",
    items: 2,
    price: 77,
    images: [
      "/images/products/candle-containers.jpg",
      "/images/products/candle-dye-chips.jpg",
    ],
    products: [
      {
        productId: 1,
        name: "3mm Cotton Cord",
        quantity: 1,
        price: 8.99,
        image: "/images/products/cotton-cord.jpg",
      },
      {
        productId: 2,
        name: "Wooden Dowel (12 inch)",
        quantity: 10,
        price: 3.99,
        image: "/images/products/wooden-dowel.jpg",
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "March 10, 2024",
    status: "Shipped",
    items: 1,
    price: 78,
    products: [
      {
        productId: 3,
        name: "Hot Glue Gun",
        quantity: 1,
        price: 11.99,
        image: "/images/products/hot-glue-gun.jpg",
      },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "March 5, 2024",
    status: "Processing",
    items: 2,
    price: 99,
    products: [
      {
        productId: 3,
        name: "Hot Glue Gun",
        quantity: 1,
        price: 11.99,
        image: "/images/products/hot-glue-gun.jpg",
      },
      {
        productId: 2,
        name: "Wooden Dowel (12 inch)",
        quantity: 4,
        price: 3.99,
        image: "/images/products/wooden-dowel.jpg",
      },
    ],
  },
];

export default function orders() {
  return (
    <div>
      <div className=" max-w-6xl flex flex-col items-stretch justify-center mx-auto mb-10 mt-10">
        <h1 className="self-start pl-4 text-4xl font-bold">Your Orders</h1>

        <ul className="flex flex-col p-4">
          {ordersData.map((o) => (
            <OrderItem
              key={o.id}
              id={o.id}
              date={o.date}
              status={o.status}
              items={o.items}
              price={o.price}
              products={o.products}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function OrderItem({ id, date, status, items, price, products }) {
  return (
    <li className="border-b border-gray-300 last:border-b-0 py-6">
      <span className="text-sm text-gray-400">{date}</span>
      <div className="flex justify-between mb-4">
        <p className="font-bold text-gray-600 mb-3">{id}</p>
        <Link
          className="flex items-center text-sm text-gray-300 footer__link"
          href="/orders"
        >
          Details <RiArrowDropRightLine className="text-2xl" />
        </Link>
      </div>

      <ul className="flex flex-col gap-6">
        {products.map((p) => (
          <OrderProductItem
            key={p.productId}
            name={p.name}
            quantity={p.quantity}
            price={p.price}
            image={p.image}
          />
        ))}
      </ul>
    </li>
  );
}

function OrderProductItem({ name, quantity, price, image }) {
  return (
    <li className="flex items-center gap-4">
      <div>
        <Image
          className="rounded-md shadow-sm"
          width={50}
          height={50}
          src={image}
          alt={name}
        />
      </div>
      <div>
        <p className="font-medium text-gray-700">{name}</p>
        <p className="text-sm text-gray-500">
          Quantity: {quantity} | ${price}
        </p>
      </div>
    </li>
  );
}
