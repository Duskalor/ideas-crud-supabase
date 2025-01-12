export interface Idea {
  completed: boolean;
  created_at: string;
  id: string;
  idea: string;
  user: {
    id: string;
    picture: string;
    full_name: string;
    user_name: string | null;
  };
  userId: string;
}
