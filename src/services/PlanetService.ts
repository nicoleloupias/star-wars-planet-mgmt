import { axiosInstance } from "./";

class Service {
  async getAll() {
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
