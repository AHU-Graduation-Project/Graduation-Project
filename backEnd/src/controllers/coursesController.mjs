import { searchCoursesService } from "../services/coursesService.mjs";

export const searchCourses = async (req, res) => {
  try {
    const { keyword, page = 1, limit = 10 } = req.query;

    if (!keyword) {
      throw new Error("Keyword is required");
    }
    if (typeof keyword !== "string") {
      throw new Error("Keyword must be a string");
    }

    const courses = await searchCoursesService(
      keyword,
      Number(page),
      Number(limit)
    );
    res
      .status(200)
      .json({
        courses,
        pagination: { page: Number(page), limit: Number(limit) },
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
