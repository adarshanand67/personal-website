import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">
          You&apos;ve ventured into the void
        </h2>
        <p className="mb-8 text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist in this universe.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
