"use client";
import { useState } from "react";
import Link from "next/link";
import AuthLinks from "./AuthLinks";
import ThemeToggler from "./ThemeToggler";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const user = localStorage.getItem('user');
  let formattedName;

  if (user) {
    const parsedUser = JSON.parse(user);
    const name = parsedUser.name;
    formattedName = name.charAt(0).toUpperCase();
  }


  return (
    <header className="w-full py-4 fixed z-50 bg-white dark:bg-[#0f172a] my-auto">
      <div className="container mx-auto">
        <div className="flex items-center justify-between border border-gray-300 rounded-full px-6 lg:px-10 py-2 shadow-lg">

          {/* Logo */}
          <Link
            href="/"
            className="">
            <Image src="/Images/my-logo.png" width={90} height={90} alt="logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-6 text-[18px] font-medium">
              <Link href="/" className="hover:text-primary my-auto">Home</Link>
              <Link href="/pages/blogs" className="hover:text-primary my-auto">All Blogs</Link>
              <span className="my-auto"><AuthLinks /></span>
              <Link href="/pages/profile" className="hover:text-primary bg-white px-4 py-[3px] rounded-full border border-black"><span className="text-black dark:text-black font-bold">{user ? formattedName : "Profile"}</span></Link>
            </nav>

            <ThemeToggler />
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggler />
            <button
              className="text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2">
            <nav className="flex flex-col gap-4 py-5 px-4 sm:px-6 text-base font-medium border border-gray-200 rounded-lg">
              <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/pages/blogs" className="hover:text-primary">All Blogs</Link>
              <span onClick={() => setIsOpen(false)}><AuthLinks /></span>
              <Link href="/pages/profile" className="hover:text-primary bg-white px-4 py-[3px] rounded-full border border-black"><span className="text-black dark:text-black font-bold">{user ? formattedName : "Profile"}</span></Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
