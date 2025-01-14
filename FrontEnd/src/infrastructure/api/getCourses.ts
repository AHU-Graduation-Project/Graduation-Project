import axios, { AxiosError } from 'axios';

interface Course {
  title: string;
  price?: number;
  photo?: string;
  
}

interface GetCoursesResponse {
  courses: Course[];
  total: number;

}

interface GetCoursesParams {
  query?: string;
  page?: number;
  pageSize?: number;
  category?: string;
  sortBy?: 'price' | 'title' | 'duration';
  sortOrder?: 'asc' | 'desc';
}

export const getCourses = async (params: GetCoursesParams = {}): Promise<GetCoursesResponse> => {
  try {
    const response = await axios.get<GetCoursesResponse>(
      `${import.meta.env.VITE_PATH_API}/getCourses`
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
