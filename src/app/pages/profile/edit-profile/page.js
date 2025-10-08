'use client'
import { useEffect, useState } from "react";
import Alert from "@/app/components/Alert";
import useAuth from "@/app/hooks/useAuth";

export default function EditProfile() {
    const { userData } = useAuth()
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "*******",
    });


    useEffect(() => {
        try {
            if (typeof userData === "string") {
                setUser(JSON.parse(userData));
            } else if (typeof userData === "object" && userData !== null) {
                setUser(userData);
            }
        } catch (err) {
            console.error("Error parsing userData:", err);
            setUser({});
        }
    }, [userData]);

    // Populate form fields when user loads
    useEffect(() => {
        if (user) {
            setForm((prev) => ({
                ...prev,
                name: user.name || "",
                email: user.email || "",
            }));
        }
    }, [user]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/updateProfile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user._id,
                    email: form.email,
                    name: form.name,
                    password: form.password,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setAlert({ show: true, type: "success", msg: "Profile updated successfully!", id: Date.now() })
            } else {
                setAlert({ show: true, type: "error", msg: data.message || "profile updating failed!", id: Date.now() });
            }
        } catch (err) {
            console.error("Update failed:", err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {alert.show && <Alert key={alert.id} alertType={alert.type} msg={alert.msg} />}
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-md rounded-2xl shadow-lg p-10 border border-gray-600">
                    <h2 className="text-2xl font-semibold text-center mb-6">Edit Profile</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-3">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Email (read-only) */}
                        <div>
                            <label className="block text-sm font-medium mb-3">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                readOnly
                                className="w-full px-3 py-2 border rounded-lg text-gray-600 cursor-not-allowed"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-3">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter new password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="readMoreBtn w-full mt-3 cursor-pointer"
                        >
                            {loading ? "Updating..." : "Update"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
