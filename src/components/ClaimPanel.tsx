import React, { useRef, useState } from 'react';
import type { Claim } from '../types';
import { usePrevious, useToggle } from '../hooks';

interface ClaimPanelProps {
  claim: Claim;
}

export const ClaimPanel: React.FC<ClaimPanelProps> = ({ claim }) => {
  const [message, setMessage] = useState<string>('');
  const [followUp, setFollowUp] = useState<string>('');
  const [isExpanded, toggleExpanded] = useToggle(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previousMessage = usePrevious<string>(message);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  const handleFollowUpChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFollowUp(event.target.value);
  };

  const handleToggleExpanded = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    toggleExpanded();
  };

  const handleFocusButton = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    inputRef.current?.focus();
  };

  const handleNoteKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputRef.current?.blur();
    }
  };

  return (
    <section style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h2>Claim</h2>
      <button
        type="button"
        onClick={handleToggleExpanded}
        style={{ marginBottom: '0.75rem', padding: '0.4rem 0.7rem' }}
      >
        {isExpanded ? 'Collapse details' : 'Expand details'}
      </button>

      {isExpanded && (
        <>
          <p><strong>Reason:</strong> {claim.claimReason}</p>
          <p><strong>Status:</strong> {claim.status}</p>
          <p><strong>Claimed At:</strong> {new Date(claim.claimedAt).toLocaleString()}</p>
        </>
      )}

      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={handleChange}
        onKeyDown={handleNoteKeyDown}
        placeholder="Type a note"
        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
      />
      <input
        type="text"
        value={followUp}
        onChange={handleFollowUpChange}
        placeholder="Type a follow-up note"
        style={{ width: '100%', padding: '0.5rem', marginTop: '0.75rem' }}
      />
      <div style={{ marginTop: '0.75rem' }}>
        <button type="button" onClick={handleFocusButton} style={{ marginRight: '0.5rem' }}>
          Focus note input
        </button>
        <span>Current note: {message || 'None'}</span>
      </div>
      <p style={{ marginTop: '0.5rem', color: '#555' }}>
        Previous note: {previousMessage || 'None'}
      </p>
      <p style={{ marginTop: '0.25rem', color: '#555' }}>
        Follow-up note: {followUp || 'None'}
      </p>
    </section>
  );
};
