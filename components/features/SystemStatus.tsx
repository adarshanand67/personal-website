"use client";

import React from "react";
import { siteConfig } from "@/lib/config";

export function SystemStatus() {
  return (
    <div className="flex items-center gap-2 mt-4 text-xs font-mono">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </div>
      <span className="opacity-60">Status:</span>
      <span className="font-bold text-green-600 dark:text-green-400">
        {siteConfig.whoami.status}
      </span>
      <span className="opacity-30 mx-2">|</span>
      <span className="opacity-60">Location:</span>
      <span className="font-bold">{siteConfig.author.location}</span>
    </div>
  );
}
