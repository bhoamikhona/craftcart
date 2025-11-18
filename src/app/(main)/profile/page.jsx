"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!session?.user?.email) return;

    async function fetchUser() {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", session.user.email)
        .single();

      if (!error) setUserData(data);
    }

    fetchUser();
  }, [session]);

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;
  if (!session) return <p className="text-center mt-10">Please login.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 pb-10">
      
      {/* Profile Image */}
      <div className="relative">
        <div className="w-40 h-40 rounded-full border border-gray-400 flex items-center justify-center overflow-hidden">
          {userData?.avatar_url ? (
            <img
              src={userData.avatar_url}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-sm">Profile Photo</div>
          )}
        </div>

        {/* Change button (upload paused) */}
        <label
          htmlFor="avatarUpload"
          className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs px-3 py-1 rounded cursor-pointer"
        >
          Change
        </label>
        <input id="avatarUpload" type="file" className="hidden" disabled />
      </div>

      {/* User Name */}
      <h1 className="mt-5 text-2xl font-semibold">{userData?.name || "User"}</h1>

      {/* Email */}
      <p className="text-gray-600">{userData?.email}</p>

      {/* BIO + LOCATION + WEBSITE */}
      <div className="mt-4 text-center max-w-md text-gray-700 leading-relaxed">
        {userData?.bio && (
          <p className="whitespace-pre-line">{userData.bio}</p>
        )}

        {userData?.location && (
          <p className="mt-2 flex items-center justify-center gap-1 text-gray-600">
            <span>📍</span> {userData.location}
          </p>
        )}

        {userData?.website && (
          <a
            href={userData.website.startsWith("http") ? userData.website : `https://${userData.website}`}
            target="_blank"
            className="mt-1 block text-purple-600 hover:underline"
          >
            🔗 {userData.website}
          </a>
        )}
      </div>

      {/* Stats Row */}
      <div className="flex gap-10 mt-6 text-center">
        <div>
          <p className="font-semibold">{userData?.projects_count || 0}</p>
          <p className="text-sm text-gray-500">projects</p>
        </div>
        <div>
          <p className="font-semibold">{userData?.followers_count || 0}</p>
          <p className="text-sm text-gray-500">followers</p>
        </div>
        <div>
          <p className="font-semibold">{userData?.following_count || 0}</p>
          <p className="text-sm text-gray-500">following</p>
        </div>
        <div>
          <p className="font-semibold">{userData?.rating || 0}</p>
          <p className="text-sm text-gray-500">rating</p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-3xl mt-10 border-t border-gray-300"></div>

      {/* Tabs */}
      <div className="mt-5 text-gray-600 flex gap-5">
        <span className="cursor-pointer hover:text-black">Saved</span>
        <span className="cursor-pointer hover:text-black">My Tutorials</span>
        <span className="cursor-pointer hover:text-black">Orders (coming next)</span>
      </div>
    </div>
  );
}
