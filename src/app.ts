import type {
  User,
  Course,
  Submission,
  ID,
  StringOrNumber,
  StudentWithCourse,
  MaybeUser,
  UnknownValue,
  ApiResponse,
  UserSummary,
  CourseUpdate,
  UserMap,
} from "../types/app";
import { getById, Role, SubmissionStatus } from "../types/app";
import sample = require("./sample");

const user: User = sample.getUser(1);

const course: Course = {
  id: "IT-401",
  title: "IT Elective 4",
  units: 3,
  semester: "1st Semester",
  instructor: "Dr. Smith",
  isOpen: true,
};

const submission: Submission = {
  id: "sub-001",
  userId: user.id,
  courseId: course.id,
  grade: 85,
  submittedAt: new Date().toISOString(),
  status: SubmissionStatus.Submitted,
};

const studentWithCourse: StudentWithCourse = {
  ...user,
  enrolledCourse: course,
};

const response: ApiResponse<User> = {
  success: true,
  data: user,
  message: "User loaded successfully",
};

const userSummary: UserSummary = {
  id: user.id,
  name: user.name,
  email: user.email,
};

const courseUpdate: CourseUpdate = {
  title: "IT Elective 4",
  isOpen: true,
};

const userMap: UserMap = {
  [user.id.toString()]: user,
};

const submissionId: ID = submission.id;
const displayScore: StringOrNumber = user.score;
const maybeUser: MaybeUser = getById([user], user.id) ?? null;
const unknownValue: UnknownValue = "Ready for review";

function describeValue(value: UnknownValue): string {
  if (typeof value === "string") {
    return `Text: ${value}`;
  }
  if (typeof value === "number") {
    return `Number: ${value}`;
  }
  if (value instanceof Date) {
    return `Date: ${value.toISOString()}`;
  }
  return "Unknown value";
}

const roleLabel =
  user.role === Role.Student
    ? "Student"
    : user.role === Role.Teacher
      ? "Teacher"
      : "Admin";

const statusLabel =
  submission.status === SubmissionStatus.Draft
    ? "Draft"
    : submission.status === SubmissionStatus.Submitted
      ? "Submitted"
      : "Graded";

console.log("Student:", user);
console.log("Course:", course);
console.log("Submission:", submission);
console.log("Student with course:", studentWithCourse);
console.log("Response:", response);
console.log("User summary:", userSummary);
console.log("Course update:", courseUpdate);
console.log("User map:", userMap);
console.log("Submission ID:", submissionId);
console.log("Display score:", displayScore);
console.log("Maybe user:", maybeUser);
console.log("Type narrowing:", describeValue(unknownValue));
console.log("Role:", roleLabel);
console.log("Status:", statusLabel);
console.log(sample.calculateGrade(submission.grade, 100));
console.log(sample.formatCourse(course.title, course.units, course.semester));
