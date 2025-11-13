// import AuthLayout from "@/components/auth/AuthLayout.jsx";

// import React from "react";

// function Logout() {
//   return <AuthLayout></AuthLayout>;
// }

// export default Logout;
"use client";

import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    // Example: clear token or session
    localStorage.removeItem("token");
    alert("You have been logged out!");
    window.location.href = "/";
  }, []);

  return (
    <div className="text-center mt-10 text-lg text-primary">
      Logging you out...
    </div>
  );
}
