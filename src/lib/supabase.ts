import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dtuxrsogylzswzylmain.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0dXhyc29neWx6c3d6eWxtYWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MTIxNzEsImV4cCI6MjA1MDA4ODE3MX0.G2SLKT2g-UN4nsoxLB5B2z-ffMGX2W9Y8Y9JP4qNLIE'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)