import { searchCourses as coursesService } from "../services/coursesService.mjs";

export const searchCourses = async (req, res) => {
  try {
    const { keyWord } = req.body;
    
    if (!keyWord) {
      throw new Error("keyWord is required");
    }
    if (typeof keyWord !== 'string') {
      throw new Error("keyWord must be a string");
    }
    const result = await coursesService(keyWord);
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};