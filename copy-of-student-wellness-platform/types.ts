// FIX: Removed circular import and export of 'Role' from itself to resolve declaration conflicts.
export enum Role {
  Student = 'student',
  Admin = 'admin',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  language?: string;
}

export interface WaterData {
  goal: number;
  current: number;
}

export interface Meal {
  id: number;
  name: string;
  calories: number;
  time: string;
}

export interface NutritionData {
  calorieGoal: number;
  meals: Meal[];
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  category: 'mental_health' | 'fitness' | 'nutrition' | 'general';
  contact?: string;
  phone?: string;
}

export interface Program {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: 'fitness' | 'mental_health' | 'nutrition' | 'wellness';
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  isLoading?: boolean;
}

export interface Language {
    id: string;
    name: string;
}

export interface Event {
    id: number;
    title: string;
    description:string;
    date: string;
    location: string;
    category: 'workshop' | 'seminar' | 'fitness_class' | 'social';
}