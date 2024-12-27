const clientId = "nZevoopU0byStpzUqg4ibSh4M15QponcC8aAPKQA";
const clientSecret =
  "13osCKfaZR1agyQbjyyJ7mJ3KxlFihZaFwQ2yXRRa2LRh1omd8cVDLpKePA0Glma9u3PbLCN4cpksIAOgNFZBQK1xr6qIgJBhTYtdehCTEWbA980BbPAOc9AbD4IzjDg";

async function fetchCourses(keyword) {
  const base64Credentials = btoa(`${clientId}:${clientSecret}`);
  const url = `https://www.udemy.com/api-2.0/courses/?search=${encodeURIComponent(
    keyword
  )}`;

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
    console.log("Courses:", data);
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
}

// Example usage
fetchCourses("JavaScript");
