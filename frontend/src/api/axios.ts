import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (!error.response) {
      toast.error("Network Error", {
        description:
          "Unable to connect. Please check your internet and try again.",
      });
    } else if (status && status >= 500) {
      toast.error("Server Error", {
        description: "Something went wrong on our end. Please try again later.",
      });
    }

    return Promise.reject(error);
  }
);

export default api;
