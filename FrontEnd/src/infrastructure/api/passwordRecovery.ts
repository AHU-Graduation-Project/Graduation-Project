import axios, { AxiosError } from "axios";
import useTokenStore from "../../application/state/tokenStore";

interface PostPasswordDTO {
  password: string;
  revoveryToken: any;
}

interface IResponse {
  success: boolean;
  token: string;
}

export const passwordRecovery = async (
  userData: PostPasswordDTO
): Promise<IResponse> => {
  const { setToken } = useTokenStore.getState();

  try {
    const res = await axios.post<IResponse>(
      `${import.meta.env.VITE_PATH_API}/auth/change-password`,
      userData.password, // Send the user data as an object in the request body
      {
        headers: {
          Authorization: `Bearer ${userData.revoveryToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.success) {
      setToken(res.data.token); // Save the token in the store.
      return res.data;
    } else {
      throw new Error("password can not like the old password");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Registration failed");
    } else {
      throw error;
    }
  }
};

export default passwordRecovery;
