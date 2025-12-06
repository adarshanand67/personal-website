import Hero from "@/components/Hero";
import RecentBlogs from "@/components/RecentBlogs";
import RecentPapers from "@/components/RecentPapers";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="section container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <RecentBlogs />
          <RecentPapers />
        </div>
      </div>
    </main>
  );
}
