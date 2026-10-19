import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchCourses, API_URL } from "../api/client";
import CourseCard from "../components/CourseCard";

function CoursesPage() {
  const { data: courses, isLoading, isError, error } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  if (isLoading) {
    return <div className="p-6 text-center">Loading courses...</div>;
  }

  // ===== SESSION 10: name the host it actually tried ===================
  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-lg bg-red-50 p-4 text-red-700">
          {error?.message ?? "Failed to load"} -- tried {API_URL}/api/courses
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Courses
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course) => (
          <Link key={course.code} to={`/courses/${course.code.toLowerCase()}`}>
            <CourseCard course={course} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
