import { Idea } from '@/inteface/idea.interface';
import { Session } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

interface AuthContext {
  session: Session;
  loading: boolean;
  logout: () => Promise<void>;
  addIdea: (idea: Idea) => Promise<void>;
}

export const authContext = createContext<AuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(authContext);
  if (context === null) {
    throw new Error('useAuth must be used within a AuthContextProvider');
  }
  return context;
};
