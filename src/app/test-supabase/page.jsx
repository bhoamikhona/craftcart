// /app/test-supabase/page.js   (if using App Router)
import supabase from "@/lib/supabaseClient";

export default async function TestSupabase() {
  // Log environment variables
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Supabase ANON Key (Public Key):", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const { data, error } = await supabase.from("users").select("*").limit(1);

  return (
    <pre>
      {error ? "Error: " + error.message : JSON.stringify(data, null, 2)}
    </pre>
  );
}