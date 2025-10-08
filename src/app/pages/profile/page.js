'use client'
import { useState } from "react";
import EditProfile from './edit-profile/page'
import SavedBlogs from './saved-blogs/page'
import LikedBlogs from './liked-blogs/page'
import UsersBlog from './users-blog/page'

export default function Page() {
    const [showPopup, setShowPopup] = useState(false);
    const [active, setActive] = useState("Edit Profile");

    const options = ["Edit Profile", "Saved", "Liked", "My Blogs", "Logout"];

    const removeUser = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userName");
        localStorage.setItem('userPresent', false)
        setShowPopup(false);
        window.location.href = '/';
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleOptionClick = (data) => {
        if (data === "Logout") {
            setShowPopup(true);
        } else {
            setActive(data);
        }
    };

    return (
        <section className="container py-[90px] lg:py-[100px]">
            <div className="sm:mx-14 mx-2 flex gap-6 mt-6 overflow-x-auto scrollbar-hide no-scrollbar dark:text-black max-lg:cursor-grab lg:cursor-pointer active:cursor-grabbing">
                {options.map((data, index) => (
                    <div
                        key={index}
                        onClick={() => handleOptionClick(data)}
                        className={`flex-shrink-0 px-8 py-2 rounded-full font-medium 
  4xl:text-[18px] xl:text-[16px] text-[14px] shadow-sm hover:shadow-md transition 
  border dark:border-white 
  ${active === data && data !== "Logout"
                                ? "bg-purple-100 text-purple-800"
                                : "dark:text-white"
                            }`}>
                        {data}
                    </div>
                ))}
            </div>


            <div className="mt-10">
                {active === "Edit Profile" && (
                    <EditProfile />
                )}
                {active === "Saved" && (
                    <SavedBlogs />
                )}
                {active === "Liked" && (
                    <LikedBlogs />
                )}
                {active === "My Blogs" && (
                    <UsersBlog />
                )}
            </div>


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
        </section>
    );
}
