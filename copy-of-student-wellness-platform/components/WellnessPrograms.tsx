import React from 'react';
import { Program } from '../types';
import { Target } from 'lucide-react';

const categoryColors = {
  fitness: 'from-amber-500 to-orange-600',
  mental_health: 'from-violet-500 to-purple-600',
  nutrition: 'from-emerald-500 to-green-600',
  wellness: 'from-teal-500 to-cyan-600',
};

interface WellnessProgramsProps {
    programs: Program[];
}

const WellnessPrograms: React.FC<WellnessProgramsProps> = ({ programs }) => {
    if (programs.length === 0) {
        return (
            <div className="p-6 bg-white dark:bg-stone-800 rounded-2xl shadow-lg animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Wellness Programs</h2>
                <div className="flex flex-col items-center justify-center p-10 bg-stone-50 dark:bg-stone-700/50 rounded-lg text-center">
                    <Target size={48} className="text-stone-400 dark:text-stone-500 mb-4" />
                    <p className="font-semibold text-stone-600 dark:text-stone-300">No Wellness Programs Available</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Our team is working on creating new programs for you.</p>
                </div>
            </div>
        );
    }
      
  return (
    <div className="p-6 bg-white dark:bg-stone-800 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Wellness Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map(program => (
          <div key={program.id} className={`p-6 rounded-xl text-white bg-gradient-to-br ${categoryColors[program.category]} shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}>
            <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">{program.duration}</span>
            <h3 className="text-xl font-bold mt-3">{program.title}</h3>
            <p className="text-sm mt-1 opacity-90">{program.description}</p>
            <button className="mt-4 bg-white text-stone-800 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-stone-200 transition-colors">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WellnessPrograms;