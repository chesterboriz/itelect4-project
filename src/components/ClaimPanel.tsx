import React, { useState } from 'react';
import type { Claim } from '../types';

interface ClaimPanelProps {
  claim: Claim;
}

export const ClaimPanel: React.FC<ClaimPanelProps> = ({ claim }) => {
  const [message, setMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  return (
    <section style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h2>Claim</h2>
      <p><strong>Reason:</strong> {claim.claimReason}</p>
      <p><strong>Status:</strong> {claim.status}</p>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type a note"
        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
      />
      <p>Current note: {message || 'None'}</p>
    </section>
  );
};
