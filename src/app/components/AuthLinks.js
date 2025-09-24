'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function AuthLinks() {
    const user = localStorage.getItem("user");
    const [auth, setAuth] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();

    useEffect(() => {
        user ? setAuth(true) : setAuth(false)
    }, [])

    const removeUser = () => {
        localStorage.removeItem("user");
        setAuth(false);
        setShowPopup(false);
        router.push("/");
    };

    return (
        <>
            {auth ? (
                <div className="flex md:flex-row flex-col">
                    <button
                        onClick={() => setShowPopup(true)}
                        className="max-md:mt-2 text-left cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <Link href="/pages/login">Login</Link>
            )}

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 bg-[#0f172a] bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-80 shadow-lg text-center">
                        <h2 className="4xl:text-[18px] xl:text-[16px] text-[14px] font-semibold mb-4 dark:text-[#063C72]">
                            Are you sure you want to logout?
                        </h2>
                        <div className="flex justify-around">
                            <button
                                onClick={removeUser}
                                className="px-4 py-2 4xl:text-[18px] xl:text-[16px] text-[14px] bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Yes, Logout
                            </button>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 4xl:text-[18px] xl:text-[16px] text-[14px] bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
