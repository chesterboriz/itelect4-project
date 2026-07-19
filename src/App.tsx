import React from 'react';
import { UserCard } from './components/UserCard';
import { ItemCard } from './components/ItemCard';
import { ClaimPanel } from './components/ClaimPanel';
import { User, Item, Claim, Role, ClaimStatus } from './types';

const student: User = {
  id: 1,
  name: 'Chester Boriz Macalintal',
  email: 'chester@example.com',
  role: Role.Student,
  isActive: true,
  score: 95.5,
};

const item: Item = {
  id: 'item-101',
  title: 'Black Wallet',
  category: 'Personal Item',
  locationFound: 'Library Lobby',
  description: 'Contains student ID and cash',
  status: 'reported',
  isClaimed: false,
};

const claim: Claim = {
  id: 'claim-001',
  userId: student.id,
  itemId: item.id,
  claimReason: 'This wallet matches my description',
  claimedAt: new Date().toISOString(),
  status: ClaimStatus.Pending,
};

const App: React.FC = () => {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Campus Lost & Found Tracker</h1>
      <p>Typed React components built from the GT1-style app models.</p>

      <UserCard user={student} />
      <ItemCard item={item} />
      <ClaimPanel claim={claim} />
    </main>
  );
};

export default App;
