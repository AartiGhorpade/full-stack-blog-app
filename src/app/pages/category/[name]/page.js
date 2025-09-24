'use client'
import { useBlogs } from "@/app/hooks/useBlogs";
import { useFormattedDate } from "@/app/hooks/useFormatedDate";


export default async function CategoryPage({ name }) {
    const { blogs, loading } = useBlogs();


    const filteredBlogs = blogs.filter((item) => item.category.toLowerCase() === name.toLowerCase());

    return (
        <section className="container pt-[120px] lg:pt-[130px] pb-[40px] md:pb-[80px]2">
            <div className="sm:mx-10 mx-2">
                <h2 className="4xl:text-[30px] 2xl:text-[28px] xl:text-[26px] md:text-[26px] text-[20px] font-bold mb-4">
                    All Blogs
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] mt-10">

                    {
                        filteredBlogs?.map((post, index) => {
                            const formattedDate = useFormattedDate(post.createdAt);
                            return (
                                <div
                                    key={index}
                                    className="border border-[#5C97D3] rounded-2xl h-full flex flex-col overflow-hidden shadow-lg transition">
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
                                            className="mt-4 inline-block font-medium">
                                            <p className="mt-6">
                                                Read More{" "}
                                                <span className="bg-[#063C72] text-white rounded-full font-bold py-1 ml-2 px-2">
                                                    →
                                                </span>
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {visibleCount < blogs.length && (
                    <div className="xl:mt-[48px] mt-[38px] text-center">
                        <button
                            onClick={showMoreBlogs}
                            className="readMoreBtn px-6 py-3 bg-[#063C72] text-white rounded-full font-medium hover:bg-[#052c56] transition">
                            View More
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
