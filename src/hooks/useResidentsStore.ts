import { create } from "zustand";
import { Planet } from "./usePlanetsStore";
import { Resident } from "../services/types/Resident";

interface ResidentsStore {
  residents: Record<Planet["id"], Resident[]>;
  setResident: (planetId: Planet["id"], resident: Resident) => void;
}

export const useResidentsStore = create<ResidentsStore>((set, get) => ({
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
