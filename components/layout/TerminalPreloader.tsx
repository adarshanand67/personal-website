"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { introLines } from "@/lib/constants";

export function TerminalPreloader() {
  const { isIntroDone, setLines, setIsIntroDone } = useStore();
  useEffect(() => {
    if (!isIntroDone) {
      setLines(introLines());
      setIsIntroDone(true);
    }
  }, [isIntroDone, setLines, setIsIntroDone]);
  return null;
}
