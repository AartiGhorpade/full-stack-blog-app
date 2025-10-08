"use client";
import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";

export default function WriteBlog() {
    const { userData, loading } = useAuth()
    const fileInputRef = useRef(null);
    const router = useRouter()
    const [form, setForm] = useState({
        title: "",
        category: "",
        content: "",
        image: null,
    });
    const [preview, setPreview] = useState(null);
    const [posting, setPosting] = useState(false);
    useEffect(() => {
        if (!loading && !userData) {
            router.push("/pages/login");
        }
    }, [loading, userData, router]);

    if (loading) {
        return <p>Checking authentication...</p>;
    }

    if (!userData) {
        return <p>Redirecting to login...</p>;
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, image: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPosting(true);

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("content", form.content);
        formData.append("category", form.category);
        formData.append("userId", userData?._id)
        if (form.image) formData.append("image", form.image);

        const res = await fetch("/api/blogs", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setPosting(false);

        if (data.success) {

            setForm({ title: "", content: "", category: "", image: null });
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } else {

        }
    };

    return (
        <>
            <div className="container pt-[120px] lg:pt-[130px] pb-[40px] md:pb-[80px] sm:px-10 px-2">
                <form onSubmit={handleSubmit} className="max-w-3xl">
                    {/* Title */}
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full text-4xl md:text-5xl font-serif font-light placeholder-gray-400 focus:outline-none mb-6"
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="w-full text-xl md:text-2xl font-serif font-light placeholder-gray-400 focus:outline-none mb-6"
                        required
                    />
                    {/* Content */}
                    <div className="flex items-start gap-3">
                        {/* Plus Button */}
                        <button
                            type="button"
                            onClick={handleImageClick}
                            className="flex-shrink-0 w-7 h-7 border border-gray-400 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                            <Plus size={16} />
                        </button>

                        {/* Hidden File Input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        {/* Textarea */}
                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            placeholder="Tell your story..."
                            className="w-full text-lg placeholder-gray-400 focus:outline-none resize-none"
                            rows={10}
                            required
                        />
                    </div>

                    {/* Image Preview */}
                    {preview && (
                        <div>
                            <img
                                src={preview}
                                alt="Preview"
                                className="rounded-xl border border-gray-300 shadow-sm max-h-96 object-cover"
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <button type="submit" disabled={posting} className="readMoreBtn cursor-pointer mt-10 w-50 block" > {posting ? "Posting..." : "Post Blog"} </button>
                </form>
            </div>
        </>
    );
}
