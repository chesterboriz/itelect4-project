import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'compact';
}

export default function CourseCard({ course, variant = 'default' }: CourseCardProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm transition duration-200 dark:border-gray-700 dark:bg-gray-800 ${
        isCompact ? 'p-3' : 'p-5'
      }`}>
      <h3 className={`font-bold text-gray-900 dark:text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
        {course.code}
      </h3>

      {!isCompact && (
        <p className="text-gray-600 dark:text-gray-300">{course.title}</p>
      )}

      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        {course.units} units -- {course.semester}
      </p>

      {!isCompact && (
        <button className="mt-4 inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
          Select
        </button>
      )}
    </div>
  );
}
