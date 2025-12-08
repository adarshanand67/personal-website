export interface CommandContext {
    setLines: React.Dispatch<React.SetStateAction<string[]>>;
    setPasswordMode: (mode: boolean) => void;
    router: any; // NextJS router type is complex to mock here, 'any' or typed properly
    setTheme: (theme: string) => void;
    isMatrixEnabled: boolean;
    toggleMatrix: () => void;
    setIsPlaying: (playing: boolean) => void;
    nextTrack: () => void;
    prevTrack: () => void;
    toggleMute: () => void;
    setInput: (input: string) => void;
}

export type CommandFn = (args: string[], context: CommandContext) => void | Promise<void>;

export interface Command {
    name: string;
    description: string;
    execute: CommandFn;
}
