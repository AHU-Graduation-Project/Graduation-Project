import useTokenStore from "../../application/state/tokenStore";
import axios from "axios";
import { AxiosError } from "axios";

export interface AchiveTopicResponse {
  success: boolean;
  topic: any;
}

export async function AchiveSkills() {
  const { token } = useTokenStore();
  if (!token) {
    throw new Error("Authentication token is missing");
  }
  try {
    const response = await axios.get<AchiveTopicResponse>(
      `${import.meta.env.VITE_PATH_API}/topics/achieve`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;
      throw new Error(`Failed to achieve topic: ${message}`);
    }
    throw new Error("An unexpected error occurred while achieving topic");
  }
}
