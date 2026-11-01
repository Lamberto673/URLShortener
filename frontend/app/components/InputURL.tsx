"use client";
import shorten from "@/lib/action/shorten";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const InputURL = ({ tokens }: { tokens: string }) => {
  const [result, setResult] = useState<{
    original: string;
    short: string;
  } | null>(null);

  return (
    <div className="midd-view flex-1  rounded-lg  ">
      <form
        action={async (formdata: FormData) => {
          const responds = await shorten(
            formdata.get("name") as string,
            tokens,
          );
          setResult({
            original: formdata.get("name") as string,
            short: responds.short,
          });
        }}
        className="h-50 w-200 bg-blue-700 opacity-50 rounded-lg shadow-2xl flex flex-col justify-center items-center"
      >
        <input
          name="name"
          id="url"
          placeholder="https://google.com"
          className="w-120 h-12 p-2 text-lg text-black  bg-white "
        />
        <button className="p-2.5 text-black cursor-pointer rounded-2xl h-5 w-5">
          Submit
        </button>
      </form>
      {result && (
        <Link target="_blank" href={result.original}>
          {result.short}
        </Link>
      )}
    </div>
  );
};

export default InputURL;
