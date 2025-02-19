import { createClient } from '@supabase/supabase-js';
import React from 'react';


const SUPABASEURL = 'https://wkzcdctmgbovszthwmps.supabase.co';
const SUPABASEKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndremNkY3RtZ2JvdnN6dGh3bXBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NzEyNTEsImV4cCI6MjA1NTU0NzI1MX0.vtU2Mk7YRmZxCmYRFINgMcUlOKhohJU7njL--nZKnPU';

export const supabase = createClient(SUPABASEURL, SUPABASEKEY);