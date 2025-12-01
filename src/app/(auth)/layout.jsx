"use client";
import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="bg-gray-100 w-[100vw] h-[100vh] border flex items-center justify-center text-center flex-1">
      {children}
    </div>
  );
}
