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

        if (!blog || !user) {
            return new Response(JSON.stringify({ error: "User or blog not found" }), { status: 404 });
        }

        // Check if already saved
        const savedBlogIds = user.savedBlogs.map(id => id.toString());
        const isAlreadySaved = savedBlogIds.includes(blog._id.toString());

        if (isAlreadySaved) {
            // Unsave
            user.savedBlogs = user.savedBlogs.filter(id => id.toString() !== blog._id.toString());
        } else {
            // Save
            user.savedBlogs.push(blog._id);
        }

        await user.save();

        return new Response(
            JSON.stringify({
                saved: !isAlreadySaved,
                savedBlogs: user.savedBlogs,
            }),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error in saving/unsaving blog:", error);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
