import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div className="container flex items-center sm:px-10 px-2 justify-between mt-10 mb-4 border-t border-gray-500">
                {/* Logo */}
                <div className="mb-4">
                    <Link href="/">
                        <Image src="/Images/my-logo.png" width={90} height={90} alt="logo" />
                    </Link>
                </div>
                <p className="text-center 4xl:text-[18px] xl:text-[16px] text-[14px] font-medium pb-6 mt-3">© {new Date().getFullYear()} MySite. All rights reserved.</p>

            </div>
        </footer>
    );
}
