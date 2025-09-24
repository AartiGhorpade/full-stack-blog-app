"use client";

import Link from "next/link";
import { useBlogs } from "../hooks/useBlogs";

export default function MostPopularBlogs() {
  const { blogs} = useBlogs();
  return (
    <section>
      <div className="container mx-auto text-center pt-10 lg:pt-22">
        <h2 className="4xl:text-[30px] 2xl:text-[28px] xl:text-[26px] md:text-[26px] text-[20px] font-bold mb-4">Popular Blogs</h2>
        <p className="4xl:text-[18px] xl:text-[16px] text-[14px] mb-12">
          Stay updated with the latest articles and insights in web development, design, and tech.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs?.slice(2).map((blog, index) => (
            <div
              key={index}
              className="lg:p-10 p-6 border border-[#5C97D3] rounded-xl shadow-sm hover:shadow-md transition text-left">
              <h3 className="4xl:text-[26px] 2xl:text-[24px] xl:text-[22px] md:text-[20px] text-[18px] font-semibold mb-2">{blog.title}</h3>
              <p className="4xl:text-[18px] xl:text-[16px] text-[14px] mb-2 font-normal">By {blog.author}</p>
              <p className="4xl:text-[18px] xl:text-[16px] text-[14px] line-clamp-2">{blog.content}</p>
              <Link
                href=""
                className="mt-4 inline-block text-indigo-600 font-medium hover:underline">
                <p className="mt-6">Read More <span className="bg-[#063C72] text-white rounded-full font-bold py-1 ml-2 px-2">→</span></p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
