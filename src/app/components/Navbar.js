"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import Image from "next/image";
import useAuths from "../hooks/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useAuths();

  const userName = userData?.name?.charAt(0).toUpperCase();


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
              <Link href="/pages/writeBlog" className="hover:text-primary my-auto">Write</Link>
              <Link href="/pages/blogs" className="hover:text-primary my-auto">All Blogs</Link>
              {!userData &&
                <Link href="/pages/login">Login</Link>
              }
              {userData &&
                <Link href="/pages/profile" className="hover:text-primary bg-white px-4 py-[3px] rounded-full border border-black"><span className="text-black dark:text-black font-bold">{userName}</span></Link>
              }
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
          <div className="md:hidden mt-2 px-4">
            <nav className="flex flex-col gap-4 py-5 px-4 sm:px-6 text-base font-medium border border-gray-200 rounded-lg">
              <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/pages/writeBlog" onClick={() => setIsOpen(false)}>Write</Link>
              <Link href="/pages/blogs">All Blogs</Link>
              {!userData &&
                <Link href="/pages/login">Login</Link>
              }
              {userData &&
                <Link href="/pages/profile" className="hover:text-primary bg-white px-4 py-[3px] rounded-full border border-black w-fit"><span className="text-black dark:text-black font-bold">{userName}</span></Link>
              }
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
