import type { User, Course, Submission } from "../types/index";
import sample = require("./sample");

const user: User = sample.getUser(1);

const course: Course = {
	id: "IT-401",
	title: "IT Elective 4",
	units: 3,
	semester: "1st Semester",
	instructor: "Dr. Smith",
};

const submission: Submission = {
	id: "sub-001",
	userId: user.id,
	courseId: course.id,
	grade: 85,
	submittedAt: new Date().toISOString(),
};

console.log(user);
console.log(sample.calculateGrade(submission.grade, 100));
console.log(sample.formatCourse(course.title, course.units, course.semester));
