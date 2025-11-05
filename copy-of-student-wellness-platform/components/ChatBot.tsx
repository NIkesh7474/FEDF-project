import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getBotResponse } from '../services/geminiService';
import { Send, Bot, User, Loader } from 'lucide-react';

interface ChatBotProps {
    language: string;
}

const greetings: { [key: string]: string } = {
    en: "Hello! How can I help you with your wellness today?",
    hi: "नमस्ते! मैं आज आपकी सेहत के लिए कैसे मदद कर सकता हूँ?",
    ta: "வணக்கம்! இன்று உங்கள் நலவாழ்வுக்கு நான் எப்படி உதவ முடியும்?",
    te: "నమస్కారం! ఈ రోజు మీ శ్రేయస్సు కోసం నేను ఎలా సహాయపడగలను?",
};

const ChatBot: React.FC<ChatBotProps> = ({ language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
     setMessages([{ id: Date.now(), text: greetings[language] || greetings['en'], sender: 'bot' }]);
  }, [language]);

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const chatHistory = messages.map(m => `${m.sender}: ${m.text}`).join('\n');

    try {
      const botResponseText = await getBotResponse(chatHistory, input, language);
      const botMessage: ChatMessage = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { id: Date.now() + 1, text: "Sorry, something went wrong.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] bg-white dark:bg-stone-800 rounded-2xl shadow-2xl animate-fade-in">
      <div className="p-4 border-b border-stone-200 dark:border-stone-700">
        <h2 className="text-xl font-bold flex items-center">
          <Bot className="mr-2 text-emerald-500" /> Wellness Support Chat
        </h2>
      </div>
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0"><Bot size={20} className="text-white"/></div>}
            <div className={`max-w-md px-4 py-3 rounded-2xl ${msg.sender === 'user' ? 'bg-emerald-500 text-white rounded-br-none' : 'bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-bl-none'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
             {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-stone-300 dark:bg-stone-600 flex items-center justify-center flex-shrink-0"><User size={20}/></div>}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-end gap-2 justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0"><Bot size={20} className="text-white"/></div>
              <div className="max-w-md px-4 py-3 rounded-2xl bg-stone-200 dark:bg-stone-700">
                  <Loader className="animate-spin text-stone-500" size={20} />
              </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-stone-200 dark:border-stone-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about wellness..."
            className="w-full p-3 bg-stone-100 dark:bg-stone-700 rounded-xl border border-transparent focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:bg-emerald-300 dark:disabled:bg-emerald-800 disabled:cursor-not-allowed transition-colors">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
