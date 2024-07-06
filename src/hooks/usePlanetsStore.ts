import { create } from "zustand";
import { RawPlanet } from "../services/types/Planet";
import { getPlanetId } from "../helpers/planet";

export interface Planet extends RawPlanet {
  id: string;
}

interface PlanetStore {
  planets?: Planet[];
  setPlanets: (planets: Planet[]) => void;
  addPlanet: (planet: Planet) => void;
  editPlanet: (id: string, data: Planet) => void;
  removePlanet: (id: string) => void;
}

export const usePlanetsStore = create<PlanetStore>((set, get) => ({
  planets: undefined,
  setPlanets: (planets) => {
    return set((state) => {
      const transformedPlanets = planets.map((planet) => ({
        ...planet,
        id: getPlanetId(planet.url)
      }));
      return { ...state, planets: [...(state?.planets || []), ...transformedPlanets] };
    });
  },
  addPlanet: (planet) => {
    return set((state) => {
      return { ...state, planets: [...(state?.planets || []), planet] };
    });
  },
  editPlanet: (id, data) => {
    return set((state) => {
      const planets = state?.planets?.map((planet) => {
        if (planet.id === id) {
          return { ...planet, ...data };
        }
        return planet;
      });

      return { ...state, planets: [...(planets || [])] };
    });
  },
  removePlanet: (id) => {
    return set((state) => {
      return { ...state, planets: state?.planets?.filter((planet) => !(planet.id === id)) };
    });
  }
}));
