import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseClient";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password, phone, address } = await req.json();

    // ALWAYS normalize email
    const normalizedEmail = email.toLowerCase();

    // 1. Check if user exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", normalizedEmail)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert user
    const { error } = await supabase.from("users").insert([
      {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        phone,
        address,
      },
    ]);

    if (error) {
      return NextResponse.json(
        { message: "Error creating user", error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong", error: err.message },
      { status: 500 }
    );
  }
}
