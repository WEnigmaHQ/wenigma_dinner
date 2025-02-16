import { createClient } from '@supabase/supabase-js';
import React from 'react';


const SUPABASEURL = 'https://xgixsfqcurmewdczbxvd.supabase.co';
const SUPABASEKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnaXhzZnFjdXJtZXdkY3pieHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNjU2MzMsImV4cCI6MjA1NDk0MTYzM30.gD29IF3foFApG3FqIqZBK7PWMbW6biU_xWepsHRpQ4M';

export const supabase = createClient(SUPABASEURL, SUPABASEKEY);