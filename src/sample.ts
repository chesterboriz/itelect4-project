// sample.ts -- converted from sample.js; exports typed utilities
import type { User } from "../types/app";
import { Role } from "../types/app";

function getUser(id: number): User {
  return {
    id: id,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    role: Role.Student,
    isActive: true,
    score: 95.5,
  };
}

function calculateGrade(
  score: number,
  maxScore: number
): "A" | "B" | "C" | "F" {
  const percentage: number = (score / maxScore) * 100;
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  return "F";
}

function formatCourse(
  name: string,
  units: number,
  semester: string
): string {
  return `${name} (${units} units) - ${semester}`;
}

const exported = { getUser, calculateGrade, formatCourse };
export = exported;

