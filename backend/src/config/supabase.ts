import { createClient } from '@supabase/supabase-js';

// Mengambil kredensial Supabase dari environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Validasi: pastikan variabel lingkungan tersedia
if (!supabaseUrl || !supabaseKey) {
  console.error('SUPABASE_URL atau SUPABASE_KEY tidak ditemukan di file .env');
  process.exit(1);
}

// Membuat dan mengekspor Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
