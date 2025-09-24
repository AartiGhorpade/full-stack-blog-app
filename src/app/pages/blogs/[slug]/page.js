import mongoose from "mongoose";
import { connectionStr } from "@/lib/mongodb";
import Blog from "@/lib/model/blog";
import RecentPosts from "@/app/components/RecentPosts";

export default async function BlogPage({ params }) {
    const { slug } = params;

    await mongoose.connect(connectionStr);
    const blog = await Blog.findOne({ slug });

    if (!blog) {
        return <div className="p-10 text-center">Blog not found</div>;
    }
    const changeCategoryBg = (category) => {
        switch (category) {
            case "Style":
                return "bg-blue-100 text-blue-800";
            case "Fashion":
                return "bg-pink-100 text-pink-800";
            case "Food":
                return "bg-green-100 text-green-800";
            case "Travel":
                return "bg-red-100 text-red-800";
            case "Lifestyle":
                return "bg-yellow-100 text-yellow-800";
            case "Coding":
                return "bg-indigo-100 text-indigo-800"; 
            case "Technology":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };


    return (
        <div className="container mx-auto py-[100px] lg:py-[120px]">
            <div className="sm:mx-10 mx-2">
                <h1 className="4xl:text-[30px] 2xl:text-[28px] xl:text-[26px] md:text-[26px] text-[20px] font-bold mb-8 md:mb-4 lg:mt-10">
                    {blog.title}
                </h1>

                <div className="flex justify-between">
                    <p className={`px-3 py-1 rounded-full 4xl:text-[20px] 2xl:text-[18px] xl:text-[16px] md:text-[15px] text-[12px] font-bold ${changeCategoryBg(blog.category)}`}>
                        {blog.category}
                    </p>


                </div>

                {blog.image && (
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="md:w-[800px] md:h-[600px] h-[300px] w-full object-cover rounded-lg mt-8 mb-6"
                    />
                )}

                <p className="4xl:text-[20px] 2xl:text-[18px] xl:text-[16px] md:text-[15px] text-[12px] font-medium max-w-[90%] mt-10">
                    {blog.content}
                </p>
            </div>

            <div className="mt-5">
                <RecentPosts />
            </div>
        </div>
    );
}
