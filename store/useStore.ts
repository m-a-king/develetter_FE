import { create } from 'zustand';

interface StoreState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clearAccessToken: () => void;

  isSubscribed: boolean;
  setSubscribed: (status: boolean) => void;
  clearSubscribed: () => void;
}

const useStore = create<StoreState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),

  isSubscribed: false,
  setSubscribed: (status) => set({ isSubscribed: status }),
  clearSubscribed: () => set({ isSubscribed: false }),
}));

export default useStore;