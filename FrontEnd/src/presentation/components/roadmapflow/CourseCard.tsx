import { Star } from "lucide-react";
import { Course } from "../../../domain/entities/course";
import { cn } from "../../../infrastructure/utils/cn";

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
      <div
        className="relative bg-white dark:bg-slate-800 rounded-lg
       overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105
       min-h-[265px] flex flex-col"
      >
        {/* Platform Badge */}
        <div
          className={cn(
            "absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full z-10",
            course.platform === "Udemy"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700 "
          )}
        >
          {course.platform.toUpperCase()}
        </div>

        {/* Image Container */}
        <div className="relative h-40 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white font-medium">View Course</span>
          </div>
          <img
            src={course.photoUrl}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-grow flex-col justify-between">
          {/* Title */}
          <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-theme transition-colors">
            {course.title.length > 50
              ? course.title.slice(0, 50) + '...'
              : course.title}
          </h3>

          {/* Rating and Price */}
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {course.rating}
              </span>
            </div> */}
            <span className="font-bold text-theme">{course.price}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
