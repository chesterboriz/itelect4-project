import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { fetchCourseByCode, API_URL } from "../api/client";

function CourseDetailPage() {
  const { code } = useParams<{ code: string }>();

  const { data: course, isLoading, isError, error } = useQuery({
    queryKey: ["course", code],
    queryFn: () => fetchCourseByCode(code ?? ""),
    enabled: Boolean(code),
  });

  if (isLoading) {
    return <div className="p-6 text-center">Loading course...</div>;
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-lg bg-red-50 p-4 text-red-700">
          {error?.message ?? "Error"} -- tried {API_URL}/api/courses/{code}
        </div>
        <Link to="/courses" className="mt-4 inline-block text-blue-600 hover:underline">
          &larr; Back to Courses
        </Link>
      </div>
    );
  }

  if (!course) {
    return <div className="p-6">No course found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link to="/courses" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Courses
      </Link>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {course.code}
        </h1>
        <h2 className="text-xl text-gray-700 dark:text-gray-300 mb-4">
          {course.title}
        </h2>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>
            <span className="font-semibold">Units:</span> {course.units}
          </p>
          <p>
            <span className="font-semibold">Semester:</span> {course.semester}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;
