// import AuthLayout from "@/components/auth/AuthLayout.jsx";

// export default function Login() {
//   return <AuthLayout></AuthLayout>;
// }
"use client";
import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <form className="space-y-5">
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full btn-primary py-2 rounded-lg text-white font-semibold"
        >
          Sign In
        </button>

        {/* Extra Links */}
        <div className="text-center text-sm text-gray-500">
          <p>
            Don’t have an account?{" "}
            <a
              href="/auth/register"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
          <p className="mt-2">
            <a
              href="#"
              className="text-secondary hover:underline"
            >
              Forgot password?
            </a>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
