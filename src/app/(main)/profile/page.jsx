"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import ProfileTutorialCard from "@/components/Profile/ProfileTutorialCard"; 

// ----------------------------------------------------------------------------------
// --- DUMMY DATA (RESTORED) ---
// ----------------------------------------------------------------------------------

// Dummy Category Data 
const categories = [
    
    { name: "Macramé", url: "/images/category-macrame.jpeg" },
    { name: "Ceramics", url: "/images/category-ceramics.jpeg" },
    { name: "Wood", url: "/images/category-wood.jpeg" },
    { name: "Tutorials", url: "/images/category-tutorials.jpeg" },
];

// Dummy My Tutorials Data (User's Uploaded Posts)
const myTutorialsData = [
    { 
        id: 101, 
        title: "Macramé Plant Hanger Tutorial", 
        duration: "15:23", 
        image_url: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/video_post1.png", 
        views: 12453 
    },
    { id: 102, title: "Pottery Basics: Making Your First Bowl", duration: "28:32", image_url: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/videp_post4.png", views: 15678 },
    { id: 103, title: "Woodworking 101: Creating a Cutting Board", duration: "20:15", image_url: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/videp_post3.png", views: 9234 },
    { id: 104, title: "Advanced Macramé Knots and Patterns", duration: "18:45", image_url: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/videp_post2.png", views: 6734 },
    { id: 105, title: "5 Easy Craft Projects You Can Do Today", duration: "22:10", image_url: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/craft-%20images/videp_post5.png", views: 8921 },
];

// Dummy Saved Tutorials Data (Posts the user liked/saved)
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

// ----------------------------------------------------------------------------------
// --- MAIN COMPONENT ---
// ----------------------------------------------------------------------------------

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('MY_TUTORIALS');
  const [isUploading, setIsUploading] = useState(false); // New upload state

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


  // ----------------------------------------------------------------------
  // Avatar Upload Logic
  // ----------------------------------------------------------------------
  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !userData?.id) return;

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${userData.id}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`; 

    try {
      // 1. Upload file to Supabase Storage (assuming bucket is 'avatars')
      const { error: uploadError } = await supabase.storage
        .from('avatars') 
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 2. Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // 3. Update the user's avatar_url in the 'users' table
      const { error: dbError } = await supabase
        .from('users')
        .update({ avatar_url: publicUrl })
        .eq('id', userData.id);

      if (dbError) throw dbError;

      // 4. Update the local state
      setUserData(prev => ({ ...prev, avatar_url: publicUrl }));
      
    } catch (error) {
      console.error('Avatar upload failed:', error);
      alert('Error uploading avatar: ' + error.message);
    } finally {
      setIsUploading(false);
      event.target.value = null; // Reset input
    }
  };


  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;
  if (!session) return <p className="text-center mt-10">Please login.</p>;

  return (
    <div className="min-h-screen pt-16 pb-10">
      
      {/* Main Profile Content Wrapper: All content is left-aligned within this max-w container */}
      <div className="max-w-5xl mx-auto px-6"> 
        
        {/* TOP FLEX CONTAINER: Picture + Stats */}
        <div className="flex items-center gap-10">
          
          {/* 1. Profile Picture & Upload Logic */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 rounded-full border border-gray-400 flex items-center justify-center overflow-hidden">
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

            {/* Change button (Label linked to the hidden input) */}
            <label
              htmlFor="avatarUpload"
              className={`absolute bottom-2 right-2 text-white text-xs px-3 py-1 rounded cursor-pointer transition 
                ${isUploading ? 'bg-gray-500' : 'bg-orange-500 hover:bg-orange-600'}`}
            >
              {isUploading ? 'Uploading...' : 'Change'}
            </label>
            
            {/* HIDDEN INPUT: Attached the onChange handler to trigger the upload */}
            <input 
              id="avatarUpload" 
              type="file" 
              accept="image/*"
              className="hidden" 
              onChange={handleAvatarUpload}
              disabled={isUploading}
            />
          </div>

          {/* 2. Stats Row (Horizontal Alignment with Picture) */}
          <div className="flex gap-10 text-base font-semibold text-gray-800">
            {/* Stats Items */}
            <div className="flex items-center gap-2">
              <p>{userData?.projects_count || 0}</p>
              <p className="font-normal text-gray-700 text-sm">projects</p>
            </div>
            <div className="flex items-center gap-2">
              <p>{userData?.followers_count || 0}</p>
              <p className="font-normal text-gray-700 text-sm">followers</p>
            </div>
            <div className="flex items-center gap-2">
              <p>{userData?.following_count || 0}</p>
              <p className="font-normal text-gray-700 text-sm">following</p>
            </div>
            {/* Rating */}
            <div className="flex items-center gap-1 text-purple-700">
              <p className="font-bold text-lg">★</p>
              <p className="text-base">{userData?.rating || 0}</p>
              <p className="font-normal text-gray-700 text-sm">rating</p>
            </div>
          </div>
        </div>
        
        {/* 3. SECOND BLOCK: User Name, Bio, Location (Starts below the avatar/stats block) */}
        <div className="mt-4 pl-[8rem]"> {/* Use pl-[8rem] or similar to align with stats text */}
        
            {/* User Name */}
            <h1 className="text-lg font-semibold text-gray-800">{userData?.name || "User"}</h1>

            {/* BIO + LOCATION + WEBSITE */}
            <div className="mt-1 text-sm text-gray-700 leading-relaxed">
                {userData?.bio && (
                <p className="whitespace-pre-line">{userData.bio}</p>
                )}

                {userData?.location && (
                <p className="mt-1 flex items-center gap-1 text-gray-600">
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
        </div>

        {/* Divider */}
        <div className="w-full mt-10 border-t border-gray-300"></div>

        {/* Tabs */}
        <div className="mt-5 text-gray-600 flex gap-10">
          <span
            className={`cursor-pointer ${activeTab === 'SAVED' ? 'font-bold text-black' : 'hover:text-black'}`}
            onClick={() => setActiveTab('SAVED')}
          >
            SAVED
          </span>
          <span
            className={`cursor-pointer ${activeTab === 'MY_TUTORIALS' ? 'font-bold text-black' : 'hover:text-black'}`}
            onClick={() => setActiveTab('MY_TUTORIALS')}
          >
            MY TUTORIALS
          </span>
          <span
            className={`cursor-pointer ${activeTab === 'ORDERS' ? 'font-bold text-black' : 'hover:text-black'}`}
            onClick={() => setActiveTab('ORDERS')}
          >
            ORDERS
          </span>
        </div>
      </div>
      
      {/* Tab Content (Video Grid) - Needs to be inside the same wrapper or use the same max-w */}
      <div className="w-full max-w-5xl mx-auto px-6 mt-5">
        
        {/* MY TUTORIALS Content (User's Uploaded Posts) */}
        {activeTab === 'MY_TUTORIALS' && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 pt-3">
            {myTutorialsData.map(tutorial => (
              <ProfileTutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
             {myTutorialsData.length === 0 && (
                <p className="col-span-4 text-center text-gray-500 pt-10">You have not uploaded any tutorials yet.</p>
            )}
          </div>
        )}

        {/* SAVED Content (Liked/Saved Posts) */}
        {activeTab === 'SAVED' && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 pt-3">
                {savedTutorialsData.map(tutorial => (
                    <ProfileTutorialCard key={tutorial.id} tutorial={tutorial} />
                ))}
                {savedTutorialsData.length === 0 && (
                    <p className="col-span-4 text-center text-gray-500 pt-10">You have not saved any tutorials yet.</p>
                )}
            </div>
        )}

        {/* ORDERS Content */}
        {activeTab === 'ORDERS' && (
          <div className="space-y-6 max-w-3xl mx-auto pt-3">
            {orders.map(order => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                <div className="flex flex-col">
                  <div className="text-lg font-semibold">Order #{order.id}</div>
                  <div className="text-sm text-gray-500">{order.date}</div>
                  <div className="flex mt-2 space-x-2">
                    {order.images.map((img, index) => (
                      <img key={index} src={img} alt={`Item ${index + 1}`} className="w-12 h-12 object-cover rounded" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-700 mt-2">{order.items} item{order.items > 1 ? 's' : ''}</div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                       order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                       'bg-gray-100 text-gray-800'}`}
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
  );
}