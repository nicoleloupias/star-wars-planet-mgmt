import { axiosInstance } from "./";
import type { RawPlanet } from "./types/Planet";

class Service {
  async getAll(): Promise<RawPlanet[] | undefined> {
    try {
      // Simplified for this case, real life should use pagination in the server
      const PAGE_SIZE = 10;
      const firstPageResponse = await axiosInstance.get(`/planets/`);
      const totalPages = firstPageResponse.data.count / PAGE_SIZE;
      const remainingPagesResponses = await Promise.all(
        Array.from(Array(totalPages - 1)).map((_, i) => axiosInstance.get(`/planets/?page=${i + 2}`))
      );

      const data: RawPlanet[] = [firstPageResponse, ...remainingPagesResponses].flatMap(({ data }) => data.results);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export const PlanetService = new Service();
