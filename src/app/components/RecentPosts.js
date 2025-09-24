"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useBlogs } from "../hooks/useBlogs";
import { useFormattedDate } from "../hooks/useFormatedDate";

export default function RecentPosts() {
    const { blogs } = useBlogs();


    return (
        <div className="container pt-8 lg:pt-14">
            <p className="4xl:text-[30px] 2xl:text-[28px] xl:text-[26px] md:text-[26px] text-[20px] font-bold">
                Recent Posts
            </p>
            <div className="w-full relative mt-8">
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: "#slider-button-right",
                        prevEl: "#slider-button-left",
                    }}
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 },
                        1280: { slidesPerView: 3 },
                    }}
                    className="multiple-slide-carousel relative cursor-grab">
                    {blogs?.slice(0, 6).map((post, index) => {
                        const formattedDate = useFormattedDate(post.createdAt);
                        return (
                            <SwiperSlide key={index}>
                                <div className="border border-[#5C97D3] rounded-2xl h-[550px] md:h-[620px] lg:h-[580px] xl:h-[600px] p-0 flex flex-col overflow-hidden shadow-lg transition">
                                    {/* Image */}
                                    <img src={post.image}
                                        alt={post.title}
                                        className="h-80 w-full object-cover"
                                    />
                                    {/* Text */}
                                    <div className="p-6 flex flex-col justify-between flex-grow">
                                        <div>
                                            <p className="text-sm">
                                                {formattedDate} <span className="text-[#5C97D3] font-medium ml-2">{post.category}</span>
                                            </p>
                                            <h2 className="4xl:text-[26px] 2xl:text-[24px] xl:text-[22px] md:text-[20px] text-[18px] font-semibold mt-2">
                                                {post.title}
                                            </h2>
                                            <p className="4xl:text-[18px] xl:text-[16px] text-[14px] mt-2 line-clamp-2">{post.content}</p>
                                        </div>
                                        <Link
                                            href={`/pages/blogs/${post.slug}`}
                                            className="mt-4 inline-block font-medium">
                                            <p className="mt-6">Read More <span className="bg-[#063C72] text-white rounded-full font-bold py-1 ml-2 px-2">→</span></p>

                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>

                {/* Navigation Buttons */}
                <div className="absolute top-[-50px] flex m-auto right-14 w-fit z-10">
                    <button
                        id="slider-button-left"
                        className="swiper-button-prev group !p-2 flex justify-center items-center transition-all duration-500 rounded-full hover:bg-indigo-600 !-translate-x-10"
                    >
                        <svg
                            className="text-indigo-600 group-hover:text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <button
                        id="slider-button-right"
                        className="swiper-button-next group !p-2 flex justify-center items-center transition-all duration-500 rounded-full hover:bg-indigo-600 !translate-x-16"
                    >
                        <svg
                            className="text-indigo-600 group-hover:text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M5.99984 4.00012L10 8.00029L5.99748 12.0028"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
