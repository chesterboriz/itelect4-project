const enum Role {
  Student = "student",
  Teacher = "teacher",
  Admin = "admin",
}

enum SubmissionStatus {
  Draft = "draft",
  Submitted = "submitted",
  Graded = "graded",
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  score: number;
}

export interface Course {
  id: string;
  title: string;
  units: number;
  semester: string;
  instructor?: string;
  isOpen: boolean;
}

export interface Submission {
  id: string;
  userId: number;
  courseId: string;
  grade: number;
  submittedAt: string;
  status: SubmissionStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}

export type ID = string | number;
export type StringOrNumber = string | number;
export type StudentWithCourse = User & { enrolledCourse: Course };
export type MaybeUser = User | null | undefined;
export type UnknownValue = unknown;
export type NeverValue = never;
export type UserRole = User["role"];
export type UserSummary = Pick<User, "id" | "name" | "email">;
export type CourseUpdate = Partial<Omit<Course, "id">>;
export type UserMap = Record<string, User>;

export function getById<T extends { id: string | number }>(
  items: T[],
  id: string | number,
): T | undefined {
  return items.find((item) => item.id === id);
}

export function isSubmission(value: unknown): value is Submission {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "courseId" in value &&
    "grade" in value
  );
}

export { Role, SubmissionStatus };
