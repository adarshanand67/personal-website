import Link from "next/link";

export default function Footer() {
  return (
    <div className="section footer mt-12 bg-background pt-8 pb-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-3 font-bold text-gray-500">
              Writings and Learnings
            </div>
            <p className="mb-1">
              <Link
                href="/experience"
                className="text-foreground hover:underline"
              >
                Experience
              </Link>
            </p>
            <p className="mb-1">
              <Link
                href="/papershelf"
                className="text-foreground hover:underline"
              >
                Papershelf
              </Link>
            </p>
            <p className="mb-1">
              <Link
                href="/bookshelf"
                className="text-foreground hover:underline"
              >
                Bookshelf
              </Link>
            </p>
            <p className="mb-1">
              <Link
                href="/animeshelf"
                className="text-foreground hover:underline"
              >
                Anime Shelf
              </Link>
            </p>
          </div>

          <div>
            <div className="mb-3 font-bold text-gray-500">
              Legal and Contact
            </div>
            <p className="mb-1">
              <Link href="/" className="text-foreground hover:underline">
                About me
              </Link>
            </p>
            <p className="mb-1">
              <a
                href="mailto:adarsh.anand.1@gmail.com"
                className="text-foreground hover:underline"
              >
                Contact Me
              </a>
            </p>
          </div>

          <div>
            <div className="mb-3 font-bold text-gray-500">Everything Else</div>
            <p className="mb-1">
              <a
                href="https://trellix.com"
                target="_blank"
                className="text-foreground hover:underline"
              >
                Trellix
              </a>
            </p>
            <p className="mb-1">
              <a
                href="https://intel.com"
                target="_blank"
                className="text-foreground hover:underline"
              >
                Ex-Intel
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© Adarsh Anand, 2025</p>
        </div>
      </div>
    </div>
  );
}
