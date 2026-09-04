const SUPABASE_URL = "https://hqzishiazabguknallei.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "sb_publishable_r8rspBje6vjTvUsF9lKYzA_SakK9CD5";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function testSupabase() {
  const { data, error } = await supabaseClient
    .from("categories")
    .select("*")
    .limit(1);

  if (error) {
    alert("❌ Supabase gagal: " + error.message);
    console.error(error);
  } else {
    alert("✅ Supabase berhasil terhubung!");
    console.log("Data categories:", data);
  }
}

testSupabase();
