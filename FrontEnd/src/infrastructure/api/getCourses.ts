import axios, { AxiosError } from 'axios';
import { ICourse } from '../../domain/entities/course';

interface GetCoursesResponse {
data: {
  courses: ICourse[];
  total: number;
};
success: boolean;
}

interface GetCoursesParams {
  keyword?: string;  // changed from query to keyword
 
}

export const getCourses = async (params: GetCoursesParams = {}): Promise<GetCoursesResponse> => {
  try {
    const response = await axios.get<GetCoursesResponse>(
      `${import.meta.env.VITE_PATH_API}/courses`,  // updated endpoint
      {
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to fetch courses: ${error.response?.data?.message || error.message}`);
    }
    throw new Error('An unexpected error occurred while fetching courses');
  }
};
