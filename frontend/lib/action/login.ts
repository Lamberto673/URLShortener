"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { URLSearchParams } from "url";

type Credentials = {
  username: string;
  password: string;
  reTypePassword?: string;
};
type AuthResult = {
  username: string;
  token: string;
};

export async function login({
  username,
  password,
}: Credentials): Promise<AuthResult> {
  const params = new URLSearchParams({ username, password });

  const logins = await fetch(`http://localhost:8081/login?${params}`, {
    method: "POST",
  });
  if (!logins.ok) throw new Error("Login failed");
  return logins.json();
}

export async function register({
  username,
  password,
  reTypePassword,
}: Credentials): Promise<AuthResult> {
  if (reTypePassword != password) {
    throw new Error("Password's not the same");
  }
  const params = new URLSearchParams({ username, password });

  const res = await fetch(`http://localhost:8081/register?${params}`, {
    method: "POST",
  });
  if (!res.ok) {
    throw new Error("Register failed");
  }
  return res.json();
}

export async function registerAction(formdata: FormData) {
  const { username, token } = await register({
    username: formdata.get("name") as string,
    password: formdata.get("password") as string,
    reTypePassword: formdata.get("reTypePassword") as string,
  });
  const store = await cookies();
  store.set("token", token, { httpOnly: true, path: "/" });
  store.set("username", username, { path: "/" });
  redirect("/");
}

export async function LoginAction(formdata: FormData) {
  await login({
    username: formdata.get("name") as string,
    password: formdata.get("password") as string,
  });
}
