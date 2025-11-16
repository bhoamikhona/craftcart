"use client";

import React, { useState } from "react";            // added
import Link from "next/link";
import { signIn } from "next-auth/react";          // added
import { useRouter } from "next/navigation";       // added
import AuthLayout from "../layout.jsx";

export default function LoginPage() {
  // added: state for handling email, password, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();                      // added

  // added: handles sending login request to NextAuth
  async function handleSubmit(e) {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/");
    }
  }

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">CraftCart</h1>
        <p className="text-sm text-gray-500">
          Welcome back! Please sign in to continue.
        </p>
      </div>

      {/* added: optional error message display */}
      {error && (
        <p className="text-red-500 text-center font-medium mb-4">{error}</p>
      )}

      {/* changed: added onSubmit handler, style unchanged */}
      <form onSubmit={handleSubmit} className="space-y-5 mt-0 mb-0">

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>

          {/* changed: added value and onChange */}
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-border bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
            value={email}                           /* added */
            onChange={(e) => setEmail(e.target.value)} /* added */
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>

          {/* changed: added value and onChange */}
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border border-border bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
            value={password}                        /* added */
            onChange={(e) => setPassword(e.target.value)} /* added */
          />
        </div>

        {/* Submit button (unchanged) */}
        <button
          type="submit"
          className="w-full btn-primary py-2 rounded-lg text-white font-semibold"
        >
          Sign In
        </button>

        {/* Links (unchanged) */}
        <div className="text-center text-sm text-gray-500">
          <p>
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
          <p className="mt-2">
            <a href="#" className="text-secondary hover:underline">
              Forgot password?
            </a>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
