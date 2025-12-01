"use client";
import { useState } from "react";
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

    //////

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    // <div className="flex flex-col space-y-4">
    //   <h1 className="text-2xl font-bold text-center text-primary">Create Account</h1>

    //   <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
    //     <input
    //       name="name"
    //       type="text"
    //       placeholder="Full Name"
    //       value={form.name}
    //       onChange={handleChange}
    //       className="border p-2 rounded"
    //     />
    //     <input
    //       name="email"
    //       type="email"
    //       placeholder="Email"
    //       value={form.email}
    //       onChange={handleChange}
    //       className="border p-2 rounded"
    //     />
    //     <input
    //       name="password"
    //       type="password"
    //       placeholder="Password"
    //       value={form.password}
    //       onChange={handleChange}
    //       className="border p-2 rounded"
    //     />
    //     <input
    //       name="phone"
    //       type="text"
    //       placeholder="Phone Number"
    //       value={form.phone}
    //       onChange={handleChange}
    //       className="border p-2 rounded"
    //     />
    //     <input
    //       name="address"
    //       type="text"
    //       placeholder="Address"
    //       value={form.address}
    //       onChange={handleChange}
    //       className="border p-2 rounded"
    //     />

    //     <button type="submit" className="btn-primary w-full py-2">
    //       Register
    //     </button>
    //   </form>
    // </div>
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
              <label htmlFor="password" className="sr-only">
                Name
              </label>
              <HiOutlineUser className="text-xl text-gray-600" />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="ml-2 outline-none"
                value={form.name}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>

            <div className="input-control flex items-center bg-gray-100 p-2 rounded-md mb-3">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <HiOutlineEnvelope className="text-xl text-gray-600" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="ml-2 outline-none"
                value={form.email}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>

            <div className="input-control flex items-center bg-gray-100 p-2 rounded-md mb-3">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <HiOutlineLockOpen className="text-xl text-gray-600" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="ml-2 outline-none"
                value={form.password}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>

            <div className="input-control flex items-center bg-gray-100 p-2 rounded-md mb-5">
              <label htmlFor="password" className="sr-only">
                Confirm Password
              </label>
              <HiOutlineLockClosed className="text-xl text-gray-600" />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="ml-2 outline-none"
                value={form.confirmPassword}
                onChange={(e) => handleChange(e.target.value)}
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
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </AuthLayout>
  );
}
