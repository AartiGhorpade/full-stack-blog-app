'use client'
import Alert from "@/app/components/Alert";
import useAuths from "@/app/hooks/context/AuthContext";
import { useFormattedDate } from "@/app/hooks/useFormatedDate";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
    const { userData, loading } = useAuths()
    const [blogs, setBlogs] = useState([])
    const [showPopup, setShowPopup] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
    const [isFiltering, setIsFiltering] = useState(true);

    useEffect(() => {
        if (!userData) {
            setIsFiltering(false);
            return;
        }
        if (userData?._id) {
            fetch(`/api/blogs/singleUserBlogs/${userData._id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setBlogs(data.blogs)
                        setIsFiltering(false);
                    }
                });
        }
    }, [userData]);

    const deleteHandler = async (blogId) => {

        const res = await fetch(`/api/blogs/deleteBlog/${blogId}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (data.success) {
            setAlert({ show: true, type: "success", msg: "Blog deleted successfully", id: Date.now() })
            setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
        } else {
            setAlert({ show: true, type: "error", msg: data.error || "Failed to delete blog.", id: Date.now() });
        }
    };

    if (loading || isFiltering) {
        return (
            <div className="flex items-center justify-center h-screen inset-0">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        blogs?.length > 0 ?
            <div className="container">
                {alert.show && <Alert key={alert.id} alertType={alert.type} msg={alert.msg} />}

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
                                                <Trash className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => setShowPopup(true)} />
                                            </div>
                                        </div>
                                    </div>
                                    {showPopup && (
                                        <div className="fixed inset-0 bg-[#0f172a] bg-opacity-50 flex justify-center items-center z-50">
                                            <div className="bg-white rounded-2xl p-6 w-80 shadow-lg text-center">
                                                <h2 className="4xl:text-[18px] xl:text-[16px] text-[14px] font-semibold mb-4 dark:text-[#063C72]">
                                                    Are you sure you want to delete the blog?
                                                </h2>
                                                <div className="flex justify-around">
                                                    <button
                                                        onClick={() => deleteHandler(post._id)}
                                                        className="px-4 py-2 cursor-pointer 4xl:text-[18px] xl:text-[16px] text-[14px] bg-red-500 text-white rounded-lg hover:bg-red-600"
                                                    >
                                                        Yes, Delete
                                                    </button>
                                                    <button
                                                        onClick={() => setShowPopup(false)}
                                                        className="px-4 py-2 cursor-pointer 4xl:text-[18px] xl:text-[16px] text-[14px] bg-gray-300 rounded-lg hover:bg-gray-400"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            :
            <div className="container pt-4">
                <h2 className="4xl:text-[26px] 2xl:text-[24px] xl:text-[22px] md:text-[20px] text-[18px] font-semibold mt-2">You haven’t posted any blogs yet</h2>
            </div>
    );
}

