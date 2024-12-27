import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

// Udemy API credentials
const clientId = process.env.UDEMY_CLIENT_ID;
const clientSecret = process.env.UDEMY_CLIENT_SECRET;

// Coursera API token from environment variable
const ACCESS_TOKEN = process.env.COURSERA_ACCESS_TOKEN;

// Function to fetch top courses from Udemy
export async function fetchUdemyCourses(keyword, limit = 10) {
  const base64Credentials = btoa(`${clientId}:${clientSecret}`);
  const url = `https://www.udemy.com/api-2.0/courses/?search=${encodeURIComponent(
    keyword
  )}&page_size=${limit}&page=1&ordering=highest_rated`; // Fetching top-rated courses without pagination

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    return {
      courses: data.results.map((course) => ({
        title: course.title,
        photoUrl: course.image_240x135,
        url: `https://www.udemy.com${course.url}`,
      })),
    };
  } catch (error) {
    console.error("Error fetching Udemy courses:", error);
    return { courses: [] };
  }
}

// Function to fetch top courses from Coursera
export const fetchCourseraCourses = async (searchTerm, limit = 10) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const COURSES_API_URL = `https://api.coursera.org/api/courses.v1?q=search&query=${encodedSearchTerm}&fields=name,photoUrl,slug&page=1&limit=${limit}`; // Fetching top-rated courses without pagination

  const headers = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  try {
    const response = await axios.get(COURSES_API_URL, { headers });

    return {
      courses: response.data.elements.map((course) => ({
        id: course.id, // Add the course ID
        title: course.name,
        photoUrl: course.photoUrl,
        url: `https://www.coursera.org/learn/${course.slug}`,
      })),
    };
  } catch (error) {
    console.error("Error fetching Coursera courses:", error);
    return { courses: [] };
  }
};

// Function to search top courses on both platforms
async function searchCourses(query, limit = 10) {
  const udemyLimit = limit; // Limit for Udemy courses
  const courseraLimit = limit; // Limit for Coursera courses

  // Fetch top courses from both platforms
  const udemyCourses = await fetchUdemyCourses(query, udemyLimit);
  const courseraCourses = await fetchCourseraCourses(query, courseraLimit);

  // Combine the results
  const combinedCourses = [...udemyCourses.courses, ...courseraCourses.courses];

  return {
    combinedCourses,
    totalCourses: combinedCourses.length,
  };
}

// Example usage: Fetch 10 top courses from each platform
searchCourses("AI", 10).then(({ combinedCourses, totalCourses }) => {
  console.log("Combined Top Courses:", combinedCourses);
  console.log("Total Courses:", totalCourses);
});
