import { useStore, AppState } from '@/lib/store/useStore';

export function useMounted(): boolean {
    const isMounted = useStore((state: AppState) => state.isMounted);
    return isMounted;
}
