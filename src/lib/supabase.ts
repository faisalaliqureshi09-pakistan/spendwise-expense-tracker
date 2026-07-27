import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ldtdscmfebpqxpjmcsvn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGRzY21mZWJwcXhwam1jc3ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMjQyOTUsImV4cCI6MjEwMDcwMDI5NX0.de9mBBvD-_PpQ8I03THgbNoE73wnbE7V2qzqBKqcQFM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
