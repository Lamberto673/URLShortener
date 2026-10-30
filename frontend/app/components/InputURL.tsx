"use client";
import React, { useState } from "react";

const InputURL = (url: string) => {
  const [urls, setUrls] = useState(url || "");
  return (
    <>
      {urls ? (
        <div className="bg-blue-200 rounded-2xl w-200 h-20">
          <div></div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default InputURL;
