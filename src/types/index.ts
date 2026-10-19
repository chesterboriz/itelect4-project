const enum Role {
  Student = 'student',
  SecurityAdmin = 'security-admin',
  Admin = 'admin',
}

enum ClaimStatus {
  Pending = 'pending',
  Verified = 'verified',
  Rejected = 'rejected',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  score: number;
}

export interface Item {
  id: string;
  title: string;
  category: string;
  locationFound: string;
  description?: string;
  status: 'reported' | 'claimed' | 'resolved';
  isClaimed: boolean;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  units: number;
  semester: string;
  instructor?: string;
  isOpen: boolean;
}

export interface Claim {
  id: string;
  userId: number;
  itemId: string;
  claimReason: string;
  claimedAt: string;
  status: ClaimStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}

export type ID = string | number;
export type StringOrNumber = string | number;
export type UserWithItem = User & { reportedItem: Item };
export type MaybeUser = User | null | undefined;
export type UnknownValue = unknown;
export type NeverValue = never;
export type UserRole = User['role'];
export type UserSummary = Pick<User, 'id' | 'name' | 'email'>;
export type ItemUpdate = Partial<Omit<Item, 'id'>>;
export type UserMap = Record<string, User>;

export function getById<T extends { id: string | number }>(
  items: T[],
  id: string | number,
): T | undefined {
  return items.find((item) => item.id === id);
}

export function isClaim(value: unknown): value is Claim {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'itemId' in value &&
    'status' in value
  );
}

export { Role, ClaimStatus };

// ---------------------------------------------------------------------
// GT4 PART 2 DERIVED TYPES (Matching real MongoDB API):
// ---------------------------------------------------------------------

export interface Submission {
  id: string;
  studentId: string;
  courseCode: string;
  repoUrl: string;
  submittedAt: string;
}

// ===== SESSION 10: matching the real API =========
export type ApiSubmission = Omit<
  Submission,
  "id" | "studentId" | "submittedAt"
> & {
  id: string; // 24 hex characters, from MongoDB's _id
  studentId: string; // the owner's _id, also 24 hex characters
  submittedAt: string; // an ISO string, never a Date object
};

// What we SEND when creating one. The server fills in studentId and submittedAt.
export type NewSubmission = Pick<Submission, "courseCode" | "repoUrl">;

// What /api/auth/register sends back, and what sits inside the login reply
export type ApiUser = Omit<User, "id"> & {
  id: string;
};

// What /api/auth/login sends back
export interface AuthReply {
  token: string;
  user: ApiUser;
}

// Campus Lost & Found types matching real backend
export type ItemApi = Omit<Item, "id"> & {
  id: string;
  userId?: string;
  estimatedValue?: number;
};

export type NewItem = Pick<Item, "title" | "category" | "locationFound"> & {
  description?: string;
  status?: "reported" | "claimed" | "resolved";
  isClaimed?: boolean;
  estimatedValue?: number;
};

