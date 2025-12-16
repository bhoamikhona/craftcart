"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";
import Image from "next/image";

export default function Settings() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;

    async function loadUser() {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("email", session.user.email)
        .single();

      // Create local fields for inputs that do NOT exist in DB
      setUserData({
        ...data,
        city: "",
        state: "",
        country: "",
        zipCode: "",
      });
    }

    loadUser();
  }, [session]);

  if (!userData) return <p className="text-center mt-10">Loading...</p>;

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  async function saveChanges(e) {
    e.preventDefault();
    setSaving(true);

    await supabase
      .from("users")
      .update({
        first_name: userData.first_name,
        last_name: userData.last_name,
        bio: userData.bio,
        website: userData.website,
        phone: userData.phone,
        address: userData.address,
        location: userData.city || userData.state || userData.country || "",
      })
      .eq("email", session.user.email);

    setSaving(false);
    alert("Saved!");
  }

  async function uploadAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const ext = file.name.split(".").pop();
    const fileName = `${session.user.id}_${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, { upsert: true });

    if (error) {
      alert("Upload failed");
      setIsUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    const avatar = urlData.publicUrl;

    await supabase
      .from("users")
      .update({ avatar_url: avatar })
      .eq("email", session.user.email);

    setUserData({ ...userData, avatar_url: avatar });
    setIsUploading(false);
  }

  async function deleteAvatar() {
    await supabase
      .from("users")
      .update({ avatar_url: null })
      .eq("email", session.user.email);

    setUserData({ ...userData, avatar_url: null });
  }

  return (
    <form
      onSubmit={saveChanges}
      className="border rounded-md border-gray-300 max-w-7xl p-10 mx-auto mt-10 mb-12"
    >
      <div>
        <div className="flex items-center gap-6 pb-6 border-b border-gray-300">
          <Image
            src={userData.avatar_url || "/images/users/default-avatar.png"}
            alt="avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h1 className="font-bold">
              {userData.first_name} {userData.last_name}
            </h1>
            <p className="text-sm text-gray-600">Profile Settings</p>
          </div>
        </div>

        {/* BASIC INFO */}
        <SettingsSection
          title="Basic Information"
          description="Edit your name, bio, website, and profile picture."
        >
          <div className="flex md:flex-row flex-col gap-4 mb-6">
            <div className="input-control flex-1 flex flex-col gap-2">
              <label>First Name</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                name="first_name"
                value={userData.first_name || ""}
                onChange={handleInput}
              />
            </div>

            <div className="input-control flex-1 flex flex-col gap-2">
              <label>Last Name</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                name="last_name"
                value={userData.last_name || ""}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="input-control flex flex-col gap-2 mb-6">
            <label>Bio</label>
            <textarea
              className="border border-gray-300 p-2 rounded-md"
              name="bio"
              value={userData.bio || ""}
              onChange={handleInput}
            />
          </div>

          <div className="input-control flex flex-col gap-2 mb-6">
            <label>Website</label>
            <input
              className="border border-gray-300 p-2 rounded-md"
              name="website"
              value={userData.website || ""}
              onChange={handleInput}
            />
          </div>

          <div className="border border-gray-300 rounded-md flex h-30">
            <div className="flex-1 flex items-center justify-center">
              <Image
                src={userData.avatar_url || "/images/users/default-avatar.png"}
                alt="avatar"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              <label className="text-emerald-500 border border-t-0 border-r-0 border-gray-300 w-full h-full text-center pt-4 cursor-pointer">
                <input type="file" className="hidden" onChange={uploadAvatar} />
                Upload Image
              </label>

              <button
                type="button"
                className="text-rose-400 border-l border-gray-300 w-full h-full"
                onClick={deleteAvatar}
              >
                Delete Image
              </button>
            </div>
          </div>
        </SettingsSection>

        {/* CONTACT INFORMATION */}
        <SettingsSection
          title="Contact Information"
          description="Setup your contact information."
        >
          <div className="flex flex-col gap-4">
            <div className="input-control flex flex-col gap-2">
              <label>Email Address</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                value={userData.email}
                disabled
              />
            </div>

            <div className="input-control flex flex-col gap-2">
              <label>Phone Number</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                name="phone"
                value={userData.phone || ""}
                onChange={handleInput}
              />
            </div>

            <div className="input-control flex flex-col gap-2">
              <label>Address</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                name="address"
                value={userData.address || ""}
                onChange={handleInput}
              />

              <div className="flex gap-4">
                <input
                  className="border border-gray-300 p-2 rounded-md w-full"
                  name="city"
                  placeholder="City"
                  value={userData.city}
                  onChange={handleInput}
                />

                <input
                  className="border border-gray-300 p-2 rounded-md w-full"
                  name="state"
                  placeholder="State"
                  value={userData.state}
                  onChange={handleInput}
                />
              </div>

              <div className="flex gap-4">
                <input
                  className="border border-gray-300 p-2 rounded-md w-full"
                  name="country"
                  placeholder="Country"
                  value={userData.country}
                  onChange={handleInput}
                />

                <input
                  className="border border-gray-300 p-2 rounded-md w-full"
                  name="zipCode"
                  placeholder="Zip Code"
                  value={userData.zipCode}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* DELETE ACCOUNT */}
        <SettingsSection
          title="Delete Account"
          description="Permanently delete your account."
        >
          <button type="button" className="text-rose-400">
            Delete Account
          </button>
        </SettingsSection>
      </div>

      <div className="flex justify-end w-full mt-6">
        <button
          type="submit"
          className="cursor-pointer bg-primary text-white px-6 py-3 rounded-md"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

function SettingsSection({ children, title, description }) {
  return (
    <div className="flex flex-col md:flex-row gap-8 py-6 border-b border-gray-300">
      <div className="flex-1">
        <h2 className="font-bold mb-1">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="flex-2">{children}</div>
    </div>
  );
}
