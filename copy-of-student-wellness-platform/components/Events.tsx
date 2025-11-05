import React from 'react';
import { Event } from '../types';
import { Calendar, MapPin, Users, Award, Mic } from 'lucide-react';

const categoryDetails = {
  workshop: { icon: <Users className="text-teal-500" />, color: 'teal' },
  seminar: { icon: <Mic className="text-violet-500" />, color: 'violet' },
  fitness_class: { icon: <Award className="text-amber-500" />, color: 'amber' },
  social: { icon: <Users className="text-emerald-500" />, color: 'emerald' },
};

interface EventsProps {
    events: Event[];
}

const Events: React.FC<EventsProps> = ({ events }) => {
  if (events.length === 0) {
    return (
        <div className="p-6 bg-white dark:bg-stone-800 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
            <div className="flex flex-col items-center justify-center p-10 bg-stone-50 dark:bg-stone-700/50 rounded-lg text-center">
                <Calendar size={48} className="text-stone-400 dark:text-stone-500 mb-4" />
                <p className="font-semibold text-stone-600 dark:text-stone-300">No Upcoming Events</p>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Please check back later for new announcements.</p>
            </div>
        </div>
    );
  }
  
  return (
    <div className="p-6 bg-white dark:bg-stone-800 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => {
            const details = categoryDetails[event.category];
            return (
                 <div key={event.id} className="bg-stone-100 dark:bg-stone-700/50 rounded-xl border border-stone-200 dark:border-stone-700 p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                    <div>
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold text-stone-800 dark:text-white pr-4">{event.title}</h3>
                            <div className={`p-2 bg-${details.color}-100 dark:bg-${details.color}-500/20 rounded-lg`}>
                                {details.icon}
                            </div>
                        </div>
                        <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">{event.description}</p>
                    </div>
                    <div className="text-sm space-y-2 text-stone-500 dark:text-stone-300 border-t border-stone-200 dark:border-stone-600 pt-3 mt-auto">
                        <p className="flex items-center"><Calendar size={14} className="mr-2 flex-shrink-0" /> {new Date(event.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                        <p className="flex items-center"><MapPin size={14} className="mr-2 flex-shrink-0" /> {event.location}</p>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default Events;