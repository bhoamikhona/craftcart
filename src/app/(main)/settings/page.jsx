"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";
import Image from "next/image";

export default function Settings() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("MY_TUTORIALS");
  const [isUploading, setIsUploading] = useState(false);

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

  return (
    <form className="border rounded-md border-gray-300 max-w-7xl p-10 mx-auto mt-10 mb-12">
      <div>
        <div className="flex items-center gap-6 pb-6 border-b border-gray-300">
          <div>
            <Image
              src={userData?.avatar_url || "/images/users/default-avatar.png"}
              alt={`${userData?.name}'s headshot`}
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold">{userData?.name}</h1>
            <p className="text-sm text-gray-600">Profile Settings</p>
          </div>
        </div>

        {/* BASIC INFORMATION */}
        <SettingsSection
          title="Basic Information"
          description="Edit your name, bio, website, and profile picture."
        >
          <div className="flex md:flex-row flex-col gap-4 mb-6">
            <div className="input-control flex-1 flex flex-col gap-2">
              <label htmlFor="firstName">First Name</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                type="text"
                placeholder="First Name"
                id="firstName"
                name="firstName"
              />
            </div>
            <div className="input-control flex-1 flex flex-col gap-2">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                type="text"
                placeholder="Last Name"
                id="lastName"
                name="lastName"
              />
            </div>
          </div>

          <div className="input-control flex flex-col gap-2 mb-6">
            <label htmlFor="bio">Bio</label>
            <textarea
              className="border border-gray-300 p-2 rounded-md"
              type="text"
              placeholder="Tell us a little about yourself"
              id="bio"
              name="bio"
            />
          </div>

          <div className="input-control flex-1 flex flex-col gap-2 mb-6">
            <label htmlFor="website">Website</label>
            <input
              className="border border-gray-300 p-2 rounded-md"
              type="text"
              placeholder="Website"
              id="website"
              name="website"
            />
          </div>

          <div className="border border-gray-300 rounded-md flex h-30">
            <div className="flex-1 flex items-center justify-center">
              <Image
                src={userData?.avatar_url || "/images/users/default-avatar.png"}
                alt={`${userData?.name}'s headshot`}
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <div className=" flex-1 flex flex-col items-center justify-center">
              <button className="text-emerald-500 border border-t-0 border-r-0 border-gray-300 w-full h-full cursor-pointer">
                Upload Image
              </button>
              <button className="text-rose-400 border-l border-gray-300 w-full h-full cursor-pointer">
                Delete Image
              </button>
            </div>
          </div>
        </SettingsSection>

        {/* CONTACT INFORMATION */}
        <SettingsSection
          title="Contact Information"
          description="Setup your contact information for account security and shipping details."
        >
          <div className="flex flex-col items-stretch gap-4">
            <div className="input-control flex flex-col gap-2 flex-1">
              <label htmlFor="email">Email Address</label>
              <input
                className="border border-gray-300 p-2 rounded-md "
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
              />
            </div>

            <div className="input-control flex flex-col gap-2 flex-1">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="flex md:flex-row flex-col gap-4">
                <input
                  className="border border-gray-300 p-2 rounded-md "
                  type="tel"
                  placeholder="Country Code"
                  id="countryCode"
                  name="countryCode"
                />
                <input
                  className="border border-gray-300 p-2 rounded-md flex-1"
                  type="tel"
                  placeholder="Phone Number"
                  id="phoneNumber"
                  name="phoneNumber"
                />
              </div>
            </div>

            <div className="input-control flex flex-col gap-2">
              <label htmlFor="address">Address</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                type="text"
                id="address"
                name="address"
                placeholder="Address"
              />
              <div className="flex flex-col">
                <div className="flex gap-4">
                  <input
                    className="border border-gray-300 p-2 rounded-md w-full mb-2"
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                  />
                  <input
                    className="border border-gray-300 p-2 rounded-md w-full mb-2"
                    type="text"
                    id="state"
                    name="state"
                    placeholder="State"
                  />
                </div>
                <div className="flex gap-4">
                  <input
                    className="border border-gray-300 p-2 rounded-md w-full mb-2"
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Country"
                  />
                  <input
                    className="border border-gray-300 p-2 rounded-md w-full mb-2"
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    placeholder="Zip Code"
                  />
                </div>
              </div>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Payment Information"
          description="Manage your payment methods and billing information."
        >
          <div className="flex flex-col items-stretch gap-4">
            <div className="input-control flex flex-col gap-2">
              <label htmlFor="cardholderName">Name on Card</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                type="text"
                id="cardholderName"
                name="cardholderName"
                placeholder="Name on Card"
              />
            </div>
            <div className="input-control flex flex-col gap-2">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="Card Number"
              />
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              <div className="input-control flex-1 flex flex-col gap-2">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  className="border border-gray-300 p-2 rounded-md"
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                />
              </div>
              <div className="input-control flex-1 flex flex-col gap-2">
                <label htmlFor="cvv">CVV</label>
                <input
                  className="border border-gray-300 p-2 rounded-md"
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="CVV"
                />
              </div>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Change Password"
          description="Update your account password regularly to keep your account secure."
        >
          <div>
            <div className="input-control flex flex-col gap-2 mb-4">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="Current Password"
              />
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              <div className="input-control flex-1 flex flex-col gap-2 mb-4">
                <label htmlFor="newPassword">New Password</label>
                <input
                  className="border border-gray-300 p-2 rounded-md"
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="New Password"
                />
              </div>
              <div className="input-control flex-1 flex flex-col gap-2 mb-4">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  className="border border-gray-300 p-2 rounded-md"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                />
              </div>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Delete Account"
          description="Permanently delete your account and all associated data."
          className="border-0"
        >
          <button className="text-rose-400 cursor-pointer">
            Delete Account
          </button>
        </SettingsSection>
      </div>
      <div className="flex justify-end w-full mt-6">
        <button
          type="submit"
          className="cursor-pointer text-align-right bg-primary text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

function SettingsSection({ children, title, description }) {
  return (
    <div className="flex flex-col md:flex-row gap-8 py-6 border-b border-gray-300 last:border-0">
      <div className="flex-1">
        <h2 className="font-bold mb-1">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="flex-2">{children}</div>
    </div>
  );
}
