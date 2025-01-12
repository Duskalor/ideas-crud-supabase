import { Idea } from '@/inteface/idea.interface';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export const useGetIdeas = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data: ideas, error } = await supabase
      .from('ideas')
      .select('*,user:profiles(*)');
    if (!error) {
      setIdeas([...ideas].reverse());
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('test');
    fetchData();
    const channels = supabase
      .channel('new-ideas')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ideas' },
        (payload) => {
          console.log('Change received!', payload);
          fetchData();
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  return { ideas, loading };
};
