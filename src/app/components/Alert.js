"use client";
import { useEffect, useState } from "react";

export default function Alert({ alertType = "success", msg, duration = 2000 }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    const colors = {
        success: "bg-teal-100 border-teal-500 text-teal-900",
        error: "bg-red-100 border-red-500 text-red-900",
        warning: "bg-yellow-100 border-yellow-500 text-yellow-900",
    };

    return (
        <div
            className={`
                fixed top-20 left-1/2 transform -translate-x-1/2 z-50
                ${colors[alertType]}
                border-t-4 rounded shadow-md px-6 py-3
                animate-slideDown
                w-fit
            `}
            role="alert"
        >
            <p className="text-sm font-medium">{msg}</p>
        </div>
    );
}
