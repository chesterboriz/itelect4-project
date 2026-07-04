export interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  isActive: boolean;
  score: number;
}

export interface Course {
  id: string;
  title: string;
  units: number;
  semester: string;
  instructor?: string;
}

export interface Submission {
  id: string;
  userId: number;
  courseId: string;
  grade: number;
  submittedAt: string; // ISO timestamp
}