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

        const savedBlogIds = user.savedBlogs.map(id => id.toString());
        const isAlreadySaved = savedBlogIds.includes(blog._id.toString());

        if (isAlreadySaved) {
            user.savedBlogs = user.savedBlogs.filter(
                id => id.toString() !== blog._id.toString()
            );
            blog.saves = Math.max((blog.saves || 1) - 1, 0);

        } else {
            user.savedBlogs.push(blog._id);
            blog.saves = (blog.saves || 0) + 1;
        }

        await user.save();
        await blog.save();

        return new Response(
            JSON.stringify({ saved: !isAlreadySaved, savedBlogs: user.savedBlogs, blogSaves: blog.saves }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in saving/unsaving blog:", error);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
