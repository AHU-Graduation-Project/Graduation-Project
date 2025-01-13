import { ICourse } from "../domain/entities/course";

export const courses: ICourse[] = [
  {
    title: 'Complete Web Development Bootcamp',
    platform: 'udemy',
    photoUrl: 'https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg',
    price: '89.99',
    url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
  },
  {
    title: 'Meta Front-End Developer Professional Certificate',
    platform: 'coursera',
    photoUrl:
      'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/eb/055c13e8614666a2e7f6b84817c557/Meta-Logo-Coursera-Banner.png?auto=format%2Ccompress&dpr=1&w=330&h=330&fit=fill&q=25',
    price: '49',
    url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
  },
  {
    title: 'Advanced CSS and Sass',
    platform: 'Udemy',
    photoUrl: 'https://img-c.udemycdn.com/course/240x135/1026604_790b_2.jpg',
    price: '89.99',
    url: 'https://www.udemy.com/course/advanced-css-and-sass/',
  },
];