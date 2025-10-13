"use client";

import Link from "next/link";

export default function CategoryList() {
    const categories = [
        { name: "Style", link: "/pages/category/style", color: "bg-blue-100 text-blue-800" },
        // { name: "Fashion", link: "/pages/category/fashion", color: "bg-pink-100 text-pink-800" },
        { name: "Food", link: "/pages/category/food", color: "bg-green-100 text-green-800" },
        { name: "Travel", link: "/pages/category/travel", color: "bg-red-100 text-red-800" },
        { name: "Lifestyle", link: "/pages/category/lifestyle", color: "bg-yellow-100 text-yellow-800" },
        // { name: "Coding", link: "/pages/category/coding", color: "bg-indigo-100 text-indigo-800" },
        { name: "Technology", link: "/pages/category/technology", color: "bg-purple-100 text-purple-800" },
    ];



    return (
        <div className="container w-full py-6">
            <h2 className="4xl:text-[30px] 2xl:text-[28px] xl:text-[26px] md:text-[26px] text-[20px] font-bold mb-4">
                Categories
            </h2>

            <div
                className="
          flex gap-6 mt-6 
          overflow-x-auto scrollbar-hide no-scrollbar dark:text-black 
          cursor-grab active:cursor-grabbing">
                {categories.map((cat, index) => (
                    <Link
                        key={index}
                        href={cat.link}
                        className={`flex-shrink-0 px-8 py-3 rounded-full font-medium 4xl:text-[18px] xl:text-[16px] text-[14px] shadow-sm hover:shadow-md transition ${cat.color}`}>
                        {cat.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
