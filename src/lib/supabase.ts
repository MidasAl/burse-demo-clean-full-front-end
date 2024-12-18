import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lovable.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  throw new Error('Missing Supabase Anon Key - Make sure you have connected your Supabase project in the Lovable interface');
}

export const supabase = createClient(supabaseUrl, supabaseKey);