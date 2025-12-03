"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import AuthLayout from "../layout.jsx";
import Link from "next/link.js";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import Image from "next/image";
import { CgLogIn } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async function (e) {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Login successful");
      router.push("/profile");
    }
  };

  return (
    <AuthLayout>
      <main className="bg-white rounded-2xl shadow-2xl flex md:flex-row flex-col max-w-4xl gap-2 md:gap-6">
        <div className="auth__left overflow-hidden flex-1 rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none rounded-tr-2xl">
          <Image
            src="/images/auth/heart-coffee-mug.png"
            alt="hear coffee mug"
            width="500"
            height="500"
          />
        </div>
        <div className="auth__right flex flex-col items-stretch justify-center p-6 md:pr-10 flex-1">
          <h1 className="self-start text-gray-400 uppercase text-xs tracking-[5px] mb-4">
            craftcart
          </h1>
          <h2 className="self-start text-2xl text-primary font-bold mb-4">
            Welcome Back!
          </h2>

          <form className="mb-4" onSubmit={handleSubmit}>
            <div className="input-control flex items-center bg-gray-100 p-2 rounded-md mb-3">
              <HiOutlineEnvelope className="text-xl text-gray-600" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="ml-2 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-control flex items-center bg-gray-100 p-2 rounded-md mb-5">
              <HiOutlineLockClosed className="text-xl text-gray-600" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="ml-2 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-primary w-full text-white py-3 rounded-md hover:bg-orange-600 duration-300 ease-in-out flex items-center justify-center gap-2 font-bold tracking-wider"
            >
              Login <CgLogIn className="font-bold text-2xl" />
            </button>
          </form>

          <div className="text-center text-sm text-gray-500">
            <p>
              Don’t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Register
              </Link>
            </p>
            <p className="mt-2">
              <Link href="/login" className="text-secondary hover:underline">
                Forgot password?
              </Link>
            </p>
          </div>
        </div>
      </main>
    </AuthLayout>
  );
}
