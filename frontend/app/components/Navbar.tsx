export function Navbar() {
  return (
    <nav className="h-15 bg-blue-900 w-200 rounded-lg mt-5 shadow-lg  ">
      <ul className="flex items-center justify-between h-full px-20 overflow-hidden text-white">
        <li className="hover:-translate-y-10 ease-in-out transition-all duration-200 cursor-pointer">
          Login
          <p className="">Login</p>
          <p className="mt-4">Login</p>
          <p className="mt-4 mb-6">Login</p>
        </li>
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
