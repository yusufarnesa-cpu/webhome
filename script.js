const SUPABASE_URL = "URL KAMU";
const SUPABASE_ANON_KEY = "KEY KAMU";

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
    alert("Supabase belum berhasil terhubung: " + error.message);
    console.error(error);
  } else {
    alert("✅ Supabase berhasil terhubung!");
    console.log("Data categories:", data);
  }
}

testSupabase();
