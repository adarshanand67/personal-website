import { useStore } from "@/lib/store/useStore";
import { AppState } from "@/lib/store/types";

export function useMounted(): boolean {
    const isMounted = useStore((state: AppState) => state.isMounted);
    return isMounted;
}
