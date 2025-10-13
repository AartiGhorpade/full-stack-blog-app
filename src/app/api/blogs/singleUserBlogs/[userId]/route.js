import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/mongodb";
import Blog from "@/lib/model/blog";
import "@/lib/model/user";

export async function GET(req, { params }) {
    const { userId } = params;

    try {
        await mongoose.connect(connectionStr);

        const blogs = await Blog.find({ userId: userId })
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, blogs }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user's blogs:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
