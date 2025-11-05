import React, { useState, useEffect } from 'react';
import { User, Role, Event, Language, Resource, Program } from '../types';
import { BarChart, PlusSquare, Target, Users, UserCheck, CalendarPlus, LanguagesIcon } from 'lucide-react';

interface AdminPanelProps {
  user: User;
  onSwitchToStudent: () => void;
  events: Event[];
  languages: Language[];
  resources: Resource[];
  programs: Program[];
  onAddEvent: (event: Omit<Event, 'id'>) => void;
  onAddLanguage: (language: Language) => void;
  onAddResource: (resource: Omit<Resource, 'id'>) => void;
  onAddProgram: (program: Omit<Program, 'id'>) => void;
}

const mockUsers: User[] = [
  { id: 1, name: 'Alex Johnson', email: 'alex.j@university.edu', role: Role.Student, createdAt: '2023-09-01T10:00:00Z' },
  { id: 2, name: 'Maria Garcia', email: 'maria.g@university.edu', role: Role.Student, createdAt: '2023-09-02T11:30:00Z' },
  { id: 3, name: 'Chen Wei', email: 'chen.w@university.edu', role: Role.Student, createdAt: '2023-09-03T09:15:00Z' },
];


const AdminPanel: React.FC<AdminPanelProps> = ({ 
    user, 
    onSwitchToStudent,
    events,
    languages,
    resources,
    programs,
    onAddEvent,
    onAddLanguage,
    onAddResource,
    onAddProgram,
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState<User[]>([]);

  // State for new event form
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  const [newEventCategory, setNewEventCategory] = useState<'workshop' | 'seminar' | 'fitness_class' | 'social'>('workshop');
  
  // State for new language form
  const [newLanguageName, setNewLanguageName] = useState('');
  const [newLanguageCode, setNewLanguageCode] = useState('');

  // State for new resource form
  const [newResourceTitle, setNewResourceTitle] = useState('');
  const [newResourceDescription, setNewResourceDescription] = useState('');
  const [newResourceCategory, setNewResourceCategory] = useState<'mental_health' | 'fitness' | 'nutrition' | 'general'>('mental_health');
  const [newResourceContact, setNewResourceContact] = useState('');
  const [newResourcePhone, setNewResourcePhone] = useState('');

  // State for new program form
  const [newProgramTitle, setNewProgramTitle] = useState('');
  const [newProgramDescription, setNewProgramDescription] = useState('');
  const [newProgramDuration, setNewProgramDuration] = useState('');
  const [newProgramCategory, setNewProgramCategory] = useState<'fitness' | 'mental_health' | 'nutrition' | 'wellness'>('fitness');


  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDescription || !newEventDate || !newEventLocation) return;
    onAddEvent({
      title: newEventTitle,
      description: newEventDescription,
      date: new Date(newEventDate).toISOString(),
      location: newEventLocation,
      category: newEventCategory,
    });
    setNewEventTitle('');
    setNewEventDescription('');
    setNewEventDate('');
    setNewEventLocation('');
    setNewEventCategory('workshop');
  };

  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLanguageName || !newLanguageCode) return;
    onAddLanguage({
      id: newLanguageCode,
      name: newLanguageName,
    });
    setNewLanguageName('');
    setNewLanguageCode('');
  };

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResourceTitle || !newResourceDescription) return;
    onAddResource({
        title: newResourceTitle,
        description: newResourceDescription,
        category: newResourceCategory,
        contact: newResourceContact || undefined,
        phone: newResourcePhone || undefined,
    });
    setNewResourceTitle('');
    setNewResourceDescription('');
    setNewResourceCategory('mental_health');
    setNewResourceContact('');
    setNewResourcePhone('');
  };

  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgramTitle || !newProgramDescription || !newProgramDuration) return;
    onAddProgram({
        title: newProgramTitle,
        description: newProgramDescription,
        duration: newProgramDuration,
        category: newProgramCategory,
    });
    setNewProgramTitle('');
    setNewProgramDescription('');
    setNewProgramDuration('');
    setNewProgramCategory('fitness');
  };

  const TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart },
    { id: 'resources', label: 'Add Resource', icon: PlusSquare },
    { id: 'programs', label: 'Add Program', icon: Target },
    { id: 'events', label: 'Events', icon: CalendarPlus },
    { id: 'languages', label: 'Languages', icon: LanguagesIcon },
    { id: 'users', label: 'Users', icon: Users },
  ];
  
  const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color: string }> = ({ icon, label, value, color }) => (
    <div className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-md flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-3xl font-bold text-stone-800 dark:text-white">{value}</p>
            <p className="text-stone-500 dark:text-stone-400">{label}</p>
        </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
            <div className="space-y-8 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard icon={<Users className="text-white" />} label="Total Users" value={users.length} color="bg-emerald-500" />
                    <StatCard icon={<CalendarPlus className="text-white" />} label="Upcoming Events" value={events.length} color="bg-violet-500" />
                    <StatCard icon={<Target className="text-white" />} label="Wellness Programs" value={programs.length} color="bg-amber-500" />
                    <StatCard icon={<PlusSquare className="text-white" />} label="Wellness Resources" value={resources.length} color="bg-teal-500" />
                </div>
                 <div className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => setActiveTab('events')} className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors">Add New Event</button>
                        <button onClick={() => setActiveTab('programs')} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">Add New Program</button>
                        <button onClick={() => setActiveTab('resources')} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">Add New Resource</button>
                        <button onClick={() => setActiveTab('users')} className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">View Users</button>
                    </div>
                </div>
            </div>
        );
      case 'resources':
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
                <div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Add Wellness Resource</h2>
                    <form onSubmit={handleAddResource} className="space-y-4">
                        <div><label className="block mb-1 font-semibold">Title *</label><input type="text" value={newResourceTitle} onChange={e => setNewResourceTitle(e.target.value)} required className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-emerald-500 outline-none" /></div>
                        <div><label className="block mb-1 font-semibold">Description *</label><textarea value={newResourceDescription} onChange={e => setNewResourceDescription(e.target.value)} required rows={3} className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-emerald-500 outline-none"></textarea></div>
                        <div><label className="block mb-1 font-semibold">Category *</label><select value={newResourceCategory} onChange={e => setNewResourceCategory(e.target.value as any)} className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-emerald-500 outline-none"><option value="mental_health">Mental Health</option><option value="fitness">Fitness</option><option value="nutrition">Nutrition</option><option value="general">General Health</option></select></div>
                        <div><label className="block mb-1 font-semibold">Contact Email</label><input type="email" value={newResourceContact} onChange={e => setNewResourceContact(e.target.value)} className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-emerald-500 outline-none" /></div>
                        <div><label className="block mb-1 font-semibold">Phone</label><input type="tel" value={newResourcePhone} onChange={e => setNewResourcePhone(e.target.value)} className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-emerald-500 outline-none" /></div>
                        <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold">Add Resource</button>
                    </form>
                </div>
                 <div className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Existing Resources</h2>
                    <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {resources.map(resource => (
                            <li key={resource.id} className="p-4 bg-stone-100 dark:bg-stone-700/50 rounded-lg">
                                <p className="font-bold">{resource.title}</p>
                                <p className="text-sm text-stone-500 dark:text-stone-400">{resource.description}</p>
                                <span className="text-xs font-semibold mt-2 inline-block px-2 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">{resource.category.replace('_', ' ')}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
      case 'programs':
         return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
                <div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Add Wellness Program</h2>
                    <form onSubmit={handleAddProgram} className="space-y-4">
                        <div><label className="block mb-1 font-semibold">Title *</label><input type="text" value={newProgramTitle} onChange={e => setNewProgramTitle(e.target.value)} required className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-amber-500 outline-none" /></div>
                        <div><label className="block mb-1 font-semibold">Description *</label><textarea value={newProgramDescription} onChange={e => setNewProgramDescription(e.target.value)} required rows={3} className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-amber-500 outline-none"></textarea></div>
                        <div><label className="block mb-1 font-semibold">Duration *</label><input type="text" value={newProgramDuration} onChange={e => setNewProgramDuration(e.target.value)} placeholder="e.g., 30 days, 12 weeks" required className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-amber-500 outline-none" /></div>
                        <div><label className="block mb-1 font-semibold">Category *</label><select value={newProgramCategory} onChange={e => setNewProgramCategory(e.target.value as any)} className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-amber-500 outline-none"><option value="fitness">Fitness</option><option value="mental_health">Mental Health</option><option value="nutrition">Nutrition</option><option value="wellness">General Wellness</option></select></div>
                        <button type="submit" className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold">Add Program</button>
                    </form>
                </div>
                 <div className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Existing Programs</h2>
                    <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {programs.map(program => (
                            <li key={program.id} className="p-4 bg-stone-100 dark:bg-stone-700/50 rounded-lg">
                                <p className="font-bold">{program.title}</p>
                                <p className="text-sm text-stone-500 dark:text-stone-400">{program.description}</p>
                                <div className="mt-2 flex justify-between items-center text-xs">
                                    <span className="font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">{program.category.replace('_', ' ')}</span>
                                    <span className="text-stone-500 dark:text-stone-400 font-medium">{program.duration}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
        case 'events':
         return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
                <div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
                    <form onSubmit={handleAddEvent} className="space-y-4">
                        <div><label className="block mb-1 font-semibold">Event Title *</label><input type="text" value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} required className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-violet-500 outline-none" /></div>
                        <div><label className="block mb-1 font-semibold">Description *</label><textarea value={newEventDescription} onChange={(e) => setNewEventDescription(e.target.value)} required rows={3} className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-violet-500 outline-none"></textarea></div>
                        <div className="flex space-x-4"><div className="w-1/2"><label className="block mb-1 font-semibold">Date & Time *</label><input type="datetime-local" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} required className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-violet-500 outline-none" /></div><div className="w-1/2"><label className="block mb-1 font-semibold">Location *</label><input type="text" value={newEventLocation} onChange={(e) => setNewEventLocation(e.target.value)} required placeholder="e.g., Main Quad" className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-violet-500 outline-none" /></div></div>
                        <div><label className="block mb-1 font-semibold">Category *</label><select value={newEventCategory} onChange={(e) => setNewEventCategory(e.target.value as any)} className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-violet-500 outline-none"><option value="workshop">Workshop</option><option value="seminar">Seminar</option><option value="fitness_class">Fitness Class</option><option value="social">Social</option></select></div>
                        <button type="submit" className="px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors font-semibold">Create Event</button>
                    </form>
                </div>
                 <div className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
                     <ul className="space-y-4  max-h-[60vh] overflow-y-auto pr-2">
                        {events.map(event => (
                            <li key={event.id} className="p-4 bg-stone-100 dark:bg-stone-700/50 rounded-lg">
                                <p className="font-bold">{event.title}</p>
                                <p className="text-sm text-stone-500 dark:text-stone-400">{new Date(event.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })} @ {event.location}</p>
                            </li>
                        ))}
                     </ul>
                </div>
            </div>
        );
        case 'languages':
            return (
                <div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-lg animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">Manage Languages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Supported Languages</h3>
                            <table className="w-full text-left">
                                <thead className="border-b border-stone-200 dark:border-stone-700">
                                <tr><th className="p-2">Name</th><th className="p-2">Code</th></tr>
                                </thead>
                                <tbody>
                                    {languages.map(lang => (
                                    <tr key={lang.id} className="border-b border-stone-200 dark:border-stone-700">
                                        <td className="p-2">{lang.name}</td>
                                        <td className="p-2 font-mono text-stone-500">{lang.id}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <form onSubmit={handleAddLanguage} className="space-y-4">
                             <h3 className="text-xl font-semibold">Add New Language</h3>
                            <div><label className="block mb-1 font-semibold">Language Name *</label><input type="text" value={newLanguageName} onChange={(e) => setNewLanguageName(e.target.value)} required placeholder="e.g., French" className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-emerald-500 outline-none" /></div>
                            <div><label className="block mb-1 font-semibold">Language Code *</label><input type="text" value={newLanguageCode} onChange={(e) => setNewLanguageCode(e.target.value)} required placeholder="e.g., fr" className="w-full p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-emerald-500 outline-none" /></div>
                             <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold">Add Language</button>
                        </form>
                    </div>
                </div>
            );
      case 'users':
        return (
          <div className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-lg animate-fade-in overflow-x-auto">
            <h2 className="text-2xl font-bold mb-6">Registered Users</h2>
            <table className="w-full text-left">
              <thead className="border-b border-stone-200 dark:border-stone-700">
                <tr>
                  <th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700/50">
                    <td className="p-4 font-medium">{u.name}</td>
                    <td className="p-4 text-stone-500 dark:text-stone-400">{u.email}</td>
                    <td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${u.role === Role.Admin ? 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'}`}>{u.role}</span></td>
                    <td className="p-4 text-stone-500 dark:text-stone-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm p-6 flex-shrink-0 flex flex-col justify-between border-r border-stone-200 dark:border-stone-700">
        <div>
          <div className="flex items-center mb-10">
            <span className="text-3xl mr-2">🛠️</span>
            <h1 className="text-xl font-bold text-stone-800 dark:text-white">Admin</h1>
          </div>
          <ul className="space-y-2">
            {TABS.map(tab => (
              <li key={tab.id}>
                <button
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-stone-200 dark:hover:bg-stone-700'}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
           <button onClick={onSwitchToStudent} className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-stone-200 dark:hover:bg-stone-700">
             <UserCheck className="h-5 w-5" />
             <span>Student View</span>
           </button>
        </div>
      </nav>

      <main className="flex-1 p-8 overflow-y-auto bg-stone-100 dark:bg-stone-900">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-stone-800 dark:text-white">Admin Dashboard</h2>
            <p className="text-stone-500 dark:text-stone-400">Welcome, {user.name}.</p>
          </div>
          <div className="flex items-center space-x-4">
             <span className="px-3 py-1 text-sm font-semibold text-rose-800 bg-rose-100 dark:bg-rose-900 dark:text-rose-200 rounded-full">{user.role}</span>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPanel;
