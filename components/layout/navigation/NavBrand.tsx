"use client";

import Link from "next/link";
import { routes } from "@/lib/constants";

export function NavBrand() {
    return (
        <Link
            href={routes.home}
            className="text-xl font-black title-gradient tracking-tight flex items-center gap-3 mr-auto group"
        >
            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-green-500/20">
                ~
            </div>
            Adarsh
        </Link>
    );
}
