"use client";
import React from "react";
import Link from "next/link";
export default function CallToActionStrip() {
  return (
    <section className="w-full gradient-bg py-12 mt-16 rounded-2xl mb-16">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Ready to Start Your Next DIY Project?
        </h2>

        <p className="text-white/90 mt-3 text-lg max-w-2xl mx-auto">
          Explore tutorials, shop all your craft supplies, and learn new skills
          — all in one place.
        </p>
        <Link href="/videos" passHref>
          <button className="btn-primary mt-6 px-8 py-3 text-lg rounded-xl shadow-lg hover:opacity-95">
            Browse Tutorials
          </button>
        </Link>
      </div>
    </section>
  );
}
