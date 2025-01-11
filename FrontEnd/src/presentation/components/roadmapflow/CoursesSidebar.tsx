import { X } from 'lucide-react';
import { cn } from '../../../infrastructure/utils/cn';
import { courses } from '../../../data/courses';
import CourseCard from './CourseCard';
import { useState } from 'react';

interface CoursesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  topic?: string;
}

type Platform = 'all' | 'udemy' | 'coursera';

export default function CoursesSidebar({ isOpen, onClose, topic }: CoursesSidebarProps) {
  const [platform, setPlatform] = useState<Platform>('all');
  if (!isOpen) return null;

  const filteredCourses = courses.filter(course => {
    const matchesTopic = topic 
      ? course.topics.includes(topic.toLowerCase())
      : true;
    const matchesPlatform = platform === 'all' 
      ? true 
      : course.platform === platform;
    return matchesTopic && matchesPlatform;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
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

          {/* Platform Filter */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex gap-2">
              {(['all', 'udemy', 'coursera'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                    platform === p
                      ? "bg-theme text-white"
                      : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
                  )}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
            
            {filteredCourses.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-600 dark:text-slate-400">
                  No courses found for this topic and platform.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}