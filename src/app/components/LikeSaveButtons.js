"use client";

import { useEffect, useState } from "react";
import { Bookmark, Heart } from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function LikeSaveButtons({ blogId, initialLikes = 0 }) {
    const { userData } = useAuth();
    const [isSaved, setIsSaved] = useState()
    const [totalLikes, setTotalLikes] = useState(initialLikes)
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        setIsSaved(
            userData?.savedBlogs?.includes(blogId) || false
        );

        setLiked(
            userData?.likedBlogs?.includes(blogId) || false
        )
    }, [userData])

    const handleSave = async () => {
        if (!userData) {
            window.location.href = "/login";
            return;
        }

        try {
            const res = await fetch(`/api/blogs/${blogId}/save`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userData._id, blogId }),
            });

            const data = await res.json();

            setIsSaved(data.saved);

            const updatedUser = {
                ...userData,
                savedBlogs: data.savedBlogs,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (err) {
            console.error("Error saving blog:", err);
        }
    };

    const handleLike = async () => {
        if (!userData) {
            window.location.href = "/login";
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
            setTotalLikes(data.blogLikes)
            const updatedUser = {
                ...userData,
                likedBlogs: data.likedBlogs,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (err) {
            console.error("Error saving blog:", err);
        }
    }

    return (
        <>
            {/* Like Button */}
            <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${liked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-700 border"
                    }`}
            >
                <Heart className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`} />
                <span>{totalLikes}</span>
            </button>
            <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${isSaved ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700 border"
                    }`}>
                <Bookmark className={`w-5 h-5 ${isSaved ? "fill-yellow-500" : ""}`} />
            </button>
        </>
    );
}
