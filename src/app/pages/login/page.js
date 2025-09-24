"use client";
import { useState } from "react";
import Link from "next/link";
import Alert from "@/app/components/Alert";
import { useRouter, redirect } from "next/navigation";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
    const router = useRouter()
    // Validation function
    const validateField = (name, value) => {
        let error = "";
        if (name === "email") {
            if (!value) error = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(value)) error = "Enter a valid email";
        }
        if (name === "password") {
            if (!value) error = "Password is required";
            else if (value.length < 6) error = "Password must be at least 6 characters";
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        setErrors({ ...errors, [name]: validateField(name, value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const newErrors = {
            email: validateField("email", form.email),
            password: validateField("password", form.password),
        };

        setErrors(newErrors);

        if (newErrors.email || newErrors.password) return;

        setLoading(true);
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setLoading(false);

        if (data.success) {
            const { password, ...userWithoutPassword } = data.user;
            localStorage.setItem("user", JSON.stringify(userWithoutPassword));
            setAlert({ show: true, type: "success", msg: "Login Successful!" });
            setForm({ email: "", password: "" });
            setTimeout(() => {
                window.location.href = '/'; 
            }, 50); 

        } else {
            setErrors({ ...errors, password: data.message || "Invalid credentials" });
            setAlert({ show: true, type: "error", msg: data.message || "Login Failed!" });
        }
    };

    return (
        <>
            {alert.show && <Alert alertType={alert.type} msg={alert.msg} />}
            <div className="flex items-center justify-center min-h-screen container py-[90px] lg:py-[100px] sm:mx-10 mx-2">
                <div className="w-full max-w-md bg-white dark:bg-transparent p-8 rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.email
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-400 focus:ring-blue-500"
                                    }`}
                                required
                            />
                            {errors.email && (
                                <p className="text-red-500 4xl:text-[18px] xl:text-[16px] text-[14px] mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.password
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-400 focus:ring-blue-500"
                                    }`}
                                required
                            />
                            {errors.password && (
                                <p className="text-red-500 4xl:text-[18px] xl:text-[16px] text-[14px] mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="readMoreBtn cursor-pointer mt-10 w-50 mx-auto block"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* Signup Link */}
                    <p className="text-center 4xl:text-[18px] xl:text-[16px] text-[14px]
                     text-gray-600 mt-6">
                        Don’t have an account?{" "}
                        <Link href="./signup" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
