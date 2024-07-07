export interface RawPlanet {
  name: string;
  diameter: string;
  population: string;
  climate: string;
  terrain: string;
  url: string;
  residents: string[];
  rotation_period?: string;
  films?: string[];
  gravity?: string;
  created?: string;
  edited?: string;
  orbital_period?: string;
  surface_water?: string; //optional to simplify
}
