import searchCoursesService  from "../services/coursesService.mjs";

export const searchCourses = async (req, res) => {
  try {
    const { keyword } = req.query;
    const NumberOfCourses = 6;

    if (!keyword) {
      throw new Error("Keyword is required");
    }
    if (typeof keyword !== "string") {
      throw new Error("Keyword must be a string");
    }

    const courses = await searchCoursesService(keyword, NumberOfCourses);
    res
      .status(200)
      .json({
        courses
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};
