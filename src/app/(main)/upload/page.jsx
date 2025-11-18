// src/app/(main)/upload/page.jsx

"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabaseClient';

export default function UploadPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    // Redirect unauthenticated users
    if (status === "loading") return <p className="text-center mt-10">Loading...</p>;
    if (!session) {
        router.push('/login');
        return null;
    }
    
    // Assume user ID is available on the session object
    const userId = session.user.id; 

    const handleFileChange = (e) => {
        setFile(e.target.files?.[0] || null);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setUploadError(null);
        if (!file || !title || !description) {
            setUploadError("Please select a video file, title, and description.");
            return;
        }

        setIsUploading(true);
        
        // Ensure you have a 'tutorial-videos' bucket set up in Supabase Storage!
        const bucketName = 'tutorial-videos';
        const fileExt = file.name.split('.').pop();
        const videoFileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = `${userId}/${videoFileName}`; // Organize videos by user ID

        try {
            // 1. Upload the video file to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (uploadError) throw uploadError;

            // 2. Get the public URL for the video
            const { data: publicUrlData } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);

            const publicUrl = publicUrlData.publicUrl;
            
            // 3. Save the video metadata to the 'tutorials' database table
            const { error: dbError } = await supabase
                .from('tutorials')
                .insert([
                    {
                        user_id: userId,
                        title: title,
                        description: description,
                        video_url: publicUrl,
                        // Add other fields like duration, category_id, etc. here
                    }
                ]);

            if (dbError) throw dbError;

            // Success: Redirect the user back to their profile to see the new post
            alert("Video uploaded and posted successfully!");
            router.push('/profile');

        } catch (error) {
            console.error('Video upload failed:', error);
            setUploadError(`Upload failed: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };


    return (
        <div className="min-h-screen py-10 flex flex-col items-center bg-gray-50">
            <div className="max-w-3xl w-full p-8 bg-white shadow-xl rounded-xl">
                <h1 className="text-3xl font-extrabold text-center text-orange-600 mb-8">
                    Post a New Craft Tutorial
                </h1>

                <form onSubmit={handleUpload} className="space-y-6">
                    
                    {/* Video File Input */}
                    <div>
                        <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700 mb-2">
                            1. Select Video File
                        </label>
                        <input
                            id="videoFile"
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        />
                        {file && <p className="mt-2 text-sm text-gray-500">Selected file: {file.name}</p>}
                    </div>

                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            2. Tutorial Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="e.g., Easy DIY Macramé Wall Hanging"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            3. Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows="4"
                            placeholder="Describe what users will learn in this tutorial, supplies needed, and tips."
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        ></textarea>
                    </div>

                    {uploadError && (
                        <div className="text-red-600 text-sm p-3 bg-red-50 border border-red-200 rounded-lg">
                            {uploadError}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isUploading || !file}
                        className={`w-full py-3 rounded-lg text-white font-bold transition-colors 
                            ${isUploading || !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
                    >
                        {isUploading ? 'Processing Upload...' : 'Post Tutorial'}
                    </button>
                </form>
            </div>
        </div>
    );
}