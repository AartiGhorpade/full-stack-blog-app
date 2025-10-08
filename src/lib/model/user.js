import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        likedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
        savedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
