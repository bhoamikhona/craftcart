"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    let data = {};
    try {
      data = await res.json();
    } catch (error) {
      alert("Server error. Please try again.");
      return;
    }

    if (res.ok) {
      alert("User created successfully");

      // ⭐ Delay redirect so alert fully closes
      setTimeout(() => {
        router.push("/login");
      }, 50);

    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold text-center text-primary">
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="address"
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button type="submit" className="btn-primary w-full py-2">
          Register
        </button>
      </form>
    </div>
  );
}
