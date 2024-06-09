// client.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_PROJECT_KEY;
const supabaseAnonKey = import.meta.env.VITE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
