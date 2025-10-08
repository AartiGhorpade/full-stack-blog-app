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
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: null,
        },
        likes: { type: Number, default: 0 },
        saves: { type: Number, default: 0 },
    },
    { timestamps: true, versionKey: false, collection: "allBlogs" }
);

const Blog =
    mongoose.models.AllBlog || mongoose.model("AllBlog", BlogSchema, "allBlogs");

export default Blog;
