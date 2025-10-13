import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/mongodb";
import Blog from "@/lib/model/blog";

export async function DELETE(req, { params }) {
    const { blogId } = params;

    try {
        await mongoose.connect(connectionStr);

        const deletedBlog = await Blog.findByIdAndDelete(blogId);   

        if (!deletedBlog) {
            return NextResponse.json(
                { success: false, message: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Blog deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
