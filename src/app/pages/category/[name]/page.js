'use client'
import { useBlogs } from "@/app/hooks/useBlogs";
import { useFormattedDate } from "@/app/hooks/useFormatedDate";
import Link from "next/link";
import React, { useMemo } from "react";

export default function CategoryPage({ params }) {
    const { name } = React.use(params);
    const { blogs, loading } = useBlogs();

    const filteredBlogs = useMemo(() => {
        if (!blogs?.length || !name) return [];
        return blogs.filter((item) =>
            item?.category?.toLowerCase() === name.toLowerCase()
        );
    }, [blogs, name]);


    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen inset-0">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
    };

    return (
        <section className="container pt-[120px] lg:pt-[130px] pb-[40px] md:pb-[80px]">
            <div className="sm:mx-10 mx-2">
                <h2 className="4xl:text-[30px] 2xl:text-[28px] xl:text-[26px] md:text-[26px] text-[20px] font-bold mb-4">
                    Category : {name}
                </h2>

                {
                    filteredBlogs.length > 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] mt-10">
                            {filteredBlogs.map((post, index) => {
                                const formattedDate = useFormattedDate(post.createdAt);
                                return (
                                    <div
                                        key={index}
                                        className="border border-[#5C97D3] rounded-2xl h-full flex flex-col overflow-hidden shadow-lg transition"
                                    >
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="h-50 w-full object-cover"
                                        />
                                        <div className="p-6 flex flex-col justify-between flex-grow">
                                            <div>
                                                <p className="text-sm">
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
                                            <Link
                                                href={`/pages/blogs/${post.slug}`}
                                                className="mt-4 inline-block font-medium"
                                            >
                                                <p className="mt-6">
                                                    Read More{" "}
                                                    <span className="bg-[#063C72] text-white rounded-full font-bold py-1 ml-2 px-2">
                                                        →
                                                    </span>
                                                </p>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div> : <div className="pt-4">
                            <h2 className="4xl:text-[26px] 2xl:text-[24px] xl:text-[22px] md:text-[20px] text-[18px] font-semibold mt-2">Don't have blogs of this category yet.</h2>
                        </div>
                }
            </div>
        </section>
    );
}
