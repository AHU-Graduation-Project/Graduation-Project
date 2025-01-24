import axios, { AxiosError } from "axios";
import useTokenStore from "../../application/state/tokenStore";

interface postPasswordDTO {
  oldPassword: string;
  password: string;
  accesToken: string | null;
}

interface IResponse {
  success: boolean;
  token: string;
}

export const ChangePassword = async ({
  oldPassword,
  password,
  accesToken,
}: postPasswordDTO): Promise<IResponse> => {
  const { setToken, clearRecoveryToken } = useTokenStore.getState();

  try {
    const response = await axios.post<IResponse>(
      `${import.meta.env.VITE_PATH_API}/auth/change-password`,
      { oldPassword, password },
      {
        headers: {
          Authorization: `Bearer ${accesToken}`,
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
      throw new Error(
        error.response?.data?.message || "Password update failed"
      );
    }
    throw error;
  }
};

export default ChangePassword;
