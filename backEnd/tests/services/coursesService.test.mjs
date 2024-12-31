import searchCoursesService from "../../src/services/coursesService.mjs";

describe('searchCourses', () => {
  it('should return a list of courses for a valid search term', async () => {

    const searchTerm = 'AI';

    const { courses, totalCourses } = await searchCoursesService(searchTerm, 6);

    expect(courses).toBeInstanceOf(Array);

    expect(totalCourses).toBeGreaterThan(0);
    console.log(courses);
    courses.forEach(course => {
      expect(course).toHaveProperty('title');
      expect(course).toHaveProperty("url");
      expect(course).toHaveProperty('photoUrl');
    });

  });
});
