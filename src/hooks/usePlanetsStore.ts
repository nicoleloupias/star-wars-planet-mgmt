import { create } from "zustand";
import { Planet } from "../services/types/Planet";

interface PlanetStore {
  planets: Planet[];
  setPlanets: (planets: Planet[]) => void;
  getById: (id: string) => Planet | undefined;
}

export const usePlanetsStore = create<PlanetStore>((set, get) => ({
  planets: [],
  setPlanets: (planets) => {
    return set((state) => {
      return { ...state, planets: [...state.planets, ...planets] };
    });
  },
  getById: (id) => get().planets.find((planet) => planet.url.includes(`/${id}/`))
}));
