import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { URLSearchParams } from "url";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

export const searchCourses = async (searchTerm) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const COURSES_API_URL = `https://api.coursera.org/api/courses.v1?q=search&query=${encodedSearchTerm}&fields=name,description,courseType,slug,photoUrl,instructorIds`;

  const headers = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  try {
    const response = await axios.get(COURSES_API_URL, { headers });
    if (response.status === 200) {
      return response.data.elements.map((course) => ({
        title: course.name || "No Title",
        description: course.description || "No Description",
        courseType: course.courseType || "No Course Type",
        slug: course.slug || "No Slug",
        photoUrl: course.photoUrl || "No Image Available",
        instructorIds: course.instructorIds || "No Instructors Available",
      }));
    } else {
      throw new Error(
        `Failed to retrieve courses. Status Code: ${response.status}, Response: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
