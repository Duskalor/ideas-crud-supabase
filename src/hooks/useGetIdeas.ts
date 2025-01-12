import { Idea } from '@/inteface/idea.interface';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export const useGetIdeas = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  // const rerender = useReducer(() => ({}), {})[1];
  const fetchData = async () => {
    const { data: ideas, error } = await supabase
      .from('ideas')
      .select('*,user:profiles(*)');
    if (!error) {
      setIdeas(ideas);
      setLoading(false);
      console.log(ideas);
    }
  };
  useEffect(() => {
    fetchData();

    const channels = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ideas' },
        (payload) => {
          console.log('Change received!', payload);
        }
      )
      .subscribe();
    return () => {
      channels.unsubscribe();
    };
  }, []);

  const addIdea = async (idea: { idea: string; userId: string }) => {
    const { status } = await supabase.from('ideas').insert([idea]);
    if (status === 201) {
      fetchData();
      console.log('revaliando');
    }
  };
  return { ideas, loading, addIdea };
};
