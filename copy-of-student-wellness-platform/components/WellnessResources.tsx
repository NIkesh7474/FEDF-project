import React, { useState } from 'react';
import { Resource } from '../types';
import { Stethoscope, Brain, Dumbbell, Heart, BookOpen } from 'lucide-react';

const categoryIcons = {
  mental_health: <Brain className="text-violet-500" />,
  fitness: <Dumbbell className="text-amber-500" />,
  nutrition: <Heart className="text-emerald-500" />,
  general: <Stethoscope className="text-teal-500" />,
};

const CATEGORIES = [
    { id: 'all', label: 'All', color: 'emerald'},
    { id: 'mental_health', label: 'Mental Health', color: 'violet'},
    { id: 'fitness', label: 'Fitness', color: 'amber'},
    { id: 'nutrition', label: 'Nutrition', color: 'emerald'},
    { id: 'general', label: 'General', color: 'teal'},
];

interface WellnessResourcesProps {
    resources: Resource[];
}

const WellnessResources: React.FC<WellnessResourcesProps> = ({ resources }) => {
    const [filter, setFilter] = useState<string>('all');
    
    const filteredResources = filter === 'all' 
        ? resources 
        : resources.filter(r => r.category === filter);

  return (
    <div className="p-6 bg-white dark:bg-stone-800 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Wellness Resources</h2>
        <div className="flex flex-wrap gap-2 mb-6 border-b border-stone-200 dark:border-stone-700 pb-4">
            {CATEGORIES.map(cat => (
                 <button 
                    key={cat.id}
                    onClick={() => setFilter(cat.id)} 
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${filter === cat.id ? `bg-${cat.color}-600 text-white` : 'bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600'}`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
      
        {filteredResources.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map(resource => (
                  <div key={resource.id} className="p-4 bg-stone-100 dark:bg-stone-700/50 rounded-xl border border-stone-200 dark:border-stone-700">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-white dark:bg-stone-700 rounded-lg mt-1">
                        {categoryIcons[resource.category]}
                      </div>
                      <div>
                        <h3 className="font-bold text-stone-800 dark:text-white">{resource.title}</h3>
                        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">{resource.description}</p>
                        {resource.contact && <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">Email: {resource.contact}</p>}
                        {resource.phone && <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">Phone: {resource.phone}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
        ) : (
            <div className="flex flex-col items-center justify-center p-10 bg-stone-50 dark:bg-stone-700/50 rounded-lg text-center">
                <BookOpen size={48} className="text-stone-400 dark:text-stone-500 mb-4" />
                <p className="font-semibold text-stone-600 dark:text-stone-300">No Resources Found</p>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">There are no resources available in this category.</p>
            </div>
        )}
    </div>
  );
};

export default WellnessResources;