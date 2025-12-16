"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Container from "@/components/layout/Container";
import supabase from "@/lib/supabaseClient";

export default function Checkout() {
    const { data: session } = useSession();

    const [cart, setCart] = useState([]);
    const [userData, setUserData] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [loading, setLoading] = useState(false);

    // Load cart from localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Load logged-in user 
    useEffect(() => {
        if (!session?.user?.email) return;

        async function loadUser() {
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("email", session.user.email)
                .single();

            if (!error) {
                setUserData(data);
            }
        }

        loadUser();
    }, [session]);

    // Calculate total
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // PLACE ORDER (Orders + OrderItems)
    const placeOrder = async () => {
        if (!userData) {
            alert("Please log in to place an order");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty");
            return;
        }

        setLoading(true);

        try {
            // 1️⃣ Create order
            const { data: order, error: orderError } = await supabase
                .from("orders")
                .insert([
                    {
                        user_id: userData.user_id,
                        total_amount: total,
                        currency: "USD",
                        status: "Processing",
                    },
                ])
                .select()
                .single();


            if (orderError) throw orderError;

            // 2️⃣ Create order items
            const orderItems = cart.map(item => ({
                order_id: order.order_id,
                product_id: item.id, // must match products.product_id
                quantity: item.quantity,
                price: item.price,
            }));

            const { error: itemsError } = await supabase
                .from("orderitems")
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // 3️⃣ Clear cart
            localStorage.removeItem("cart");
            window.dispatchEvent(new Event("cart-updated"));
            window.dispatchEvent(new Event("storage"));

            setCart([]);
            setOrderPlaced(true);

        } catch (err) {
            console.error("Checkout error:", err);
            alert("Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    // SUCCESS SCREEN
    if (orderPlaced) {
        return (
            <Container>
                <div className="max-w-2xl mx-auto py-20 text-center">
                    <h1 className="text-3xl font-bold text-primary mb-4">
                        Order Placed Successfully
                    </h1>
                    <p className="text-gray-600">
                        Your order has been saved. Payment is simulated for demo purposes.
                    </p>
                </div>
            </Container>
        );
    }

    // CHECKOUT UI
    return (
        <Container>
            <div className="max-w-6xl mx-auto py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* LEFT: CUSTOMER INFO */}
                <div className="lg:col-span-2 space-y-6">
                    <h1 className="text-2xl font-semibold">Checkout</h1>

                    <div className="bg-white p-6 rounded-2xl shadow space-y-4">
                        <input
                            className="w-full border rounded-lg p-3"
                            placeholder="Full Name"
                        />
                        <input
                            className="w-full border rounded-lg p-3"
                            placeholder="Email Address"
                            defaultValue={session?.user?.email || ""}
                        />
                        <input
                            className="w-full border rounded-lg p-3"
                            placeholder="Shipping Address"
                        />
                        <input
                            className="w-full border rounded-lg p-3"
                            placeholder="City, State, Zip"
                        />

                        <p className="text-sm text-gray-500 pt-2">
                            * Payment is simulated for academic purposes
                        </p>
                    </div>
                </div>

                {/* RIGHT: ORDER SUMMARY */}
                <div className="bg-orange-50 p-6 rounded-2xl shadow h-fit">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    {cart.map(item => (
                        <div
                            key={item.id}
                            className="flex justify-between text-sm mb-2"
                        >
                            <span>
                                {item.name} × {item.quantity}
                            </span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}

                    <hr className="my-4" />

                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={placeOrder}
                        disabled={loading || cart.length === 0}
                        className="
                            w-full mt-6
                            bg-orange-600
                            !text-white
                            font-semibold
                            py-3
                            rounded-xl
                            hover:bg-orange-700
                            transition
                            disabled:opacity-50
                            "
                    >
                        {loading ? "Placing Order..." : "Place Order"}
                    </button>
                </div>
            </div>
        </Container>
    );
}
