import User from "@/lib/model/user";
import bcrypt from "bcryptjs";
import { connectionStr } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        await mongoose.connect(connectionStr);
        const { name, email, password } = await req.json();
        const user = await User.findOne({ email });
        if (user) {
            return Response.json({ success: false, message: "An account with this email already exists. Please log in instead." });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
            });
            return Response.json({ success: true, user: newUser }, { status: 201 });
        }

    } catch (error) {
        console.error(error);
        return Response.json({ success: false, message: "Signup failed" }, { status: 500 });
    }
}
