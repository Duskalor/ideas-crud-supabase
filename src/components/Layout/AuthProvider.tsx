import { supabase } from '@/lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Session } from '@supabase/supabase-js';
import { ReactNode, useEffect, useState } from 'react';
import { authContext } from '@/context/authcontex';

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <section className='flex items-center justify-center h-screen '>
        <div className=' border-2 border-gray-500 p-5 rounded-lg [&>div>form]:text-white '>
          <Auth
            providers={['github', 'google']}
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
          />
        </div>
      </section>
    );
  }

  return (
    <authContext.Provider value={{ session, loading, logout }}>
      {children}
    </authContext.Provider>
  );
};
