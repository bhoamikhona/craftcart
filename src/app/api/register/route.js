import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseClient";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password, phone, address } = await req.json();

    const normalizedEmail = email.toLowerCase();

    // Split name into first/last
    const parts = (name || "").trim().split(" ");
    const first_name = parts[0] || "";
    const last_name = parts.slice(1).join(" ") || "";

    // 1. Check if user exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", normalizedEmail)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert user
    const { error } = await supabase.from("users").insert([
      {
        name,
        first_name,
        last_name,
        email: normalizedEmail,
        password: hashedPassword,
        phone,
        address,
      },
    ]);

    if (error) {
      return NextResponse.json(
        { message: "Error creating user", error },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong", error: err.message },
      { status: 500 },
    );
  }
}
