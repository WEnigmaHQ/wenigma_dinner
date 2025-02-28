import { createClient } from '@supabase/supabase-js';
import React from 'react';


const supabaseurl : string = process.env.EXPO_PUBLIC_SUPABASE_URL as string;

const supabasekey : string = process.env.EXPO_PUBLIC_SUPABASE_KEY as string;

if (!supabaseurl && ! supabasekey) {console.error('Empty credentials '); throw new Error('Missing Supabase configuration: Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY'); }

export const supabase : any = createClient(supabaseurl, supabasekey);


