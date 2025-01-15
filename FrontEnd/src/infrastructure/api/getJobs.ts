import axios, { AxiosError } from 'axios';
import { IJobs } from '../../domain/entities/jobs';

interface GetJobsResponse {
  data: number | IJobs[];
  success: boolean;
}

interface GetJobsParams {
  keyword?: string; // changed from query to keyword
  location?: string;
  dateSincePosted?:string;
  option?:string;
}

export const getJobs = async (
  params: GetJobsParams = {},
): Promise<GetJobsResponse> => {
  try {
    const response = await axios.get<GetJobsResponse>(
      `${import.meta.env.VITE_PATH_API}/Jobs`, // updated endpoint
      {
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Failed to fetch Jobs: ${
          error.response?.data?.message || error.message
        }`,
      );
    }
    throw new Error('An unexpected error occurred while fetching courses');
  }
};
