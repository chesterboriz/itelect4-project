import type { Claim, Item, User } from '../types';

const API_URL = 'http://localhost:3001';

export type Submission = {
  id: string;
  status: 'draft' | 'submitted' | 'graded';
  title: string;
};

export type ItemApi = Omit<Item, 'id'> & { id: string };
export type ClaimApi = Omit<Claim, 'claimedAt'> & { claimedAt: string };
export type NewClaim = Omit<ClaimApi, 'id'>;

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const getUsers = (): Promise<User[]> => request<User[]>('/users');
export const getItems = (): Promise<ItemApi[]> => request<ItemApi[]>('/items');
export const getItem = (id: string): Promise<ItemApi> => request<ItemApi>(`/items/${encodeURIComponent(id)}`);
export const getClaims = (itemId?: string): Promise<ClaimApi[]> =>
  request<ClaimApi[]>(itemId ? `/claims?itemId=${encodeURIComponent(itemId)}` : '/claims');
export const getSubmissions = (): Promise<Submission[]> => request<Submission[]>('/submissions');
export const createClaim = (claim: NewClaim): Promise<ClaimApi> =>
  request<ClaimApi>('/claims', { method: 'POST', body: JSON.stringify(claim) });
