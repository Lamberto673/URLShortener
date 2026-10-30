import { auth } from "@/auth";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export async function Navbar() {
  const store = await cookies();
  const username = store.get("username")?.value;

  return (
    <nav className="h-15 bg-blue-900 w-200 rounded-lg mt-5 shadow-lg  ">
      <ul className="flex items-center justify-between h-full px-20 overflow-hidden text-white">
        {userId ? (
          <span className="cursor-pointer hover:translate-y-1 ease-in-out duration-200 transition-all">
            <Image
              src={session.user?.image ?? "/images/default_avatar.png"}
              alt={session.user?.name ?? "user"}
              width={20}
              height={20}
            />
          </span>
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
  );
}
