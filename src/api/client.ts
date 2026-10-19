import type {
  Course,
  ApiSubmission,
  NewSubmission,
  AuthReply,
  ApiUser,
  ItemApi,
  NewItem,
  User,
  Claim,
} from "../types/index";
import useAuthStore from "../store/authStore";

// Vite only exposes variables whose name starts with VITE_, and it
// replaces this at BUILD time -- the value that was in .env when
// `npm run build` ran is baked into the bundle.
export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "VITE_API_URL is missing. Copy .env.example to .env, fill it in, " +
      "and restart npm run dev.",
  );
}

// Every call goes through here: the host, the JSON header, the token
// when there is one, and the API's own message when it refuses.
async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  // getState(), not the useAuthStore hook -- this is not a component,
  // and it does not need to re-render when the token changes.
  const token = useAuthStore.getState().token;

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }

  return res.json();
}

// ---- courses: public. request() sends no token, and none is needed.
export function fetchCourses(): Promise<Course[]> {
  return request<Course[]>("/api/courses");
}

export function fetchCourseByCode(code: string): Promise<Course> {
  return request<Course>(`/api/courses/${code}`);
}

// ---- submissions: private. The token goes on automatically.
export function fetchSubmissions(): Promise<ApiSubmission[]> {
  return request<ApiSubmission[]>("/api/submissions");
}

export function createSubmission(
  newSubmission: NewSubmission,
): Promise<ApiSubmission> {
  return request<ApiSubmission>("/api/submissions", {
    method: "POST",
    body: JSON.stringify(newSubmission),
  });
}

// ---- auth: the two routes that make a session exist
export function registerUser(body: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiUser> {
  return request<ApiUser>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function loginUser(body: {
  email: string;
  password: string;
}): Promise<AuthReply> {
  return request<AuthReply>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ---- Campus Lost & Found domain API methods:
export function getItems(): Promise<ItemApi[]> {
  return request<ItemApi[]>("/api/items");
}

export function getItem(id: string): Promise<ItemApi> {
  return request<ItemApi>(`/api/items/${encodeURIComponent(id)}`);
}

export function createItem(item: NewItem): Promise<ItemApi> {
  return request<ItemApi>("/api/items", {
    method: "POST",
    body: JSON.stringify(item),
  });
}

// Compatibility types and helper functions for existing dashboard pages
export type Submission = {
  id: string;
  status: "draft" | "submitted" | "graded";
  title: string;
};

export type ClaimApi = Omit<Claim, "claimedAt"> & { claimedAt: string };
export type NewClaim = Omit<ClaimApi, "id">;

export const getUsers = async (): Promise<User[]> => {
  return [
    {
      id: 1,
      name: useAuthStore.getState().userName ?? "Campus Student",
      email: "student@example.com",
      role: "student" as any,
      isActive: true,
      score: 100,
    },
  ];
};

export const getClaims = async (_itemId?: string): Promise<ClaimApi[]> => {
  return [];
};

export const getSubmissions = (): Promise<Submission[]> =>
  request<Submission[]>("/api/submissions").catch(() => []);

export const createClaim = async (claim: NewClaim): Promise<ClaimApi> => {
  return {
    id: "claim-" + Date.now(),
    ...claim,
  };
};
