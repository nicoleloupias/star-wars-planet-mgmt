import { axiosInstance } from "./";

export class Service {
  async getAll() {
    try {
      const response = await axiosInstance.get("/planets/");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export const PlanetService = new Service();
