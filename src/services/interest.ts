import api from "./api"; // Use your pre-configured Axios instance

export interface Interest {
  id: string;
  name: string;
  icon: string;
}

export interface InterestResponse {
  success: boolean;
  data?: Interest[];
  error?: string;
}

export const InterestService = {
  getAllInterests: async (): Promise<InterestResponse> => {
    try {
      const response = await api.get("/interests");
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        error:
          error.response?.data?.message || "Failed to fetch interests",
      };
    }
  },
};
