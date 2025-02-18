import { createClient } from '@supabase/supabase-js';
import React from 'react';


const SUPABASEURL = 'https://femgboomfaqocrdjvker.supabase.co';
const SUPABASEKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlbWdib29tZmFxb2NyZGp2a2VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4ODIzNDksImV4cCI6MjA1NTQ1ODM0OX0.08RqJiaDHf1_BxeWli-3XY-Cxdz--r099tOf12Bw7zQ';

export const supabase = createClient(SUPABASEURL, SUPABASEKEY);