"use server";

const shorten = async ({ url, token }: { url: string; token: string }) => {
  const res = await fetch("https://localhost:8081/user/urlShorten", {
    headers: { Authorization: token },
  });
  return res.json();
};

export default shorten;
