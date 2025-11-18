
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import ProfileTutorialCard from "@/components/Profile/ProfileTutorialCard";
import Link from "next/link";

// Dummy My Tutorials Data
const myTutorialsData = [
  { id: 1, title: "Macramé Plant Hanger Tutorial", duration: "15:23", image_url: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/video_post1.png", views: 12453 },
  { id: 2, title: "Pottery Basics: Making Your First Bowl", duration: "28:32", image_url: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/videp_post4.png", views: 15678 },
  { id: 3, title: "Woodworking 101: Creating a Cutting Board", duration: "20:15", image_url: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/videp_post3.png", views: 9234 },
  { id: 4, title: "Advanced Macramé Knots and Patterns", duration: "18:45", image_url: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/videp_post2.png", views: 6734 },
  { id: 5, title: "5 Easy Craft Projects You Can Do Today", duration: "22:10", image_url: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/videp_post5.png", views: 8921 },
];

// Dummy Saved Tutorials Data
const savedTutorialsData = [
  { id: 11, title: "Ceramic Glazing Techniques", duration: "12:05", image_url: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/saved_1.jpg", views: 25000 },
  { id: 12, title: "Home Decor Crochet Pattern", duration: "30:40", image_url: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/saved_2.png", views: 15000 },
  { id: 13, title: "DIY Resin Art Coasters", duration: "10:15", image_url: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/saved_3.webp", views: 18000 },
];

// Dummy Order Data
const orders = [
  { id: 'ORD-2024-001', date: 'March 15, 2024', status: 'Delivered', items: 2, price: 77, images: ["/images/order-1a.jpeg", "/images/order-1b.jpeg"] },
  { id: 'ORD-2024-002', date: 'March 10, 2024', status: 'Shipped', items: 1, price: 78, images: ["/images/order-2a.jpeg"] },
  { id: 'ORD-2024-003', date: 'March 5, 2024', status: 'Processing', items: 2, price: 99, images: ["/images/order-3a.jpeg", "/images/order-3b.jpeg"] },
];

export default function ProfilePage() {
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

  const handleAvatarUpload = async (e) => {
    // placeholder for future upload logic
  };

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;
  if (!session) return <p className="text-center mt-10">Please login.</p>;

  return (
    <div className="min-h-screen pt-16 pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">

        {/* Avatar + Stats */}
        <div className="flex flex-col md:flex-row items-center gap-10 bg-card-bg rounded-2xl shadow p-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 rounded-full border border-gray-400 overflow-hidden flex items-center justify-center">
              {userData?.avatar_url ? (
                <img src={userData.avatar_url} className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400 text-sm">Profile Photo</div>
              )}
            </div>
            <label
              htmlFor="avatarUpload"
              className={`absolute bottom-2 right-2 text-white text-xs px-3 py-1 rounded cursor-pointer
                ${isUploading ? "bg-gray-500" : "bg-orange-500 hover:bg-orange-600"}`}
            >
              {isUploading ? "Uploading..." : "Change"}
            </label>
            <input
              id="avatarUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
              disabled={isUploading}
            />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 text-base font-semibold text-gray-800">
            <div>
              <p>{userData?.projects_count || 0}</p>
              <p className="text-gray-700 text-sm">projects</p>
            </div>
            <div>
              <p>{userData?.followers_count || 0}</p>
              <p className="text-gray-700 text-sm">followers</p>
            </div>
            <div>
              <p>{userData?.following_count || 0}</p>
              <p className="text-gray-700 text-sm">following</p>
            </div>
            <div className="flex items-center gap-1 text-purple-700">
              <p className="font-bold text-lg">★</p>
              <p>{userData?.rating || 0}</p>
              <p className="text-gray-700 text-sm">rating</p>
            </div>
          </div>
        </div>

        {/* Name + Bio */}
        <div className="mt-4 pl-0 md:pl-[8rem]">
          <h1 className="text-lg font-semibold text-gray-800">{userData?.name || "User"}</h1>
          <div className="mt-1 text-sm text-gray-700 leading-relaxed">
            {userData?.bio && <p>{userData.bio}</p>}
            {userData?.location && (
              <p className="flex items-center gap-1 text-gray-600">
                <span>📍</span> {userData.location}
              </p>
            )}
            {userData?.website && (
              <a
                href={userData.website.startsWith("http") ? userData.website : `https://${userData.website}`}
                className="text-purple-600 hover:underline"
                target="_blank"
              >
                🔗 {userData.website}
              </a>
            )}
          </div>
        </div>

        {/* Post Tutorial Button */}
        <div className="flex justify-end w-full mt-4">
          <Link href="/upload">
            <button className="btn-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Post Tutorial
            </button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-6 border-b border-gray-300 text-gray-600">
          <span
            className={`cursor-pointer pb-2 ${activeTab === "MY_TUTORIALS" ? "font-bold border-b-2 border-primary text-black" : "hover:text-black"}`}
            onClick={() => setActiveTab("MY_TUTORIALS")}
          >
            MY TUTORIALS
          </span>
          <span
            className={`cursor-pointer pb-2 ${activeTab === "SAVED" ? "font-bold border-b-2 border-primary text-black" : "hover:text-black"}`}
            onClick={() => setActiveTab("SAVED")}
          >
            SAVED
          </span>
          <span
            className={`cursor-pointer pb-2 ${activeTab === "ORDERS" ? "font-bold border-b-2 border-primary text-black" : "hover:text-black"}`}
            onClick={() => setActiveTab("ORDERS")}
          >
            ORDERS
          </span>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {/* MY TUTORIALS */}
          {activeTab === "MY_TUTORIALS" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myTutorialsData.map((tutorial) => (
                <ProfileTutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          )}

          {/* SAVED */}
          {activeTab === "SAVED" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTutorialsData.map((tutorial) => (
                <ProfileTutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          )}

          {/* ORDERS */}
          {activeTab === "ORDERS" && (
            <div className="grid grid-cols-1 gap-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-card-bg rounded-2xl shadow p-4 flex justify-between">
                  {/* Left */}
                  <div>
                    <div className="text-lg font-semibold">Order #{order.id}</div>
                    <div className="text-sm text-gray-500">{order.date}</div>
                    <div className="flex mt-2 space-x-2">
                      {order.images.map((img, i) => (
                        <img key={i} src={img} className="w-12 h-12 rounded object-cover" />
                      ))}
                    </div>
                    <div className="text-sm mt-2">{order.items} item{order.items > 1 ? "s" : ""}</div>
                  </div>

                  {/* Right */}
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                    <div className="mt-2 text-lg font-bold">${order.price}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
