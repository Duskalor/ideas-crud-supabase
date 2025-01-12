import { supabase } from './supabase';

export const addIdea = async (idea: { idea: string; userId: string }) => {
  await supabase.from('ideas').insert([idea]);
};

export const deleteIdea = async (id: string) => {
  await supabase.from('ideas').delete().eq('id', id);
};
