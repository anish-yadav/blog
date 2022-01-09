import { createClient, User } from "@supabase/supabase-js";
import { UserDetails } from "../types";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const updateUserName = async (user: User, name: string) => {
  await supabase
    .from<UserDetails>("users")
    .update({
      full_name: name,
    })
    .eq("id", user.id);
};


export const createUser = async (user: User, name: string) => {
  await supabase
    .from<UserDetails>("users")
    .insert({
      full_name: name,
      id: user.id
    });
}
