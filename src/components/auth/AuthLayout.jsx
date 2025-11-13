// import React from "react";

// function AuthLayout() {
//   return <div>AuthLayout</div>;
// }

// export default AuthLayout;
"use client";
import React from "react";

export default function AuthLayout({ children }) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-muted text-foreground">
      <div className="w-full max-w-md bg-card-bg border border-border rounded-2xl shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">CraftCart</h1>
          <p className="text-sm text-gray-500">Welcome back! Please sign in to continue.</p>
        </div>
        {children}
      </div>
    </section>
  );
}
