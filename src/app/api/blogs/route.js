import { NextResponse } from "next/server";
import { connectionStr } from "@/lib/mongodb";
import mongoose from "mongoose";
import Blog from "@/lib/model/blog";
import { v2 as cloudinary } from "cloudinary";
import User from "@/lib/model/user";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        await mongoose.connect(connectionStr);
        const formData = await req.formData();

        const file = formData.get("image");
        let imageUrl = null;

        const slug = formData.get("title")
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");


        if (file && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());

            imageUrl = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "Blog" },
                    (err, result) => {
                        if (err) reject(err);
                        else resolve(result.secure_url);
                    }
                );
                stream.end(buffer);
            });
        }

        const blogData = new Blog({
            title: formData.get("title"),
            slug,
            category: formData.get("category"),
            content: formData.get("content"),
            userId: formData.get('userId'),
            image: imageUrl,
        });

        const saved = await blogData.save();

        return NextResponse.json({ success: true, blogData: saved }, { status: 201 });

    } catch (err) {
        console.error("Error saving blog:", err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}



export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        const BlogData = await Blog.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, BlogData }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}