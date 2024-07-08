import { axiosInstance } from "./";
import type { RawPlanet } from "./types/Planet";

class Service {
  async getAll(): Promise<RawPlanet[] | undefined> {
    try {
      const response = await Promise.all(
        Array.from(Array(6)).map((_, i) => axiosInstance.get(`/planets/?page=${i + 1}`))
      );
      const data = response.flatMap(({ data }) => data.results);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export const PlanetService = new Service();
