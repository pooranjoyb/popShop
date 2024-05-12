import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_PROJECT_KEY
// const supabaseAnonKey = import.meta.env.VITE_ANON_KEY

// console.log(supabaseUrl)

export const supabase = createClient("https://drnetvgmyxknfbeftdhy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRybmV0dmdteXhrbmZiZWZ0ZGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwOTM5OTcsImV4cCI6MjAyNTY2OTk5N30.5oi3T2rvQLdc5hBB-dY_EYEHlQ4VlVWplAGHQn_bir4")