import axios, { AxiosError } from "axios";

interface SurveyData {
  position: string;
  country: string;
  level: string;
  selectedSkills: string[];
}

interface ISurveyResponse {
  success: boolean;
}

export const submitSurvey = async (
  surveyData: SurveyData
): Promise<ISurveyResponse> => {
  try {
    const res = await axios.post<ISurveyResponse>(
      `${import.meta.env.VITE_PATH_API}/user/survey`,
      surveyData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.success) {
      return res.data;
    } else {
      throw new Error("Survey submission failed");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Survey submission failed"
      );
    } else {
      throw error;
    }
  }
};

export default submitSurvey;
