'use client'

import { create } from 'zustand';
import { GameResult } from '@/utils/storage';

interface GameState {
  currentGame: 'apple' | null;
  isPlaying: boolean;
  scores: GameResult[];
  bestScore: GameResult | null;
  
  setCurrentGame: (game: 'apple' | null) => void;
  setIsPlaying: (playing: boolean) => void;
  addScore: (score: GameResult) => void;
  setBestScore: (score: GameResult) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentGame: null,
  isPlaying: false,
  scores: [],
  bestScore: null,
  
  setCurrentGame: (game) => set({ currentGame: game }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  addScore: (score) => set((state) => ({ scores: [score, ...state.scores] })),
  setBestScore: (score) => set({ bestScore: score }),
  resetGame: () => set({ 
    currentGame: null, 
    isPlaying: false 
  }),
}));