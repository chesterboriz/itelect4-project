import React from 'react';

interface SubmissionBadgeProps {
  status: 'draft' | 'submitted' | 'graded';
}

const statusStyles: Record<SubmissionBadgeProps['status'], string> = {
  draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-200',
  submitted: 'bg-sky-100 text-sky-800 dark:bg-sky-900/70 dark:text-sky-200',
  graded: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/70 dark:text-emerald-200',
};

export const SubmissionBadge: React.FC<SubmissionBadgeProps> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
};
