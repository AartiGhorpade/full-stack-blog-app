import mongoose from "mongoose";
import { connectionStr } from "@/lib/mongodb";
import Blog from "@/lib/model/blog";
import RecentPosts from "@/app/components/RecentPosts";
import LikeSaveButtons from "@/app/components/LikeSaveButtons";

export default async function BlogPage({ params }) {
    const { slug } = await params;

    await mongoose.connect(connectionStr);
    const blog = await Blog.findOne({ slug });

    if (!blog) {
        return <div className="p-10 text-center">Blog not found</div>;
    }

    return (
        <div className="container mx-auto py-[100px] lg:py-[120px]">
            <div className="sm:mx-10 mx-2">
                <h1 className="text-[26px] font-bold mb-4 mt-10">
                    {blog.title}
                </h1>

                <div className="flex gap-4">
                    <div>
                        <p className={`px-3 py-1 rounded-full text-sm font-bold bg-gray-100 text-gray-700`}>
                            {blog.category}
                        </p>
                    </div>
                    <LikeSaveButtons blogId={blog._id.toString()} initialLikes={blog.likes}/>
                </div>

                {blog.image && (
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="md:w-[800px] md:h-[600px] h-[300px] w-full object-cover rounded-lg mt-8 mb-6"
                    />
                )}

                <p className="text-base max-w-[90%] mt-10">
                    {blog.content}
                </p>
            </div>

            <div className="mt-5">
                <RecentPosts />
            </div>
        </div>
    );
}
