import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: null,
        },
    },
    { timestamps: true, versionKey: false, collection: "allBlogs" }
);

const Blog =
    mongoose.models.AllBlog || mongoose.model("AllBlog", BlogSchema, "allBlogs");

export default Blog;
