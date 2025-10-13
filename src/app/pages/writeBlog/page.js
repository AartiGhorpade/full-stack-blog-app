"use client";
import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuths from "@/app/hooks/context/AuthContext";
import Alert from "@/app/components/Alert";


export default function WriteBlog() {
    const { userData, loading } = useAuths()
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
    const [alert, setAlert] = useState({ show: false, type: "", msg: "" });


    useEffect(() => {
        if (!userData && !loading) {
            router.push("/pages/login");
        }
    }, [userData, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen inset-0">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
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
        if (form.image) {
            formData.append("image", form.image);
        } else {
            const response = await fetch("https://res.cloudinary.com/db5dfbvlm/image/upload/v1760360935/dummy-blog-img_crvpza.jpg");
            const blob = await response.blob();
            formData.append("image", blob, "dummy-blog-img.jpg");
        }

        const res = await fetch("/api/blogs", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setPosting(false);

        if (data.success) {
            setForm({ title: "", content: "", category: "", image: null });
            setAlert({ show: true, type: "success", msg: data.message || "Blog Posted!", id: Date.now() });
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } else {
            setAlert({ show: true, type: "error", msg: data.message || "Blog Posting Failed!", id: Date.now() });

        }
    };

    return (
        <>
            <div className="container pt-[120px] lg:pt-[130px] pb-[40px] md:pb-[80px] sm:px-10 px-2">
                {alert.show && <Alert key={alert.id} alertType={alert.type} msg={alert.msg} />}
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
                            className="flex-shrink-0 cursor-pointer w-7 h-7 border border-gray-400 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
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
                                className="rounded-xl border border-gray-300 shadow-sm max-h-96 object-cover mt-10"
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
