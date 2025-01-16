import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://lijadlieqgbzjnemfcig.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpamFkbGllcWdiempuZW1mY2lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDkzNTQsImV4cCI6MjA1MjQyNTM1NH0.6PpJEw07zXUayyHopx3afit8z-31D8RgdARVPkdyZnw',
);
