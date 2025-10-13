'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useBlogs } from "../hooks/useBlogs";
import Loader from "./Loader";

export default function Featured() {
    const [changeData, setChangeData] = useState(0)
    const { blogs, loading } = useBlogs();


    return (

        <div className="sm:mx-10 mx-2">
            {
                loading ? <Loader /> :
                    <div>
                        <p className="text-center text-[26px] md:text-[34px] xl:text-[44px] 2xl:text-[46px] 4xl:text-[48px] xl:mt-[38px] mt-[26px]">A place to share your journey, ideas, and discoveries with the world while <strong>inspiring</strong> and <strong>learning</strong> from others.</p>
                        <div className="xl:mt-[48px] mt-[38px] text-center">
                            <Link href="../pages/writeBlog">
                                <span className="text-[#063C72] border border-[#063C72] dark:text-white dark:border-white rounded-full font-semibold xl:px-[36px] xl:py-[10px] px-[26px] py-[10px] hover:bg-[#063C72] hover:broder-[#063C72] hover:text-white transition-colors duration-300 ease-in-out">
                                    Write Blog
                                </span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-20">
                            <div className="relative w-full h-[200px] md:h-auto">
                                {blogs?.[changeData]?.image && (
                                    <Image
                                        src={blogs[changeData].image}
                                        alt={blogs[changeData].title || "Blog image"}
                                        fill
                                        className="object-cover rounded-lg transition-all duration-500 ease-in-out"
                                    />
                                )}

                            </div>


                            <div className="space-y-10">
                                {
                                    blogs?.slice(0, 3).map((data, ind) => {
                                        return (
                                            <div className={`${ind == changeData && "border-l-2"} border-black dark:border-white pl-6 cursor-pointer`} key={ind} onMouseEnter={() => setChangeData(ind)}>
                                                <p className="4xl:text-[30px] 2xl:text-[28px] xl:text-[26px] md:text-[26px] text-[20px] font-semibold">{data.title}</p>
                                                <p className="4xl:text-[20px] 2xl:text-[18px] xl:text-[16px] md:text-[15px] text-[12px] line-clamp-2 mt-2">{data.content}</p>
                                                {
                                                    ind == changeData && <p className="mt-6"><Link href={`/pages/blogs/${data.slug}`} className=" readMoreBtn">Read More</Link></p>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}