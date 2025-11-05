import React, { useState, useMemo } from 'react';
import { NutritionData, Meal } from '../types';
import { Apple, Plus } from 'lucide-react';

interface NutritionTrackerProps {
  nutritionData: NutritionData;
  onMealAdd: (newData: NutritionData) => void;
  compact?: boolean;
}

const NutritionTracker: React.FC<NutritionTrackerProps> = ({ nutritionData, onMealAdd, compact = false }) => {
  const { calorieGoal, meals } = nutritionData;
  const [newMealName, setNewMealName] = useState('');
  const [newMealCalories, setNewMealCalories] = useState('');

  const totalCalories = useMemo(() => meals.reduce((sum, meal) => sum + meal.calories, 0), [meals]);
  const percentage = Math.min((totalCalories / calorieGoal) * 100, 100);

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMealName && newMealCalories) {
      const newMeal: Meal = {
        id: Date.now(),
        name: newMealName,
        calories: parseInt(newMealCalories, 10),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      onMealAdd({
        ...nutritionData,
        meals: [...meals, newMeal],
      });
      setNewMealName('');
      setNewMealCalories('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-baseline">
        <p className="font-bold text-4xl text-amber-500">{totalCalories.toLocaleString()} <span className="text-xl text-stone-500 dark:text-stone-400">/ {calorieGoal.toLocaleString()} kcal</span></p>
      </div>
      <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-4">
        <div
          className="bg-amber-500 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {!compact && (
        <>
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Today's Meals</h4>
            <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {meals.map(meal => (
                <li key={meal.id} className="flex justify-between items-center p-2 bg-stone-100 dark:bg-stone-700/50 rounded-md">
                  <div>
                    <p className="font-medium">{meal.name}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">{meal.time}</p>
                  </div>
                  <p className="font-semibold">{meal.calories} kcal</p>
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleAddMeal} className="pt-4 border-t border-stone-200 dark:border-stone-700 space-y-3">
            <h4 className="font-semibold">Add a Meal</h4>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                value={newMealName}
                onChange={(e) => setNewMealName(e.target.value)}
                placeholder="Meal name"
                required
                className="flex-grow p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <input
                type="number"
                value={newMealCalories}
                onChange={(e) => setNewMealCalories(e.target.value)}
                placeholder="Calories"
                required
                className="w-full sm:w-28 p-2 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
             <button type="submit" className="w-full flex items-center justify-center p-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors font-semibold">
                <Plus size={16} className="mr-1" /> Add Meal
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default NutritionTracker;
