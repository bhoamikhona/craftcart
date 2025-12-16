"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { X } from "lucide-react";

function normalizeImg(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return url.startsWith("/") ? url : `/${url}`;
}

function mapRowToProduct(p) {
  const id = p.product_id ?? p.productId ?? p.id;
  const name = p.name ?? p.title ?? "";
  const price = Number(p.price ?? 0);

  const imgsRaw = Array.isArray(p.images)
    ? p.images
    : p.images
    ? [p.images]
    : [];

  const images = imgsRaw.filter(Boolean).map(normalizeImg);

  return { productId: id, name, price, images };
}

export default function ProductsTab(props) {
  // supports BOTH parent styles:
  // 1) selectedProducts/setSelectedProducts
  // 2) video/setVideo
  const selectedProducts =
    props.selectedProducts ?? props.video?.products ?? [];
  const setSelectedProducts = props.setSelectedProducts;
  const setVideo = props.setVideo;

  const updateSelected = (updater) => {
    if (setSelectedProducts) {
      setSelectedProducts((prev = []) => updater(prev));
      return;
    }
    if (setVideo) {
      setVideo((prev) => ({
        ...prev,
        products: updater(prev.products ?? []),
      }));
    }
  };

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const q = useMemo(() => query.trim(), [query]);

  const debounceRef = useRef(null);
  const containerRef = useRef(null);
  const activeReqRef = useRef(0);

  // click outside closes results
  useEffect(() => {
    function onDocMouseDown(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  // ✅ only run effect when query has text (no empty-case setState here)
  useEffect(() => {
    if (!q) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    const reqId = ++activeReqRef.current;

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);

        let resp = await supabase
          .from("products")
          .select("product_id, name, price, images")
          .ilike("name", `%${q}%`)
          .limit(8);

        // optional fallback (kept)
        if (resp.error) {
          const resp2 = await supabase
            .from("products")
            .select("product_id, name, price, images")
            .ilike("title", `%${q}%`)
            .limit(8);
          resp = resp2;
        }

        if (reqId !== activeReqRef.current) return;

        if (resp.error) {
          console.error("Supabase product search error:", resp.error);
          setResults([]);
          setOpen(true);
          return;
        }

        setResults((resp.data ?? []).map(mapRowToProduct));
        setOpen(true);
      } finally {
        if (reqId === activeReqRef.current) setLoading(false);
      }
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [q]);

  // ✅ clear state on user input change (NOT inside effect)
  const handleQueryChange = (e) => {
    const next = e.target.value;
    setQuery(next);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!next.trim()) {
      // user cleared input → reset UI state here
      activeReqRef.current += 1; // cancel any in-flight responses
      setLoading(false);
      setResults([]);
      setOpen(false);
      return;
    }

    // show dropdown while typing (same behavior as before)
    setOpen(true);
  };

  const addProduct = (p) => {
    if (!p?.productId) return;

    const already = selectedProducts.some((x) => x.productId === p.productId);
    if (already) {
      setQuery("");
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    updateSelected((prev) => [...prev, p]);

    setQuery("");
    setResults([]);
    setOpen(false);
    setLoading(false);
  };

  const removeProduct = (productId) => {
    updateSelected((prev) => prev.filter((p) => p.productId !== productId));
  };

  return (
    <div className="space-y-6" ref={containerRef}>
      <div>
        <label className="block font-medium font-semibold mb-2">
          Add product
        </label>
        <input
          value={query}
          onChange={handleQueryChange}
          onFocus={() => q && setOpen(true)}
          placeholder="Search products..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none"
        />
      </div>

      {open && (
        <div className="space-y-3">
          {loading && <p className="text-sm text-gray-500">Searching…</p>}

          {!loading && results.length > 0 && (
            <div className="flex flex-col gap-4">
              {results.map((p) => (
                <button
                  key={p.productId}
                  onClick={() => addProduct(p)}
                  className="text-left rounded-xl p-4 shadow-[0_0_12px_rgba(0,0,0,0.15)] hover:bg-orange-200 transition cursor-pointer"
                  type="button"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-[60px] h-[60px] rounded-lg overflow-hidden bg-gray-100">
                      {p.images?.[0] ? (
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{p.name}</h4>
                      <p className="text-sm text-gray-600">
                        ${Number(p.price ?? 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!loading && q && results.length === 0 && (
            <p className="text-sm text-gray-500">No matches found.</p>
          )}
        </div>
      )}

      {selectedProducts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm">Added products</h3>

          {selectedProducts.map((p) => (
            <div
              key={p.productId}
              className="flex items-center justify-between p-4 rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.12)] bg-white cursor-pointer hover:bg-orange-200"
            >
              <div className="flex gap-4 items-center">
                <div className="w-[50px] h-[50px] rounded-lg overflow-hidden bg-gray-100">
                  {p.images?.[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div>
                  <h4 className="font-medium">{p.name}</h4>
                  <p className="text-sm text-gray-600">
                    ${Number(p.price ?? 0).toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeProduct(p.productId)}
                className="p-2 rounded-full hover:bg-orange-200"
                type="button"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
