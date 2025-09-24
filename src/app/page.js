import Image from "next/image";
import Featured from "./components/Featured";
import MostPopularBlogs from "./components/MostPopularBlogs";
import RecentPosts from "./components/RecentPosts";
import CategoryList from "./components/CategoryList";

export default function Home() {
  return (
    <section className="container py-[90px] lg:py-[100px] sm:mx-10 mx-2">
      <Featured />
      <CategoryList />
      <RecentPosts />
      {/* <MostPopularBlogs /> */}
      <div className="mt-10"></div>
    </section>
  );
}
