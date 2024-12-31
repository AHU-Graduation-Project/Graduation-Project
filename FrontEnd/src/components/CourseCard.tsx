import { Star } from 'lucide-react';
import { Course } from '../types/course';
import { cn } from '../utils/cn';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <a 
      href={course.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block group hover:no-underline"
    >
      <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded-full inline-block mb-2",
            course.platform === 'udemy' 
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
          )}>
            {course.platform.toUpperCase()}
          </div>
          
          <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-theme transition-colors">
            {course.title}
          </h3>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            {course.instructor}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{course.rating}</span>
            </div>
            <span className="font-bold text-theme">${course.price}</span>
          </div>
        </div>
      </div>
    </a>
  );
}