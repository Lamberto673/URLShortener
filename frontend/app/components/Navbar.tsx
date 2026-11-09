"use client";
import { Logout } from "@/lib/action/logout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const RollText = ({ text }: { text: string }) => (
  <span className="relative block h-6 overflow-hidden">
    <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
      {text}
    </span>
    <span
      aria-hidden
      className="absolute inset-x-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full"
    >
      {text}
    </span>
  </span>
);

export default function Navbar({ username }: { username?: string }) {
  const [open, setOpen] = useState(false);
  const cell =
    "group flex h-full flex-1 cursor-pointer items-center justify-center";

  return (
    <div className="relative w-full max-w-200">
      <nav className="relative z-10 h-15 overflow-hidden rounded-lg border border-white/15 bg-blue-900 shadow-[0_12px_24px_-12px_rgb(23_37_84/0.7)]">
        <ul className="flex h-full divide-x divide-white/15 text-center font-medium text-white">
          <li className="flex-1">
            {username ? (
              <button
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label={`Account: ${username}`}
                className={`${cell} w-full`}
              >
                <Image
                  src={"/images/default_avatar.png"}
                  alt=""
                  width={52}
                  height={52}
                  className="transition-transform duration-200 ease-out group-hover:translate-y-0.5"
                />
              </button>
            ) : (
              <Link href={"/login"} className={cell}>
                <RollText text="Login" />
              </Link>
            )}
          </li>
          <li className={cell}>
            <RollText text="Analytics" />
          </li>
          <li className={cell}>
            <RollText text="Menu" />
          </li>
        </ul>
      </nav>

      {username && (
        <div
          className={`absolute left-2 top-full w-[calc(33.333%-1rem)] rounded-b-lg flex flex-col  bg-white px-3 py-2 text-center text-blue-950 shadow-[0_12px_24px_-12px_rgb(23_37_84/0.7)] transition-all duration-200 ease-out ${open ? "translate-y-0" : "invisible -translate-y-full"}`}
        >
          <p className="truncate">{username}</p>
          <button onClick={Logout} className="text-red-500 cursor-pointer my-1">
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
