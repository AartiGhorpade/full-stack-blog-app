import mongoose from "mongoose";
import { connectionStr } from "@/lib/mongodb";
import Blog from "@/lib/model/blog";
import User from "@/lib/model/user";

export async function POST(req) {
    try {
        const { userId, blogId } = await req.json();

        await mongoose.connect(connectionStr);

        const blog = await Blog.findById(blogId);
        const user = await User.findById(userId);

        if (!user || !blog) {
            return new Response(
                JSON.stringify({ error: "User or Blog not found" }),
                { status: 404 }
            );
        }

        const likedBlogIds = user.likedBlogs.map(id => id.toString());
        const isAlreadyLiked = likedBlogIds.includes(blog._id.toString());

        if (isAlreadyLiked) {
            user.likedBlogs = user.likedBlogs.filter(
                id => id.toString() !== blog._id.toString()
            );
            blog.likes = Math.max((blog.likes || 1) - 1, 0);

        } else {
            user.likedBlogs.push(blog._id);
            blog.likes = (blog.likes || 0) + 1;
        }

        await user.save();
        await blog.save();

        return new Response(
            JSON.stringify({ liked: !isAlreadyLiked, likedBlogs: user.likedBlogs, blogLikes: blog.likes }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in liking/unliking blog:", error);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
