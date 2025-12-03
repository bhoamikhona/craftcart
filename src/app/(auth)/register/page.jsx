"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthLayout from "../layout.jsx";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineLockOpen,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { CgLogIn } from "react-icons/cg";
import Link from "next/link.js";
import Image from "next/image.js";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // password match validation
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    let data = {};
    try {
      data = await res.json();
    } catch (error) {
      toast.error("Server error. Please try again.");
      return;
    }

    if (res.ok) {
      toast.success("User created successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 400);
    } else {
      toast.error(data.message || "Registration failed");
    }
  };

  return (
    <AuthLayout>
      <main className="bg-white rounded-2xl shadow-2xl max-w-4xl grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-2 md:gap-6">
        <div className="auth__left overflow-hidden rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none rounded-tr-2xl">
          <Image
            src="/images/auth/gift-wrapping.png"
            alt="gift-wrapping"
            width="500"
            height="500"
            className="md:h-full"
          />
        </div>

        <div className="auth__right flex flex-col items-stretch justify-center p-6 md:pr-10">
          <h1 className="self-start text-gray-400 uppercase text-xs tracking-[5px] mb-4">
            craftcart
          </h1>

          <h2 className="self-start text-2xl text-primary font-bold mb-4">
            Create Account!
          </h2>

          <form className="mb-4" onSubmit={handleSubmit}>
            <div className="input-control flex items-center bg-gray-100 p-2 rounded-md mb-3">
              <HiOutlineUser className="text-xl text-gray-600" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="ml-2 outline-none"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-control flex items-center bg-gray-100 p-2 rounded-md mb-3">
              <HiOutlineEnvelope className="text-xl text-gray-600" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="ml-2 outline-none"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-control flex items-center bg-gray-100 p-2 rounded-md mb-3">
              <HiOutlineLockOpen className="text-xl text-gray-600" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="ml-2 outline-none"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="input-control flex items-center bg-gray-100 p-2 rounded-md mb-5">
              <HiOutlineLockClosed className="text-xl text-gray-600" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="ml-2 outline-none"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="bg-primary w-full text-white py-3 rounded-md hover:bg-orange-600 transision-color duration-300 ease-in-out cursor-pointer flex items-center justify-center gap-2 font-bold tracking-wider"
            >
              Register <CgLogIn className="font-bold text-2xl" />
            </button>
          </form>

          <div className="text-center text-sm text-gray-500">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </AuthLayout>
  );
}
