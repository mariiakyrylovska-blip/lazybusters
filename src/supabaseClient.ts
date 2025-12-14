import { createClient } from "@supabase/supabase-js";

// -- подключение клиента --
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// -- функция для создания привычки --
export async function addHabit(user_id: string, pet_name: string) {
  const { data, error } = await supabase.from("habits").insert([
    {
      user_id,
      pet_name,
      level: 1,
    },
  ]);

  return { data, error };
}
