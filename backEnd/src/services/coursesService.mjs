dotenv.config();
import dotenv from "dotenv";
import axios from "axios";
import pkg from "lodash";

const { shuffle } = pkg;

// API credentials
const clientId = process.env.UDEMY_CLIENT_ID;
const clientSecret = process.env.UDEMY_CLIENT_SECRET;
const COURSERA_ACCESS_TOKEN = process.env.COURSERA_ACCESS_TOKEN;

// Function to fetch top courses from Udemy
async function fetchUdemyCourses(keyword, limit = 6) {
  const base64Credentials = btoa(`${clientId}:${clientSecret}`);
  const url = `https://www.udemy.com/api-2.0/courses/?search=${encodeURIComponent(
    keyword
  )}&page_size=${limit}&page=1&ordering=highest_rated`;

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
const fetchCourseraCourses = async (keyword, limit = 6) => {
  
  const encodedSearchTerm = encodeURIComponent(keyword);
  const COURSES_API_URL = `https://api.coursera.org/api/courses.v1?q=search&query=${encodedSearchTerm}&fields=name,photoUrl,slug`; // Fetching top-rated courses without pagination

  const headers = {
    Authorization: `Bearer ${COURSERA_ACCESS_TOKEN}`,
  };

  try {
    const response = await axios.get(COURSES_API_URL, { headers });
    return {
      courses: response.data.elements.slice(0, limit).map((course) => ({
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
async function searchCoursesService(query, limit = 10) {
  const udemyLimit = limit; // Limit for Udemy courses
  const courseraLimit = limit; // Limit for Coursera courses

  // Fetch top courses from both platforms
  const udemyCourses = await fetchUdemyCourses(query, udemyLimit);
  const courseraCourses = await fetchCourseraCourses(query, courseraLimit);

  // Combine the results
  const combinedCourses = [...udemyCourses.courses, ...courseraCourses.courses];

  return {
    courses: shuffle(combinedCourses),
    totalCourses: combinedCourses.length,
  };
}

export default searchCoursesService;
