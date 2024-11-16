import { searchCourses } from '../../src/services/coursesService.mjs';

// ...existing code...

describe('searchCourses', () => {
  it('should return a list of courses for a valid search term', async () => {
    const searchTerm = 'javascript';
    const courses = await searchCourses(searchTerm);
    console.log('Courses:', courses);
    expect(courses).toBeInstanceOf(Array);
    expect(courses.length).toBeGreaterThan(0);
    courses.forEach(course => {
      console.log('Course:', course);
      expect(course).toHaveProperty('title');
      expect(course).toHaveProperty('description');
      expect(course).toHaveProperty('courseType');
      expect(course).toHaveProperty('slug');
      expect(course).toHaveProperty('photoUrl');
      expect(course).toHaveProperty('instructorIds');
    });
  });
});
