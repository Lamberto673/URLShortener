"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar({ username }: { username: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col transition-all ">
      <nav className="h-15 bg-blue-900 w-200 rounded-lg mt-5 shadow-lg  z-100">
        <ul className="flex items-center justify-between h-full px-20 overflow-hidden text-white">
          {username ? (
            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer hover:translate-y-1 ease-in-out duration-200 transition-all"
            >
              <Image
                src={"/images/default_avatar.png"}
                alt={"user"}
                width={65}
                height={65}
                className="z-50"
              />
            </button>
          ) : (
            <Link
              href={"/login"}
              className="hover:-translate-y-10 ease-in-out transition-all duration-200 cursor-pointer"
            >
              Login
              <p className="">Login</p>
              <p className="mt-4">Login</p>
              <p className="mt-4 mb-6">Login</p>
            </Link>
          )}

          <li className="hover:-translate-y-10 ease-in-out transition-all duration-200 cursor-pointer">
            Analytics
            <p className="">Analytics</p>
            <p className="mt-4">Analytics</p>
            <p className="mt-4 mb-6">Analytics</p>
          </li>
          <li className="hover:-translate-y-10 ease-in-out transition-all duration-200 cursor-pointer">
            Menu <p className="">Menu</p>
            <p className="mt-4">Menu</p>
            <p className="mt-4 mb-6">Menu</p>
          </li>
        </ul>
      </nav>

      <div
        className={`mr-2 rounded-b-2xl bg-white shadow-lg w-20 h-10 justify-center text-center flex items-center transition-all -translate-y-10 z-50 ${open ? "translate-y-0.5" : ""}`}
      >
        <p>{username}</p>
      </div>
    </div>
  );
}
