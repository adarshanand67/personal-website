import { useStore } from '@/lib/store/useStore';
import { AppState } from '@/lib/store/useStore'; // Assuming AppState is exported or available

export function useMounted(): boolean {
    const isMounted = useStore((state: AppState) => state.isMounted);
    return isMounted;
}
