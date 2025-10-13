'use client'
import useAuths from "@/app/hooks/context/AuthContext";
import { useBlogs } from "@/app/hooks/useBlogs";
import { useFormattedDate } from "@/app/hooks/useFormatedDate";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
    const { blogs, loading } = useBlogs();
    const { userData } = useAuths()
    const [saved, setSaved] = useState([])
    const [isFiltering, setIsFiltering] = useState(true);

    useEffect(() => {
        if (!userData || !blogs?.length) return;
        if (!userData || !blogs?.length) {
            setIsFiltering(false);
            return;
        }
        const savedIds = userData.savedBlogs || [];
        const filtered = blogs.filter((blog) => savedIds.includes(blog._id));

        setSaved(filtered);
        setIsFiltering(false);
    }, [userData, blogs]);


    if (loading || isFiltering) {
        return (
            <div className="flex items-center justify-center h-screen inset-0">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        saved?.length > 0 ?
            <div className="container" >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] mt-20">
                    {
                        saved?.map((post, ind) => {
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
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            :
            <div className="container pt-4">
                <h2 className="4xl:text-[26px] 2xl:text-[24px] xl:text-[22px] md:text-[20px] text-[18px] font-semibold mt-2">No Saved Blogs</h2>
            </div>
    )
}