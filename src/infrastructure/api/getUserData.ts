import useTokenStore from "../../application/state/tokenStore";
import axios from "axios";

export interface UserResponse {
  success: boolean;
  profile: any;
}

export async function UserData(): Promise<UserResponse> {
  const { token } = useTokenStore();
  if (!token) {
    throw new Error("Authentication token is missing");
  }
  const response = await axios.get<UserResponse>(
    `${import.meta.env.VITE_PATH_API}/profile/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
