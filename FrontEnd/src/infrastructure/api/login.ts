import axios, { AxiosError } from 'axios';
import useTokenStore from '../../application/state/tokenStore';

interface PostUserDto {
  email: string;
  password: string;
}

interface IResponse {
  success: boolean;
  token: string;
}

export const Login = async (userData: PostUserDto): Promise<IResponse> => {
  const { setToken } = useTokenStore.getState();

  try {
    const res = await axios.post<IResponse>(
      `${import.meta.env.VITE_PATH_API}/auth/login`,
      userData, // Send the user data as an object in the request body
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (res.data.success) {
      setToken(res.data.token); // Save the token in the store.
      return res.data;
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    } else {
      throw error;
    }
  }
};

export default Login;
