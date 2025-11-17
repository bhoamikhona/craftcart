"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function ProfilePage() {
  // 1) All hooks at the top, always in same order
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);

  // 2) Fetch full user info from Supabase
  useEffect(() => {
    if (!session?.user?.email) return;

    async function fetchUser() {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", session.user.email)
        .single();

      if (error) {
        console.log("Error loading user:", error);
        return;
      }
      setUserData(data);
    }

    fetchUser();
  }, [session]);

  // 3) Handle loading and unauthenticated state
  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    // user not logged in
    redirect("/login");
  }

  if (!userData) {
    // logged in, but profile still loading
    return <p>Loading profile...</p>;
  }

  // 4) Now safe to render JSX
  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        {/* Profile Photo + Upload */}
        <div className="relative mb-4">
          <img
            src={
              userData.avatar_url ||
              "https://via.placeholder.com/150?text=Profile+Photo"
            }
            alt="Profile Photo"
            className="w-40 h-40 rounded-full object-cover border"
          />

          {/* Upload button */}
          <label
            htmlFor="avatarUpload"
            className="absolute bottom-0 right-0 bg-primary text-white px-2 py-1 text-xs rounded-md cursor-pointer"
          >
            Change
          </label>

          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const fileExt = file.name.split(".").pop();
              const fileName = `${session.user.id}.${fileExt}`;
              const filePath = `${fileName}`;

              // 1) upload to Supabase Storage
              const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file, { upsert: true });

              if (uploadError) {
                console.log("Upload error:", uploadError);
                return;
              }

              // 2) get public URL
              const { data } = supabase.storage
                .from("avatars")
                .getPublicUrl(filePath);

              const publicUrl = data.publicUrl;

              // 3) update user row
              const { error: updateError } = await supabase
                .from("users")
                .update({ avatar_url: publicUrl })
                .eq("user_id", session.user.id);

              if (updateError) {
                console.log("Update error:", updateError);
                return;
              }

              // 4) update UI immediately
              setUserData((prev) => ({ ...prev, avatar_url: publicUrl }));
            }}
          />
        </div>

        {/* Name + Email */}
        <h1 className="text-3xl font-bold">{userData.name}</h1>
        <p className="text-gray-500">{userData.email}</p>

        {/* Bio */}
        {userData.bio && (
          <p className="mt-3 max-w-md text-gray-600">{userData.bio}</p>
        )}

        {/* Location + Website */}
        <div className="flex gap-4 text-sm mt-3">
          {userData.location && (
            <p className="text-gray-600">📍 {userData.location}</p>
          )}
          {userData.website && (
            <a
              href={userData.website}
              className="text-blue-500 hover:underline"
              target="_blank"
            >
              🌐 {userData.website}
            </a>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-5 text-center">
          <div>
            <p className="font-bold">{userData.projects_count ?? 0}</p>
            <p className="text-gray-500 text-sm">projects</p>
          </div>
          <div>
            <p className="font-bold">{userData.followers_count ?? 0}</p>
            <p className="text-gray-500 text-sm">followers</p>
          </div>
          <div>
            <p className="font-bold">{userData.following_count ?? 0}</p>
            <p className="text-gray-500 text-sm">following</p>
          </div>
          <div>
            <p className="font-bold">{userData.rating ?? 0}</p>
            <p className="text-gray-500 text-sm">rating</p>
          </div>
        </div>
      </div>

      {/* Separator */}
      <hr />

      {/* Tabs placeholder */}
      <div className="mt-6 text-center text-gray-500">
        <p>Saved | My Tutorials | Orders (coming next)</p>
      </div>
    </div>
  );
}
