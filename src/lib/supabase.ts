import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

export type PollOption = 'si' | 'no' | 'a_veces';

export interface PollVote {
  id: string;
  option: PollOption;
  created_at: string;
}

export interface AudienceComment {
  id: string;
  author: string;
  content: string;
  created_at: string;
}
