"use client";
import Alert from "@/app/components/Alert";
import useAuths from "@/app/hooks/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
    const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
    const router = useRouter()
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const { login } = useAuths()
    // Validation 
    const validateField = (name, value) => {
        let error = "";
        if (name === "name") {
            if (!value.trim()) error = "Name is required";
            else if (value.length < 3) error = "Name must be at least 3 characters";
        }
        if (name === "email") {
            if (!value) error = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(value)) error = "Enter a valid email";
        }
        if (name === "password") {
            if (!value) error = "Password is required";
            else if (value.length < 6) error = "Password must be at least 6 characters";
        }
        if (name === "confirmPassword") {
            if (!value) error = "Confirm password is required";
            else if (value !== form.password) error = "Passwords do not match";
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
            name: validateField("name", form.name),
            email: validateField("email", form.email),
            password: validateField("password", form.password),
            confirmPassword: validateField("confirmPassword", form.confirmPassword),
        };
        setErrors(newErrors);

        if (Object.values(newErrors).some((err) => err)) return;

        setLoading(true);
        const res = await fetch(`/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setLoading(false);

        if (data.success) {
            const { password, ...userWithoutPassword } = data.user;
            login(userWithoutPassword);
            setForm({ name: "", email: "", password: "", confirmPassword: "" });
            setErrors({ name: "", email: "", password: "", confirmPassword: "" });
            setAlert({ show: true, type: "success", msg: "Signup successful!", id: Date.now() });
            router.push("/");
        }
        else {
            setAlert({ show: true, type: "error", msg: data.message || "Signup failed!", id: Date.now() });
        }
    };

    return (
        <>
            {alert.show && <Alert key={alert.id} alertType={alert.type} msg={alert.msg} />}
            <div className="flex items-center justify-center min-h-screen container py-[120px] lg:py-[140px] sm:mx-10 mx-2">
                <div className="w-full max-w-md bg-white dark:bg-transparent p-8 rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.name
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-400 focus:ring-blue-500"
                                    }`}
                                required
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

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
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-enter your password"
                                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.confirmPassword
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-400 focus:ring-blue-500"
                                    }`}
                                required
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="readMoreBtn cursor-pointer mt-10 w-50 mx-auto block"
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>

                        <p className="text-center text-sm text-gray-600 mt-6">
                            Have an account?{" "}
                            <Link href="./login" className="text-blue-600 hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
