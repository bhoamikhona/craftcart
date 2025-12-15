"use client";

import { useEffect, useRef, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function ProductsTab({ video, setVideo }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const debounceRef = useRef(null);
  const containerRef = useRef(null);
  const activeReqRef = useRef(0);

  useEffect(() => {
    function onDocMouseDown(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  useEffect(() => {
    const q = query.trim();

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!q) return;

    const reqId = ++activeReqRef.current;

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setErrMsg("");

      let resp = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${q}%`)
        .limit(8);

      if (resp.error) {
        const resp2 = await supabase
          .from("products")
          .select("*")
          .ilike("title", `%${q}%`)
          .limit(8);

        resp = resp2;
      }

      if (reqId !== activeReqRef.current) return;

      setLoading(false);

      if (resp.error) {
        console.error("Supabase product search error:", resp.error);
        setErrMsg(resp.error.message);
        setResults([]);
        setOpen(true);
        return;
      }

      setResults(resp.data || []);
      setOpen(true);
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function handleQueryChange(e) {
    const next = e.target.value;
    setQuery(next);

    if (!next.trim()) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      setLoading(false);
      setErrMsg("");
      setResults([]);
      setOpen(false);
    }
  }

  function removeProduct(productId) {
    setVideo((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.productId !== productId),
    }));
  }

  function addProduct(p) {
    const id = p.product_id ?? p.productId ?? p.id;
    const name = p.name ?? p.title;
    const price = p.price ?? 0;

    if (!id || !name) return;

    const alreadyAdded = video.products.some((x) => x.productId === id);
    if (alreadyAdded) {
      setQuery("");
      setOpen(false);
      setResults([]);
      setErrMsg("");
      return;
    }

    setVideo((prev) => ({
      ...prev,
      products: [...prev.products, { productId: id, name, price, images: [] }],
    }));

    setQuery("");
    setResults([]);
    setOpen(false);
    setErrMsg("");
  }

  return (
    <div className="space-y-6" ref={containerRef}>
      <div>
        <h3 className="text-lg font-semibold">Products</h3>
        <p className="text-sm text-gray-500 mt-1">
          Search products from your database and add them to this tutorial.
        </p>
      </div>

      <div className="grid gap-3">
        {video.products.map((p) => (
          <div
            key={p.productId}
            className="flex items-center justify-between rounded-2xl border border-gray-200 p-4"
          >
            <div className="min-w-0">
              <p className="font-medium truncate">{p.name}</p>
              <p className="text-sm text-gray-500">
                ${Number(p.price || 0).toFixed(2)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeProduct(p.productId)}
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Add product
        </label>

        <input
          value={query}
          onChange={handleQueryChange}
          onFocus={() => query.trim() && setOpen(true)}
          className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-orange-200"
          placeholder="Search products..."
        />

        {open && (
          <div className="absolute z-50 mt-2 w-full rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
            {loading && (
              <div className="px-4 py-3 text-sm text-gray-500">Searching…</div>
            )}

            {!loading && errMsg && (
              <div className="px-4 py-3 text-sm text-red-600">{errMsg}</div>
            )}

            {!loading && !errMsg && results.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500">
                No matches found.
              </div>
            )}

            {!loading &&
              !errMsg &&
              results.map((p) => {
                const id =
                  p.product_id ?? p.productId ?? p.id ?? p.name ?? p.title;
                const name = p.name ?? p.title ?? "Untitled";
                const price = p.price ?? 0;

                const disabled = video.products.some((x) => x.productId === id);

                return (
                  <button
                    key={String(id)}
                    type="button"
                    disabled={disabled}
                    onClick={() => addProduct(p)}
                    className={`w-full text-left px-4 py-3 transition hover:bg-orange-50 ${
                      disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{name}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {String(id)}
                        </p>
                      </div>
                      <div className="text-sm font-semibold">
                        ${Number(price || 0).toFixed(2)}
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
