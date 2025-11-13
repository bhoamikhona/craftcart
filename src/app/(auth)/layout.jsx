"use client";
import React from "react";

export default function AuthLayout({ children }) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-muted text-foreground">
      <div className="w-full max-w-md bg-card-bg border border-border rounded-2xl shadow-md p-8">
        {children}
      </div>
    </section>
  );
}
