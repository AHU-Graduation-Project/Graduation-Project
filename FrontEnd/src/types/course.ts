export interface Course {
  id: string;
  title: string;
  platform: 'udemy' | 'coursera';
  image: string;
  instructor: string;
  rating: number;
  price: number;
  url: string;
  topics: string[];
}