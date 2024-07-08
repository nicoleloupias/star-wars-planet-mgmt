import { create } from "zustand";
import type { Planet } from "./usePlanetsStore";
import type { Resident } from "../services/types/Resident";

interface ResidentsStore {
  residents: Record<Planet["id"], Resident[]>;
  setResident: (planetId: Planet["id"], resident: Resident) => void;
}

export const useResidentsStore = create<ResidentsStore>((set) => ({
  residents: {},
  setResident: (planetId, resident) => {
    return set((state) => {
      return {
        ...state,
        residents: {
          ...state.residents,
          [planetId]: [...(state.residents?.[planetId] || []), resident]
        }
      };
    });
  }
}));
