"use client";

import { useEffect, useState } from "react";
import { Bookmark, Heart } from "lucide-react";
import useAuths from "../hooks/context/AuthContext";
import { useRouter } from "next/navigation";
export default function LikeSaveButtons({ blogId, initialLikes = 0 }) {
    const { userData } = useAuths();
    const [isSaved, setIsSaved] = useState()
    const [totalLikes, setTotalLikes] = useState(initialLikes)
    const [liked, setLiked] = useState(false)
    const router = useRouter()
    useEffect(() => {
        setIsSaved(
            userData?.savedBlogs?.includes(blogId) || false
        );

        setLiked(
            userData?.likedBlogs?.includes(blogId) || false
        )
    }, [userData])

    // handleSave
    const handleSave = async (e) => {
        e.stopPropagation();
        if (!userData) {
            router.push('/pages/login')
            return;
        }

        try {
            const res = await fetch(`/api/blogs/${blogId}/save`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userData._id, blogId }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Save failed");

            // ✅ Update React state
            setIsSaved(data.saved);

            // ✅ Sync with localStorage
            const stored = JSON.parse(localStorage.getItem("user")) || userData || {};

            const updatedUser = {
                ...stored,
                savedBlogs: data.savedBlogs,
                likedBlogs: stored.likedBlogs || userData?.likedBlogs || [],
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));

            // ✅ If using context, update it too
            if (typeof login === "function") login(updatedUser);

        } catch (err) {
            console.error("Error saving blog:", err);
        }
    };

    // handleLike
    const handleLike = async (e) => {
        e.stopPropagation();
        if (!userData) {
            router.push('/pages/login')
            return;
        }

        try {
            const res = await fetch(`/api/blogs/${blogId}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userData._id, blogId }),
            });

            const data = await res.json();

            setLiked(data.liked);
            setTotalLikes(data.blogLikes);

            const updatedUserData = {
                ...userData,
                likedBlogs: data.likedBlogs,
            };
            localStorage.setItem("user", JSON.stringify(updatedUserData));

        } catch (err) {
            console.error("Error liking blog:", err);
        }
    };


    return (
        <>
            {/* Like Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleLike(e);
                }}
                className={`flex items-center gap-2 px-4 py-1 rounded-lg transition 
        ${liked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"} `}>
                <Heart className={`w-5 h-5 transition 
            ${liked ? "fill-red-500" : "fill-none stroke-current"}`}
                />
                <span>{totalLikes}</span>
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleSave(e);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-transform duration-150 active:scale-95 
        ${isSaved ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"}`}>
                <Bookmark className={`w-5 h-5 transition-all 
            ${isSaved ? "fill-blue-500" : "fill-none stroke-current"}`} />
            </button>

        </>
    );
}
