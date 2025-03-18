import { create } from 'zustand';
import type { Bin } from '@shared/schema';

type SocketStore = {
  socket: WebSocket | null;
  connect: () => void;
  disconnect: () => void;
};

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  connect: () => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);
    set({ socket });
  },
  disconnect: () => {
    set((state) => {
      state.socket?.close();
      return { socket: null };
    });
  }
}));

export const useSocket = () => {
  const { socket, connect, disconnect } = useSocketStore();
  return { socket, connect, disconnect };
};

type BinStore = {
  bins: Map<number, Bin>;
  updateBin: (bin: Bin) => void;
};

export const useBinStore = create<BinStore>((set) => ({
  bins: new Map(),
  updateBin: (bin) => 
    set((state) => ({
      bins: new Map(state.bins).set(bin.id, bin)
    }))
}));
