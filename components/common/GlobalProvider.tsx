"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalState {
    isMatrixEnabled: boolean;
    toggleMatrix: () => void;
    setMatrix: (enabled: boolean) => void;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isMatrixEnabled, setIsMatrixEnabled] = useState(false);

    const toggleMatrix = () => setIsMatrixEnabled((prev) => !prev);
    const setMatrix = (enabled: boolean) => setIsMatrixEnabled(enabled);

    return (
        <GlobalContext.Provider value={{ isMatrixEnabled, toggleMatrix, setMatrix }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobalState must be used within a GlobalProvider");
    }
    return context;
};
