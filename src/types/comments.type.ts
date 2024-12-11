import { Tables } from '@/types/supabase';

type UserComment = {
  id: string;
  content: string;
  updated_at: string;
}[];

export type UserComments = {
  comments: UserComment;
  comments_total_count: number;
  house: Tables<'house'> & {
    user_id: string;
    user_name: string;
    user_nickname: string;
  };
  house_id: string;
}[];
