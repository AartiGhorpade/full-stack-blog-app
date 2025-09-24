import User from "@/lib/model/user";
import bcrypt from "bcryptjs";
import { connectionStr } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        await mongoose.connect(connectionStr);
        const { name, email, password } = await req.json();

         const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        return Response.json({ success: true, user: newUser });
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, message: "Signup failed" }, { status: 500 });
    }
}
