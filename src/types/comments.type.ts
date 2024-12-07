import { Tables } from "@/types/supabase";

type UserComment = {
  id: string;
  content: string;
  updated_at: string;
}[]

export type UserComments = {
  comments: UserComment;
  house: Tables<'house'>;
  house_id: string;
  user: Tables<'user'>;
}[]