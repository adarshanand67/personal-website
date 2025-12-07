import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    The page you're looking for doesn't exist.
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
