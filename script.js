const SUPABASE_URL = "https://hqzishiazabguknallei.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "sb_publishable_r8rspBje6vjTvUsF9lKYzA_SakK9CD5";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

console.log("Supabase berhasil terhubung.");
supabaseClient
  .from("categories")
  .select("*")
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error("Koneksi Supabase gagal:", error);
    } else {
      console.log("Koneksi Supabase berhasil:", data);
    }
  });
