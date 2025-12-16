"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import ProfileTutorialCard from "@/components/Profile/ProfileTutorialCard";
import Link from "next/link";
import Image from "next/image";
import { CiLocationOn, CiGlobe } from "react-icons/ci";
import Loader from "@/components/ui/loader";
import useSavedVideos from "@/hooks/useSavedVideos";
import VideoCard from "@/components/ui/VideoCard";

// SAVED dummy tutorials remain
const savedTutorialsData = [
  {
    id: 1,
    title: "Ceramic Glazing Techniques",
    duration: "12:05",
    image_url:
      "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/saved_1.jpg",
    views: 25000,
  },
  {
    id: 2,
    title: "Home Decor Crochet Pattern",
    duration: "30:40",
    image_url:
      "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/saved_2.png",
    views: 15000,
  },
  {
    id: 3,
    title: "DIY Resin Art Coasters",
    duration: "10:15",
    image_url:
      "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/saved_3.webp",
    views: 18000,
  },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [userTutorials, setUserTutorials] = useState([]); // NEW
  const [activeTab, setActiveTab] = useState("MY_TUTORIALS");

  const { savedVideos } = useSavedVideos();

  useEffect(() => {
    if (!session?.user?.email) return;

    async function loadUser() {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("email", session.user.email)
        .single();

      setUserData(data);
    }

    async function loadTutorials() {
      const { data } = await supabase
        .from("tutorials")
        .select("*")
        .eq("creator_id", session.user.id);

      setUserTutorials(data || []);
    }

    loadUser();
    loadTutorials();
  }, [session]);

  if (status === "loading") return <Loader />;
  if (!session) return <p className="text-center mt-10">Please login.</p>;

  return (
    <main className="min-h-screen pt-16 pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Profile header remains identical */}
        <div className="flex md:flex-row flex-col items-center justify-center gap-6 my-12">
          <div className="border-20 rounded-full border-orange-100 h-[180px] w-[180px] overflow-hidden">
            <img
              src={
                userData?.avatar_url
                  ? userData.avatar_url
                  : "/images/users/default-avatar.png"
              }
              alt={`${userData?.name}'s headshot`}
            />
          </div>

          <div className="flex flex-col">
            <div className="pb-3 border-b border-gray-300">
              <h1 className="text-lg font-bold mb-1 text-center md:text-left">
                {userData?.name}
              </h1>
              <p className="flex justify-center md:justify-start items-center gap-1 text-sm">
                <CiLocationOn className="text-lg text-primary" />
                {userData?.location || "New York"}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-10 py-3 border-b border-gray-300">
              <div className="flex flex-col items-center">
                <p className="font-bold">{userTutorials.length}</p>
                <h3 className="text-sm">Posts</h3>
              </div>

              <div className="flex flex-col items-center">
                <p className="font-bold">{userData?.followers_count || 0}</p>
                <h3 className="text-sm">Followers</h3>
              </div>

              <div className="flex flex-col items-center">
                <p className="font-bold">{userData?.following_count || 0}</p>
                <h3 className="text-sm">Following</h3>
              </div>
            </div>

            <div className="max-w-xs">
              <p className="mt-3 text-gray-700 text-sm text-center md:text-left mb-3">
                {userData?.bio}
              </p>

              {userData?.website && (
                <p className="flex justify-center md:justify-start items-center gap-1 text-sm">
                  <CiGlobe className="text-lg text-primary" />
                  <a className="footer__link" href={userData.website}>
                    {userData.website}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Post Tutorial Button */}
        <div className="flex justify-end w-full mt-4">
          <Link href="/studio">
            <button className="btn-primary flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Post Tutorial
            </button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex justify-center gap-6 border-b border-gray-300 text-gray-600 mb-16">
          <span
            className={`cursor-pointer pb-2 ${activeTab === "MY_TUTORIALS"
                ? "font-bold border-b-2 border-primary text-black"
                : "hover:text-black"
              }`}
            onClick={() => setActiveTab("MY_TUTORIALS")}
          >
            MY TUTORIALS
          </span>

          <span
            className={`cursor-pointer pb-2 ${activeTab === "SAVED"
                ? "font-bold border-b-2 border-primary text-black"
                : "hover:text-black"
              }`}
            onClick={() => setActiveTab("SAVED")}
          >
            SAVED
          </span>
        </div>

        {/* Content */}
        <div className="mt-4">
          {/* MY TUTORIALS — REAL DATA */}
          {/* {activeTab === "MY_TUTORIALS" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userTutorials.length === 0 && (
                <p className="text-center text-gray-500 col-span-full">
                  You have not uploaded any tutorials yet.
                </p>
              )}

              {userTutorials.map((tutorial) => (
                <ProfileTutorialCard
                  key={tutorial.tutorial_id}
                  tutorial={{
                    id: tutorial.tutorial_id,
                    title: tutorial.title,
                    image_url:
                      tutorial.thumbnail_url || "/images/thumbnail/craft.jpg",
                    duration: tutorial.duration || "00:00",
                    views: tutorial.likes || 0,
                  }}
                />
              ))}
            </div>
          )} */}
          {activeTab === "MY_TUTORIALS" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userTutorials.length === 0 && (
                <p className="text-center text-gray-500 col-span-full">
                  You have not uploaded any tutorials yet.
                </p>
              )}

              {userTutorials.map((tutorial) => (
                <VideoCard
                  key={tutorial.tutorial_id}
                  v={{
                    id: tutorial.tutorial_id,
                    title: tutorial.title,
                    thumbnail:
                      tutorial.thumbnail_url || "/images/thumbnail/craft.jpg",
                    views: tutorial.likes || 0,
                    created_at: tutorial.created_at,
                    creator: {
                      avatar_url:
                        userData?.avatar_url || "/images/users/default-avatar.png",
                      full_name: userData?.name || "Unknown Creator",
                    },
                  }}
                />
              ))}
            </div>
          )}


          {activeTab === "SAVED" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedVideos.length === 0 && (
                <p className="text-center text-gray-500 col-span-full">
                  No saved videos yet.
                </p>
              )}

              {savedVideos.map((v) => (
                <VideoCard key={v.id} v={v} />
              ))}
            </div>
          )}

          {/* SAVED — dummy data stays
          {activeTab === "SAVED" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTutorialsData.map((tutorial) => (
                <ProfileTutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          )} */}
        </div>
      </div>
    </main>
  );
}
