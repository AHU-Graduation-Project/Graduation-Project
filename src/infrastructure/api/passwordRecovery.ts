import axios, { AxiosError } from "axios";
import useTokenStore from "../../application/state/tokenStore";

interface PostPasswordDTO {
  password: string;
  recoveryToken: string;
}

interface IResponse {
  success: boolean;
  token: string;
}

export const passwordRecovery = async ({
  password,
  recoveryToken
}: PostPasswordDTO): Promise<IResponse> => {
  const { setToken, clearRecoveryToken } = useTokenStore.getState();

  try {
    const response = await axios.post<IResponse>(
      `${import.meta.env.VITE_PATH_API}/auth/change-password`,
      { password },
      {
        headers: {
          Authorization: `Bearer ${recoveryToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      setToken(response.data.token);
      clearRecoveryToken();
      return response.data;
    }
    
    throw new Error("Password update failed");
  } catch (error) {
    clearRecoveryToken();
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Password update failed");
    }
    throw error;
  }
};

export default passwordRecovery;
