import React, { useEffect, useState } from 'react';
import { UserCard } from './components/UserCard';
import { ItemCard } from './components/ItemCard';
import { ClaimPanel } from './components/ClaimPanel';
import CourseCard from './components/CourseCard';
import { SubmissionBadge } from './components/SubmissionBadge';
import { User, Item, Claim, Course, Role, ClaimStatus } from './types';
import { useToggle } from './hooks';

type SubmissionItem = {
  id: string;
  status: 'draft' | 'submitted' | 'graded';
  title: string;
};

const mockApiFetch = (): Promise<{ user: User; item: Item; claim: Claim; courses: Course[]; submissions: SubmissionItem[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user: User = {
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
        userId: user.id,
        itemId: item.id,
        claimReason: 'This wallet matches my description',
        claimedAt: new Date().toISOString(),
        status: ClaimStatus.Pending,
      };

      const courses: Course[] = [
        {
          id: 'course-001',
          code: 'CS-101',
          title: 'Introduction to Campus Safety',
          units: 3,
          semester: 'Fall 2026',
          instructor: 'Prof. Rivera',
          isOpen: true,
        },
        {
          id: 'course-002',
          code: 'LF-202',
          title: 'Lost and Found Management',
          units: 4,
          semester: 'Fall 2026',
          instructor: 'Dr. Chen',
          isOpen: false,
        },
        {
          id: 'course-003',
          code: 'SS-320',
          title: 'Student Services Workshop',
          units: 2,
          semester: 'Winter 2027',
          instructor: 'Dr. Liao',
          isOpen: true,
        },
      ];

      const submissions: SubmissionItem[] = [
        { id: 'sub-001', status: 'submitted', title: 'Lost Wallet Report' },
        { id: 'sub-002', status: 'graded', title: 'Documentation Review' },
        { id: 'sub-003', status: 'draft', title: 'Claim Follow-Up' },
      ];

      resolve({ user, item, claim, courses, submissions });
    }, 250);
  });
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [item, setItem] = useState<Item | null>(null);
  const [claim, setClaim] = useState<Claim | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, toggleDarkMode] = useToggle(false);
  const [showClaimPanel, toggleClaimPanel] = useToggle(true);

  useEffect(() => {
    const loadMockData = async (): Promise<void> => {
      try {
        const response = await mockApiFetch();
        setUser(response.user);
        setItem(response.item);
        setClaim(response.claim);
        setCourses(response.courses);
        setSubmissions(response.submissions);
      } catch (loadError) {
        setError('Unable to load the dashboard data. Please refresh.');
      } finally {
        setLoading(false);
      }
    };

    loadMockData();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = courses.filter((course) => {
    const lowerSearch = searchTerm.trim().toLowerCase();
    return (
      course.title.toLowerCase().includes(lowerSearch) ||
      course.semester.toLowerCase().includes(lowerSearch) ||
      (course.instructor ?? '').toLowerCase().includes(lowerSearch)
    );
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-center gap-4 text-slate-600 dark:text-slate-300">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400" />
            <div className="text-left">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Loading dashboard</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-slate-100">Preparing your campus tracker...</h1>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-4 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>

          <p className="mt-8 text-slate-600 dark:text-slate-400">Hang tight — your mock data is being fetched and rendered dynamically.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-rose-200 bg-rose-50 p-10 shadow-lg dark:border-rose-700 dark:bg-rose-900/80">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200">
            <span className="text-2xl font-bold">!</span>
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-rose-900 dark:text-rose-100">Something went wrong</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 inline-flex rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Campus Lost & Found</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-slate-50">Campus tracker dashboard</h1>
              <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">Styled with Tailwind, rendered from hooks, and responsive across breakpoints.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleDarkMode}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {darkMode ? 'Light mode' : 'Dark mode'}
              </button>
              <button
                type="button"
                onClick={toggleClaimPanel}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
              >
                {showClaimPanel ? 'Hide claim panel' : 'Show claim panel'}
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {user && item ? (
            <div className="space-y-4">
              <UserCard user={user} />
              <ItemCard item={item} />
            </div>
          ) : null}

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Recent submissions</h2>
            <div className="mt-6 space-y-4">
              {submissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{submission.title}</p>
                  <SubmissionBadge status={submission.status} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Course search</h2>
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search course title, semester, or instructor"
              className="mt-4 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-700"
            />
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Search is powered by a typed onChange handler and live filters.</p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-slate-50">Available courses</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Results update automatically from state and respond to small and large screens.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {filteredCourses.length} results
            </span>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} variant={index === 0 ? 'default' : 'compact'} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-50">No matches found</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Try a different keyword or clear the search to see all courses.</p>
            </div>
          )}
        </section>

        {showClaimPanel && claim ? <ClaimPanel claim={claim} /> : null}
      </div>
    </main>
  );
};

export default App;
