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
