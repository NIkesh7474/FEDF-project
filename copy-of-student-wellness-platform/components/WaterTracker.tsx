import React from 'react';
import { WaterData } from '../types';
import { Droplet, Plus, Minus } from 'lucide-react';

interface WaterTrackerProps {
  waterData: WaterData;
  onUpdate: (newData: WaterData) => void;
  compact?: boolean;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ waterData, onUpdate, compact = false }) => {
  const { goal, current } = waterData;
  const percentage = Math.min((current / goal) * 100, 100);

  const handleAdd = () => {
    onUpdate({ ...waterData, current: Math.min(goal, current + 1) });
  };

  const handleRemove = () => {
    onUpdate({ ...waterData, current: Math.max(0, current - 1) });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="font-bold text-4xl text-emerald-500">{current} <span className="text-xl text-stone-500 dark:text-stone-400">/ {goal} glasses</span></p>
        {!compact && (
          <div className="flex space-x-2">
            <button onClick={handleRemove} className="p-2 bg-stone-200 dark:bg-stone-700 rounded-full hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors"><Minus size={16} /></button>
            <button onClick={handleAdd} className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"><Plus size={16} /></button>
          </div>
        )}
      </div>
      <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-4">
        <div
          className="bg-emerald-500 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {!compact && (
        <div className="flex justify-center space-x-2 pt-4">
          {Array.from({ length: goal }).map((_, index) => (
            <Droplet key={index} size={32} className={`transition-colors duration-300 ${index < current ? 'text-emerald-500 fill-current' : 'text-stone-300 dark:text-stone-600'}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WaterTracker;