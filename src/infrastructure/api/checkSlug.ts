import axios, { AxiosError } from 'axios';

interface CheckSlugResponse {
  success: boolean;
  message: string;
}

export const checkSlug = async (slug: string): Promise<CheckSlugResponse> => {
  try {
    const response = await axios.get<CheckSlugResponse>(
      `${import.meta.env.VITE_PATH_API}/roadmaps/check-slug/${slug}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Slug check error:', error.response?.data || error.message);
      return {
        success: false,
        message: 'This route is already taken'
      };
    }
    return {
      success: false,
      message: 'Error checking route availability'
    };
  }
};
