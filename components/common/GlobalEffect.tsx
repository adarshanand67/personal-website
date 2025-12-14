"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store/useStore";

export const GlobalEffect = () => {
    const { setMounted } = useStore();

    useEffect(() => {
        setMounted(true);
    }, [setMounted]);

    return null;
};
