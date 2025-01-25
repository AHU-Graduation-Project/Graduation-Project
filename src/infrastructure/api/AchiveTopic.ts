import useTokenStore from "../../application/state/tokenStore";
import axios from "axios";
import { AxiosError } from "axios";

export interface AchiveTopicResponse {
  success: boolean;
  roadmap: any;
}

export function AchiveTopic() {
  const { token , getUser } = useTokenStore();
  const user = getUser();

  return {
    execute: async (id: string): Promise<AchiveTopicResponse> => {
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      try {
        const response = await axios.post<AchiveTopicResponse>(
          `${import.meta.env.VITE_PATH_API}/topics/achieve/${id}`,
          { user: user },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response.data)
        return response.data;

      } catch (error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message || error.message;
          throw new Error(`Failed to achieve topic: ${message}`);
        }
        throw new Error('An unexpected error occurred while achieving topic');
      }
    }
  };
}