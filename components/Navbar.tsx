"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="section container mx-auto px-4">
      <nav
        className="navbar is-fixed-top flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-background py-2"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand flex items-center justify-between w-full md:w-auto">
          <div className="navbar-item">
            <Link
              href="/"
              className="text-2xl font-bold text-foreground font-serif"
            >
              Adarsh Anand
            </Link>
          </div>

          <button
            className={`navbar-burger burger block md:hidden ${
              isActive ? "is-active" : ""
            }`}
            aria-label="menu"
            aria-expanded="false"
            data-target="menu"
            onClick={() => setIsActive(!isActive)}
          >
            <span
              aria-hidden="true"
              className="block w-6 h-0.5 bg-foreground my-1"
            ></span>
            <span
              aria-hidden="true"
              className="block w-6 h-0.5 bg-foreground my-1"
            ></span>
            <span
              aria-hidden="true"
              className="block w-6 h-0.5 bg-foreground my-1"
            ></span>
          </button>
        </div>

        <div
          id="menu"
          className={`navbar-menu w-full md:block md:w-auto ${
            isActive ? "block" : "hidden"
          }`}
        >
          <div className="navbar-end flex flex-col md:flex-row items-center">
            <Link
              href="/experience"
              className="navbar-item px-4 py-2 font-bold text-lg hover:text-primary transition-colors"
            >
              Experience
            </Link>
            <Link
              href="/blogs"
              className="navbar-item px-4 py-2 font-bold text-lg hover:text-primary transition-colors"
            >
              Writings
            </Link>
            <Link
              href="/papershelf"
              className="navbar-item px-4 py-2 font-bold text-lg hover:text-primary transition-colors"
            >
              Papershelf
            </Link>
            <Link
              href="/animeshelf"
              className="navbar-item px-4 py-2 font-bold text-lg hover:text-primary transition-colors"
            >
              Anime Shelf
            </Link>
            <Link
              href="/bookshelf"
              className="navbar-item px-4 py-2 font-bold text-lg hover:text-primary transition-colors"
            >
              Bookshelf
            </Link>
            <Link
              href="/volunteering"
              className="navbar-item px-4 py-2 font-bold text-lg hover:text-primary transition-colors"
            >
              Volunteering
            </Link>
            <div className="navbar-item px-4 py-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
