import React, { useState } from 'react';
import { User, WaterData, NutritionData, Language, Event, Resource, Program } from '../types';
import WaterTracker from './WaterTracker';
import NutritionTracker from './NutritionTracker';
import ChatBot from './ChatBot';
import WellnessResources from './WellnessResources';
import WellnessPrograms from './WellnessPrograms';
import Events from './Events';
import { BarChart, Droplet, Apple, BookOpen, Target, MessageSquare, UserCog, Calendar, Globe } from 'lucide-react';

interface DashboardProps {
  user: User;
  onSwitchToAdmin: () => void;
  events: Event[];
  languages: Language[];
  resources: Resource[];
  programs: Program[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, onSwitchToAdmin, events, languages, resources, programs }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userLanguage, setUserLanguage] = useState(user.language || 'en');

  const [waterData, setWaterData] = useState<WaterData>({ goal: 8, current: 3 });
  const [nutritionData, setNutritionData] = useState<NutritionData>({
    calorieGoal: 2000,
    meals: [
      { id: 1, name: 'Oatmeal', calories: 350, time: '8 AM' },
      { id: 2, name: 'Chicken Salad', calories: 550, time: '1 PM' },
    ],
  });

  const handleWaterUpdate = (newWaterData: WaterData) => {
    setWaterData(newWaterData);
  };

  const handleMealAdd = (newNutritionData: NutritionData) => {
    setNutritionData(newNutritionData);
  };

  const TABS = [
    { id: 'overview', label: 'Overview', icon: BarChart },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'programs', label: 'Programs', icon: Target },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'nutrition', label: 'Nutrition', icon: Apple },
    { id: 'water', label: 'Hydration', icon: Droplet },
    { id: 'chat', label: 'Support Chat', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
            <div className="lg:col-span-2 xl:col-span-1 p-6 bg-white dark:bg-stone-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4 text-stone-800 dark:text-white flex items-center"><Droplet className="mr-2 text-emerald-500" /> Today's Hydration</h3>
              <WaterTracker waterData={waterData} onUpdate={handleWaterUpdate} compact={true} />
            </div>
            <div className="lg:col-span-2 xl:col-span-1 p-6 bg-white dark:bg-stone-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4 text-stone-800 dark:text-white flex items-center"><Apple className="mr-2 text-amber-500" /> Nutrition Summary</h3>
              <NutritionTracker nutritionData={nutritionData} onMealAdd={handleMealAdd} compact={true} />
            </div>
            <div className="p-6 bg-white dark:bg-stone-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4 text-stone-800 dark:text-white">🚀 Quick Access</h3>
              <div className="flex flex-col space-y-3">
                <button onClick={() => setActiveTab('resources')} className="w-full text-left p-3 bg-stone-100 dark:bg-stone-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg transition-colors duration-200">Health Resources</button>
                <button onClick={() => setActiveTab('programs')} className="w-full text-left p-3 bg-stone-100 dark:bg-stone-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg transition-colors duration-200">Wellness Programs</button>
                <button onClick={() => setActiveTab('chat')} className="w-full text-left p-3 bg-stone-100 dark:bg-stone-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg transition-colors duration-200">Get Support</button>
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-stone-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4 text-stone-800 dark:text-white">📞 Emergency Contacts</h3>
              <div className="space-y-2 text-stone-600 dark:text-stone-300">
                <p><strong>Counseling:</strong> +1-555-0123</p>
                <p><strong>Health Center:</strong> +1-555-0124</p>
                <p><strong>Nutrition:</strong> +1-555-0125</p>
              </div>
            </div>
          </div>
        );
      case 'resources': return <WellnessResources resources={resources} />;
      case 'programs': return <WellnessPrograms programs={programs} />;
      case 'events': return <Events events={events} />;
      case 'water': return <div className="p-6 bg-white dark:bg-stone-800 rounded-xl shadow-lg"><WaterTracker waterData={waterData} onUpdate={handleWaterUpdate} /></div>;
      case 'nutrition': return <div className="p-6 bg-white dark:bg-stone-800 rounded-xl shadow-lg"><NutritionTracker nutritionData={nutritionData} onMealAdd={handleMealAdd} /></div>;
      case 'chat': return <ChatBot language={userLanguage} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm p-6 flex-shrink-0 flex flex-col justify-between border-r border-stone-200 dark:border-stone-700">
        <div>
          <div className="flex items-center mb-10">
             <span className="text-3xl mr-2">🌿</span>
             <h1 className="text-xl font-bold text-stone-800 dark:text-white">Wellness</h1>
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
           <button onClick={onSwitchToAdmin} className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-stone-200 dark:hover:bg-stone-700">
             <UserCog className="h-5 w-5" />
             <span>Admin Panel</span>
           </button>
        </div>
      </nav>

      <main className="flex-1 p-8 overflow-y-auto bg-stone-100 dark:bg-stone-900">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-stone-800 dark:text-white">Hello, {user.name.split(' ')[0]}!</h2>
            <p className="text-stone-500 dark:text-stone-400">Welcome back to your wellness dashboard.</p>
          </div>
          <div className="flex items-center space-x-4">
             <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                <select 
                    value={userLanguage} 
                    onChange={(e) => setUserLanguage(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 rounded-lg appearance-none focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                    {languages.map(lang => (
                        <option key={lang.id} value={lang.id}>{lang.name}</option>
                    ))}
                </select>
             </div>
             <span className="px-3 py-1 text-sm font-semibold text-emerald-800 bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-200 rounded-full">{user.role}</span>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
