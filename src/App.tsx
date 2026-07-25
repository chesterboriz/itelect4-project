import React, { useEffect, useState } from 'react';
import { UserCard } from './components/UserCard';
import { ItemCard } from './components/ItemCard';
import { ClaimPanel } from './components/ClaimPanel';
import { User, Item, Claim, Course, Role, ClaimStatus } from './types';
import { useToggle } from './hooks';

const mockApiFetch = (): Promise<{ user: User; item: Item; claim: Claim; courses: Course[] }> => {
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
          title: 'Introduction to Campus Safety',
          units: 3,
          semester: 'Fall 2026',
          instructor: 'Prof. Rivera',
          isOpen: true,
        },
        {
          id: 'course-002',
          title: 'Lost and Found Management',
          units: 4,
          semester: 'Fall 2026',
          instructor: 'Dr. Chen',
          isOpen: false,
        },
        {
          id: 'course-003',
          title: 'Student Services Workshop',
          units: 2,
          semester: 'Winter 2027',
          instructor: 'Dr. Liao',
          isOpen: true,
        },
      ];

      resolve({ user, item, claim, courses });
    }, 250);
  });
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [item, setItem] = useState<Item | null>(null);
  const [claim, setClaim] = useState<Claim | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [showClaimPanel, toggleClaimPanel] = useToggle(true);

  useEffect(() => {
    const loadMockData = async (): Promise<void> => {
      const response = await mockApiFetch();
      setUser(response.user);
      setItem(response.item);
      setClaim(response.claim);
      setCourses(response.courses);
      setLoading(false);
    };

    loadMockData();
  }, []);

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

  if (loading || user === null || item === null || claim === null) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1>Campus Lost & Found Tracker</h1>
        <p>Loading mock data...</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Campus Lost & Found Tracker</h1>
      <p>Typed React components built from the GT1-style app models.</p>

      <UserCard user={user} />
      <ItemCard item={item} />
      <button
        type="button"
        onClick={toggleClaimPanel}
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}
      >
        {showClaimPanel ? 'Hide Claim Panel' : 'Show Claim Panel'}
      </button>
      {showClaimPanel && <ClaimPanel claim={claim} />}

      <section style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '2rem' }}>
        <h2>Courses</h2>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search courses"
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />

        {filteredCourses.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredCourses.map((course) => (
              <li
                key={course.id}
                style={{
                  border: '1px solid #ddd',
                  marginBottom: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: '4px',
                }}
              >
                <strong>{course.title}</strong>
                <p style={{ margin: '0.25rem 0' }}>
                  {course.units} units — {course.semester}
                </p>
                <p style={{ margin: 0 }}>
                  Instructor: {course.instructor ?? 'TBA'} • {course.isOpen ? 'Open' : 'Closed'}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No courses match your search.</p>
        )}
      </section>
    </main>
  );
};

export default App;
