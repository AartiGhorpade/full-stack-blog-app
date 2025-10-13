"use client";
import { useEffect, useState } from "react";

export default function ThemeToggler() {
    const [dark, setDark] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setDark(savedTheme === "dark");
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    }, []);


    if (!mounted) return null;

    const toggleTheme = () => {
        const newDark = !dark;
        setDark(newDark);
        document.documentElement.classList.toggle("dark", newDark);
        localStorage.setItem("theme", newDark ? "dark" : "light");
    };

    return (
        <button
            className="text-2xl"
            onClick={toggleTheme}
            aria-label="Toggle Theme">
            {dark ? "🌙" : "☀️"}
        </button>
    );
}
