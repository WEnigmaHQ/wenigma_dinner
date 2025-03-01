import { createClient } from '@supabase/supabase-js';
import React from 'react';


const supabaseurl : string = 'https://wkzcdctmgbovszthwmps.supabase.co';

const supabasekey : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndremNkY3RtZ2JvdnN6dGh3bXBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NzEyNTEsImV4cCI6MjA1NTU0NzI1MX0.vtU2Mk7YRmZxCmYRFINgMcUlOKhohJU7njL--nZKnPU';

if (!supabaseurl && ! supabasekey) {console.error('Empty credentials '); throw new Error('Missing Supabase configuration: Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY'); }

export const supabase : any = createClient(supabaseurl, supabasekey);


