"use client";
import { useEffect, useState } from "react";

export default function ThemeToggler() {
    const [dark, setDark] = useState(true);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [dark]);

    return (
        <button
            className=""
            onClick={() => setDark(!dark)}
        >
            {dark ? "🌙" : "☀️"}
        </button>
    );
}
