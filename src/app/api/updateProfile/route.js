import User from "@/lib/model/user";
import { connectionStr } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await mongoose.connect(connectionStr)
        const { userId, name, password } = await req.json();

        const updateData = {};
        if (name) updateData.name = name;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true }
        ).select("-password");

        return NextResponse.json(
            { success: true, user: updatedUser },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
