import React, { useState, useCallback } from 'react';
import { Role, User, Event, Language, Resource, Program } from './types';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';

// --- MOCK DATA (Single Source of Truth) ---
const mockEventsData: Event[] = [
    { id: 1, title: 'Mindfulness Meditation Session', description: 'Join us for a guided meditation to de-stress before exams.', date: '2024-08-20T14:00:00Z', location: 'Wellness Center Rm. 3', category: 'workshop' },
    { id: 2, title: 'Campus 5K Fun Run', description: 'A friendly 5K run for all fitness levels. Prizes for top finishers!', date: '2024-09-05T09:00:00Z', location: 'Starts at University Gate', category: 'social' },
    { id: 3, title: 'Guest Speaker: Dr. Anya Sharma', description: 'A seminar on building resilient mental health during your studies.', date: '2024-09-12T18:00:00Z', location: 'Main Auditorium', category: 'seminar' },
    { id: 4, title: 'Weekly HIIT Class', description: 'High-Intensity Interval Training to boost your energy and fitness.', date: '2024-08-22T17:00:00Z', location: 'University Gym', category: 'fitness_class' },
];

const mockLanguagesData: Language[] = [
    { id: 'en', name: 'English' },
    { id: 'hi', name: 'हिन्दी' },
    { id: 'ta', name: 'தமிழ்' },
    { id: 'te', name: 'తెలుగు' },
];

const mockResourcesData: Resource[] = [
  { id: 1, title: 'Campus Counseling Center', description: 'Confidential counseling services for students.', category: 'mental_health', contact: 'counseling@university.edu', phone: '555-1234' },
  { id: 2, title: 'University Gym & Fitness', description: 'State-of-the-art gym facilities and fitness classes.', category: 'fitness' },
  { id: 3, title: 'Student Health Services', description: 'General medical care and health advice.', category: 'general', phone: '555-5678' },
  { id: 4, title: 'Nutritionist Consultations', description: 'Personalized dietary advice and meal planning.', category: 'nutrition', contact: 'nutrition@university.edu' },
  { id: 5, title: 'Mindfulness & Meditation Group', description: 'Weekly guided meditation sessions to reduce stress.', category: 'mental_health' },
];

const mockProgramsData: Program[] = [
  { id: 1, title: '30-Day Fitness Challenge', description: 'A structured daily workout plan to boost your fitness.', duration: '30 Days', category: 'fitness' },
  { id: 2, title: 'Mindful Mornings', description: 'Start your day with guided meditation and mindfulness exercises.', duration: 'Ongoing', category: 'mental_health' },
  { id: 3, title: 'Healthy Eating Habits', description: 'A 6-week program to learn about nutrition and build healthy eating habits.', duration: '6 Weeks', category: 'nutrition' },
  { id: 4, title: 'Digital Detox Workshop', description: 'Learn strategies to reduce screen time and improve focus.', duration: '2 hours', category: 'wellness' },
];
// --- END MOCK DATA ---

const studentUser: User = {
  id: 1,
  name: 'Alex Johnson',
  email: 'alex.j@university.edu',
  role: Role.Student,
  createdAt: new Date().toISOString(),
  language: 'en',
};

const adminUser: User = {
  id: 101,
  name: 'Dr. Evelyn Reed',
  email: 'e.reed@university.edu',
  role: Role.Admin,
  createdAt: new Date().toISOString(),
};

function App() {
  const [currentUser, setCurrentUser] = useState<User>(studentUser);

  // Centralized state for shared data
  const [events, setEvents] = useState<Event[]>(mockEventsData);
  const [languages, setLanguages] = useState<Language[]>(mockLanguagesData);
  const [resources, setResources] = useState<Resource[]>(mockResourcesData);
  const [programs, setPrograms] = useState<Program[]>(mockProgramsData);

  const handleSwitchToAdmin = useCallback(() => {
    setCurrentUser(adminUser);
  }, []);

  const handleSwitchToStudent = useCallback(() => {
    setCurrentUser(studentUser);
  }, []);

  // Handlers to update state
  const handleAddEvent = (newEventData: Omit<Event, 'id'>) => {
    setEvents(prevEvents => [
      ...prevEvents,
      { ...newEventData, id: Date.now() }
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  };

  const handleAddLanguage = (newLanguage: Language) => {
    if (languages.some(lang => lang.id === newLanguage.id)) {
        alert('Language code must be unique.');
        return;
    }
    setLanguages(prevLanguages => [...prevLanguages, newLanguage]);
  };
  
  const handleAddResource = (newResourceData: Omit<Resource, 'id'>) => {
    setResources(prev => [{ ...newResourceData, id: Date.now() }, ...prev]);
  };

  const handleAddProgram = (newProgramData: Omit<Program, 'id'>) => {
    setPrograms(prev => [{ ...newProgramData, id: Date.now() }, ...prev]);
  };


  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-sans transition-colors duration-300">
      {currentUser.role === Role.Admin ? (
        <AdminPanel
          user={currentUser}
          onSwitchToStudent={handleSwitchToStudent}
          events={events}
          languages={languages}
          resources={resources}
          programs={programs}
          onAddEvent={handleAddEvent}
          onAddLanguage={handleAddLanguage}
          onAddResource={handleAddResource}
          onAddProgram={handleAddProgram}
        />
      ) : (
        <Dashboard
          user={currentUser}
          onSwitchToAdmin={handleSwitchToAdmin}
          events={events}
          languages={languages}
          resources={resources}
          programs={programs}
        />
      )}
    </div>
  );
}

export default App;
