import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export const metadata = {
  title: "DevBlog",
  description: "A blog website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-black dark:bg-[#0f172a] dark:text-[#ffffff]">

        <div className="flex min-h-screen flex-col">
          {/* Navbar full width */}
          <div> <Navbar /></div>

          {/* Main content inside container */}
          <main className="flex-1">
            <div>{children}</div>
          </main>

          {/* Footer full width */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
