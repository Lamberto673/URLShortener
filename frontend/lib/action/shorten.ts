"use server";

import { URLSearchParams } from "url";

const shorten = async (url: string, token: string) => {
  const params = new URLSearchParams({ url });
  const res = await fetch(`http://localhost:8081/user/urlShorten?${params}`, {
    headers: { Authorization: token },
  });
  if (!res.ok) throw new Error((await res.json()).Message);
  return res.json();
};

// const getShortURL = async (code: string, token: string) => {
//   const params = new URLSearchParams({ code });
//   const res = await fetch(`http://localhost:8081?${params}`, {
//     headers: { Authorization: token },
//   });
//   return res.json()
// };
export default shorten;
