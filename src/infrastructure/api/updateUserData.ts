import axios from "axios";
import useTokenStore from "../../application/state/tokenStore";

interface ProfileData {
  position: string | null;
  country: string | null;
  level: string | null;
  last_name: string | null;
  first_name: string | null;
}

interface IProfileResponse {
  success: boolean;
  data: ProfileData;
}

export const UpdateUserData = async (
  profileData: ProfileData
): Promise<IProfileResponse> => {
  const { token } = useTokenStore();

  try {
    const res = await axios.put<IProfileResponse>(
      `${import.meta.env.VITE_PATH_API}/profile/`,
      profileData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export default UpdateUserData;
