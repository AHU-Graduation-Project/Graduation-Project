import { X } from 'lucide-react';
import { cn } from '../../../infrastructure/utils/cn';
import CourseCard from './CourseCard';
import { useState, useEffect, useRef } from 'react';
import { getCourses } from '../../../infrastructure/api/getCourses';
import { ICourse } from '../../../domain/entities/course';
import { Alert, AlertDescription} from "../UI/Alert"
import {LoadingState } from './SkeletonCard';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic?: string;
}

type Platform = 'all' | 'Udemy' | 'Coursera';

// Cache object to store courses by topic
type CoursesCache = {
  [key: string]: ICourse[];
};

export default function CourseModal({
  isOpen,
  onClose,
  topic,
}: CourseModalProps) {
  const [platform, setPlatform] = useState<Platform>('all');
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use useRef for the cache to persist between renders
  const coursesCache = useRef<CoursesCache>({});

  useEffect(() => {
    const fetchCourses = async () => {
      if (!topic) return;

      // Check if we already have the courses for this topic in cache
      if (coursesCache.current[topic]) {
        setCourses(coursesCache.current[topic]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await getCourses({ keyword: topic });
        setCourses(response.data.courses);
        // Store in cache
        coursesCache.current[topic] = response.data.courses;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch courses',
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && topic) {
      fetchCourses();
    }
  }, [isOpen, topic]);

  if (!isOpen) return null;

  // Filter courses based on selected platform
  const filteredCourses =
    platform === 'all'
      ? courses
      : courses.filter((course) => course.platform.toLowerCase() === platform.toLocaleLowerCase());

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
              aria-label="Close courses sidebar"
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Platform Filter */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex gap-2">
              {(['all', 'Udemy', 'Coursera'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                    platform === p
                      ? 'bg-theme text-white'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600',
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
          {isLoading ? (
            <LoadingState/>
          ) : error ? (
            <Alert variant="destructive" className="my-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course ,key) => (
                <CourseCard key={key} course={course} />
              ))}

              {filteredCourses.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-600 dark:text-slate-400">
                    No courses found for this topic and platform.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
