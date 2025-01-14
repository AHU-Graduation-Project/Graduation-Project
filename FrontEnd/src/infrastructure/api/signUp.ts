import axios, { AxiosError } from "axios";
import { useAuthStore } from "../../application/state/authStore";

interface PostUserDto {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

interface IResponse {
  success: boolean;
  token: string;
}

export const signUp = async (userData: PostUserDto): Promise<void> => {
  const { setToken } = useAuthStore.getState(); // Assuming `useAuthStore` has a method to set the token.

  try {
    const res = await axios.post<IResponse>(
      `${import.meta.env.VITE_PATH_API}/api/v1/register`,
      userData, // Send the user data as an object in the request body
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.success) {
      setToken(res.data.token); // Save the token in the store.
      console.log("Registration successful. Token:", res.data.token);
      localStorage.setItem("accessToken", res.data.token);
      // TODO: Add navigation logic to the survey page.
    } else {
      console.error("Registration failed:", res.data);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
  }
};

export default signUp;
