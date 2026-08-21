import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getClaims, getItems, getSubmissions, getUsers, createClaim, type NewClaim } from '../api/client';
import { UserCard } from '../components/UserCard';
import { ItemCard } from '../components/ItemCard';
import { ClaimPanel } from '../components/ClaimPanel';
import { SubmissionBadge } from '../components/SubmissionBadge';
import { ClaimStatus } from '../types';
import { useToggle } from '../hooks/useToggle';
import { useUiStore } from '../store/uiStore';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);
  const [darkMode, toggleDarkMode] = useToggle(false);
  const [showClaimPanel, toggleClaimPanel] = useToggle(true);

  const usersQuery = useQuery({ queryKey: ['users'], queryFn: getUsers });
  const itemsQuery = useQuery({ queryKey: ['items'], queryFn: getItems });
  const submissionsQuery = useQuery({ queryKey: ['submissions'], queryFn: getSubmissions });
  const firstItem = itemsQuery.data?.[0];
  const claimsQuery = useQuery({
    queryKey: ['claims', firstItem?.id],
    queryFn: () => getClaims(firstItem?.id),
    enabled: Boolean(firstItem?.id),
  });

  const claimMutation = useMutation({
    mutationFn: (claim: NewClaim) => createClaim(claim),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
    },
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const filteredItems = (itemsQuery.data ?? []).filter((item) => {
    const search = searchTerm.trim().toLowerCase();
    return item.title.toLowerCase().includes(search) || item.locationFound.toLowerCase().includes(search);
  });

  const handleCreateClaim = (): void => {
    if (!firstItem || claimMutation.isPending) return;
    claimMutation.mutate({
      userId: usersQuery.data?.[0]?.id ?? 1,
      itemId: firstItem.id,
      claimReason: 'I can provide identifying details for this item.',
      claimedAt: new Date().toISOString(),
      status: ClaimStatus.Pending,
    });
  };

  if (usersQuery.isLoading || itemsQuery.isLoading || submissionsQuery.isLoading) {
    return <main className="min-h-screen p-10 text-center">Loading campus tracker data...</main>;
  }

  if (usersQuery.isError || itemsQuery.isError || submissionsQuery.isError) {
    return <main className="min-h-screen p-10 text-center text-rose-700">Unable to load dashboard data. Start `npm run api` and refresh.</main>;
  }

  const user = usersQuery.data?.[0];
  const claim = claimsQuery.data?.[0];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Campus Lost & Found</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-slate-50">Campus tracker dashboard</h1>
              <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">API-backed data with React Query and persisted authentication.</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={toggleDarkMode} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
                {darkMode ? 'Light mode' : 'Dark mode'}
              </button>
              <button type="button" onClick={toggleClaimPanel} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-950">
                {showClaimPanel ? 'Hide claim panel' : 'Show claim panel'}
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {user && firstItem ? <div className="space-y-4"><UserCard user={user} /><ItemCard item={firstItem} /></div> : null}

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-semibold">Recent submissions</h2>
            <div className="mt-6 space-y-4">
              {(submissionsQuery.data ?? []).map((submission) => (
                <div key={submission.id} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                  <p className="text-sm font-medium">{submission.title}</p>
                  <SubmissionBadge status={submission.status} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-semibold">Find an item</h2>
            <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search title or location" className="mt-4 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <button type="button" onClick={() => navigate('/items')} className="mt-4 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Browse all items</button>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div><h2 className="text-2xl font-semibold">Matching items</h2><p className="text-sm text-slate-600 dark:text-slate-400">{filteredItems.length} result(s)</p></div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => <ItemCard key={item.id} item={item} />)}
          </div>
        </section>

        {showClaimPanel && claim ? <ClaimPanel claim={claim} /> : null}
        <button type="button" onClick={handleCreateClaim} disabled={claimMutation.isPending} className="self-start rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
          {claimMutation.isPending ? 'Submitting claim...' : 'Submit a new claim'}
        </button>
        {claimMutation.isSuccess ? <p className="text-sm text-emerald-700">Claim submitted and claims refreshed.</p> : null}
      </div>
    </main>
  );
};

export default Dashboard;
