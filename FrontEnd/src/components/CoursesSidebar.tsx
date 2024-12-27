import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';
import { courses } from '../data/courses';
import CourseCard from './CourseCard';

interface CoursesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  topic?: string;
}

export default function CoursesSidebar({ isOpen, onClose, topic }: CoursesSidebarProps) {
  const { t } = useTranslation();
  const isRtl = document.documentElement.dir === 'rtl';

  const filteredCourses = topic
    ? courses.filter(course => course.topics.includes(topic.toLowerCase()))
    : courses;

  return (
    <div
      className={cn(
        "fixed inset-y-0 h-full w-full md:w-[480px] bg-white dark:bg-slate-800 shadow-xl transform transition-transform duration-700 ease-in-out z-50",
        isOpen
          ? "translate-x-0"
          : isRtl
            ? "-translate-x-full"
            : "translate-x-full",
        isRtl ? "left-0" : "right-0"
      )}
    >
      {/* Fixed Header */}
      <div className="absolute top-0 left-0 right-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-theme text-transparent bg-clip-text">
            {topic ? `Courses: ${topic}` : 'Recommended Courses'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="h-full overflow-y-auto pt-24 pb-6 px-6">
        <div className="grid gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">
                No courses found for this topic.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}