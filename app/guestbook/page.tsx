import { Guestbook } from "@/components/content";

export const metadata = {
  title: "Guestbook | Adarsh Anand",
  description: "Sign my terminal-based guestbook.",
};

export default function GuestbookPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 font-mono">
            <span className="text-gray-500 mr-2">$</span>
            ./guestbook.sh
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-mono">
            Leave a mark in the digital log. Messages are stored locally in your
            browser cache.
          </p>
        </header>
        <Guestbook />
      </div>
    </div>
  );
}
