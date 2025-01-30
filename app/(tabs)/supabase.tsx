import { createClient } from '@supabase/supabase-js';
import React from 'react';


const SUPABASEURL = 'https://mkqtbklyohtqfsmwesvv.supabase.co';
const SUPABASEKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rcXRia2x5b2h0cWZzbXdlc3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMzQ0ODYsImV4cCI6MjA1MzcxMDQ4Nn0.gXHXs-ljJsxe0hDKSmhk-81c7AaWynrwo_-1THzSW90';

export const supabase = createClient(SUPABASEURL, SUPABASEKEY);