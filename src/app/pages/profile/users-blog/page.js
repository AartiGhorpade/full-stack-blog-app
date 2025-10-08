'use client'
import useAuth from "@/app/hooks/useAuth";
import { useFormattedDate } from "@/app/hooks/useFormatedDate";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
    const { userData } = useAuth()
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        if (userData?._id) {
            fetch(`/api/blogs/singleUserBlogs/${userData._id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) setBlogs(data.blogs)
                });
        }
    }, [userData]);

    const deleteHandler = async (blogId) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;

        const res = await fetch(`/api/blogs/deleteBlog/${blogId}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (data.success) {
            alert("Blog deleted successfully!");
            setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
        } else {
            alert("Failed to delete blog: " + data.error);
        }
    };


    return (
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] mt-20">
                {
                    blogs?.map((post, ind) => {
                        const formattedDate = useFormattedDate(post.createdAt);
                        return (
                            <div
                                key={ind}
                                className="border border-[#5C97D3] rounded-2xl h-full flex flex-col overflow-hidden shadow-lg transition">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-50 w-full object-cover"
                                />
                                <div className="p-6 flex flex-col justify-between flex-grow">
                                    <div>
                                        <p className="4xl:text-[18px] xl:text-[16px] text-[14px]">
                                            {formattedDate}{" "}
                                            <span className="text-[#5C97D3] font-medium ml-2">
                                                {post.category}
                                            </span>
                                        </p>
                                        <h2 className="4xl:text-[26px] 2xl:text-[24px] xl:text-[22px] md:text-[20px] text-[18px] font-semibold mt-2">
                                            {post.title}
                                        </h2>
                                        <p className="4xl:text-[18px] xl:text-[16px] text-[14px] mt-2 line-clamp-3">
                                            {post.content}
                                        </p>
                                    </div>
                                    <div className="flex justify-between mt-10">
                                        <div>
                                            <Link
                                                href={`/pages/blogs/${post.slug}`}
                                                className="inline-block font-medium">
                                                <p>
                                                    Read More{" "}
                                                    <span className="bg-[#063C72] text-white rounded-full font-bold py-1 ml-2 px-2">
                                                        →
                                                    </span>
                                                </p>
                                            </Link>
                                        </div>
                                        <div>
                                            <Trash className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => deleteHandler(post._id)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}