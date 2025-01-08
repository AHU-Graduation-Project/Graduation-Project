import { Course } from '../types/course';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    platform: 'udemy',
    image: 'https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg',
    instructor: 'Dr. Angela Yu',
    rating: 4.7,
    price: 89.99,
    url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
    topics: ['html', 'css', 'javascript', 'react']
  },
  {
    id: '2',
    title: 'Meta Front-End Developer Professional Certificate',
    platform: 'coursera',
    image: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/eb/055c13e8614666a2e7f6b84817c557/Meta-Logo-Coursera-Banner.png?auto=format%2Ccompress&dpr=1&w=330&h=330&fit=fill&q=25',
    instructor: 'Meta Staff',
    rating: 4.8,
    price: 49,
    url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
    topics: ['react', 'javascript', 'frontend']
  },
  {
    id: '3',
    title: 'Advanced CSS and Sass',
    platform: 'udemy',
    image: 'https://img-c.udemycdn.com/course/240x135/1026604_790b_2.jpg',
    instructor: 'Jonas Schmedtmann',
    rating: 4.8,
    price: 89.99,
    url: 'https://www.udemy.com/course/advanced-css-and-sass/',
    topics: ['css', 'sass', 'responsive-design']
  }
];