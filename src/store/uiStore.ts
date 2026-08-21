import { create } from 'zustand';

interface UiState {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));