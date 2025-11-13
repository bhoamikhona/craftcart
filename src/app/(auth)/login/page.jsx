"use client";
import React from "react";
import Link from "next/link";
import AuthLayout from "../layout.jsx";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">CraftCart</h1>
        <p className="text-sm text-gray-500">Welcome back! Please sign in to continue.</p>
      </div>

      <form className="space-y-5 mt-0 mb-0">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-border bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border border-border bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full btn-primary py-2 rounded-lg text-white font-semibold"
        >
          Sign In
        </button>

        {/* Links */}
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
