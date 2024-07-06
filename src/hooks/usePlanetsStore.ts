import { create } from "zustand";
import { Planet } from "../services/types/Planet";
import { getPlanetId } from "../helpers/planet";

interface PlanetStore {
  planets: Planet[];
  setPlanets: (planets: Planet[]) => void;
  getById: (id: string) => Planet | undefined;
  editPlanet: (id: string, data: Planet) => void;
}

export const usePlanetsStore = create<PlanetStore>((set, get) => ({
  planets: [],
  setPlanets: (planets) => {
    return set((state) => {
      return { ...state, planets: [...state.planets, ...planets] };
    });
  },
  editPlanet: (id, data) => {
    return set((state) => {
      const planets = state.planets.map((planet) => {
        const planetId = getPlanetId(planet.url);
        if (planetId === id) {
          return { ...planet, ...data };
        }
        return planet;
      });

      return { ...state, planets: [...planets] };
    });
  },
  getById: (id) => get().planets.find((planet) => planet.url.includes(`/${id}/`))
}));
