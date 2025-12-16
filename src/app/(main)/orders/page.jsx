"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { RiArrowDropRightLine } from "react-icons/ri";
import Loader from "@/components/ui/loader";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    async function loadOrders() {
      setLoading(true);

      /* 1️⃣ get user_id from users table */
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("user_id")
        .eq("email", session.user.email)
        .single();

      if (userError || !userData) {
        setLoading(false);
        return;
      }

      /* 2️⃣ fetch orders for this user */
      const { data: ordersData, error } = await supabase
        .from("orders")
        .select(`
          order_id,
          status,
          created_at,
          total_amount,
          orderitems (
            quantity,
            price,
            products (
              name,
              images
            )
          )
        `)
        .eq("user_id", userData.user_id)
        .order("created_at", { ascending: false });

      if (!error) {
        setOrders(ordersData || []);
      }

      setLoading(false);
    }

    loadOrders();
  }, [session]);

  if (status === "loading" || loading) return <Loader />;
  if (!session) {
    return (
      <p className="mt-10 text-center text-gray-500">
        Please login to view your orders.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
      <h1 className="text-4xl font-bold mb-8">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <ul className="flex flex-col gap-8">
          {orders.map((order) => (
            <OrderItem key={order.order_id} order={order} />
          ))}
        </ul>
      )}
    </div>
  );
}

/* ============================
   ORDER CARD
============================ */
function OrderItem({ order }) {
  return (
    <li className="border-b border-gray-300 pb-6">
      <span className="text-sm text-gray-400">
        {new Date(order.created_at).toDateString()}
      </span>

      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-gray-600">
          Order #{order.order_id}
        </p>

        {/* <Link
          href={`/orders/${order.order_id}`}
          className="flex items-center text-sm text-gray-400 hover:text-gray-600"
        >
          Details <RiArrowDropRightLine className="text-2xl" />
        </Link> */}
      </div>

      <span className="inline-block mb-4 text-xs font-medium px-3 py-1 rounded-full bg-orange-100 text-orange-700">
        {order.status}
      </span>

      <ul className="flex flex-col gap-6">
        {order.orderitems.map((item, idx) => (
          <OrderProductItem key={idx} item={item} />
        ))}
      </ul>

      <p className="mt-4 font-semibold text-right text-gray-700">
        Total: ${order.total_amount.toFixed(2)}
      </p>
    </li>
  );
}

/* ============================
   PRODUCT ROW (FIRST IMAGE)
============================ */
function OrderProductItem({ item }) {
  const product = item.products;

  let images = [];

  if (Array.isArray(product?.images)) {
    images = product.images;
  } else if (typeof product?.images === "string") {
    try {
      images = JSON.parse(product.images);
    } catch {
      images = [];
    }
  }

  const rawImage = images[0];
  const imageSrc =
    typeof rawImage === "string"
      ? rawImage.startsWith("/")
        ? rawImage
        : `/${rawImage}`
      : "/images/placeholder.png";

  return (
    <li className="flex items-center gap-4">
      <Image
        src={imageSrc}
        alt={product?.name || "Product"}
        width={50}
        height={50}
        className="rounded-md shadow-sm object-cover"
      />

      <div>
        <p className="font-medium text-gray-700">
          {product?.name}
        </p>
        <p className="text-sm text-gray-500">
          Quantity: {item.quantity} · ${item.price}
        </p>
      </div>
    </li>
  );
}
