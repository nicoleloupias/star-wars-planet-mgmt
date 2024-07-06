import { axiosInstance } from "./";

class Service {
  async getById(residentId: string) {
    try {
      const response = await axiosInstance.get(`/people/${residentId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export const ResidentService = new Service();
