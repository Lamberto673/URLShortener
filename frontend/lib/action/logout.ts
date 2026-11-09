"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Logout() {
  const store = await cookies();
  const token = store.get("token")?.value;
  if (token) {
    await fetch("http://localhost:8081/Logout", {
      method: "POST",
      headers: { Authorization: token },
    });
    store.delete("token");
    redirect("/");
  }
}
