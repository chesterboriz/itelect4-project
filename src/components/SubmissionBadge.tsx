import React from 'react';
import type { ApiSubmission } from '../types/index';

interface SubmissionBadgeProps {
  submission?: ApiSubmission;
  status?: 'draft' | 'submitted' | 'graded';
}

const statusStyles: Record<'draft' | 'submitted' | 'graded', string> = {
  draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-200',
  submitted: 'bg-sky-100 text-sky-800 dark:bg-sky-900/70 dark:text-sky-200',
  graded: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/70 dark:text-emerald-200',
};

export const SubmissionBadge: React.FC<SubmissionBadgeProps> = ({ submission, status }) => {
  if (submission) {
    return (
      <div>
        <p>Repo: {submission.repoUrl}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Score: {submission.score ?? "Not graded yet"}
        </p>
      </div>
    );
  }

  if (status) {
    return (
      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}
      >
        {status.toUpperCase()}
      </span>
    );
  }

  return null;
};

export default SubmissionBadge;
