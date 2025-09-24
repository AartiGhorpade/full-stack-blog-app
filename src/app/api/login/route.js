
import User from "@/lib/model/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    const { email, password } = await req.json();


    const user = await User.findOne({ email });
    if (!user) {
        return Response.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return Response.json({ success: false, message: "Invalid credentials" });
    }

    return Response.json({ success: true, user });
}
