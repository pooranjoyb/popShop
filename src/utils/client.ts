import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://drnetvgmyxknfbeftdhy.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRybmV0dmdteXhrbmZiZWZ0ZGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwOTM5OTcsImV4cCI6MjAyNTY2OTk5N30.5oi3T2rvQLdc5hBB-dY_EYEHlQ4VlVWplAGHQn_bir4"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)