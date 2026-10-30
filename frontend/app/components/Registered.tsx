import React from "react";
import { register, registerAction } from "../../lib/action/login";

const Registered = () => {
  return (
    <div className="midd-view flex-1  rounded-lg  h-full">
      <form
        className="h-100 w-200 bg-blue-700 opacity-50 rounded-lg shadow-2xl flex flex-col justify-center items-center gap-5 p-1 px-20"
        action={registerAction}
      >
        <span className="w-full flex justify-between gap-3.5  items-center">
          <h1 className="text-black font-bold text-xl">Username: </h1>
          <input
            name="name"
            id="url"
            placeholder="Alex"
            className="w-120 h-12 p-2 text-lg text-black  bg-white rounded-lg"
          />
        </span>
        <span className="flex justify-between w-full gap-3.5  items-center">
          <h1 className="text-black font-bold text-xl">Password: </h1>
          <input
            name="password"
            id="url"
            placeholder="Alex123"
            className="w-120 h-12 p-2 text-lg text-black  bg-white rounded-lg"
          />
        </span>
        <span className="flex justify-between w-full gap-3.5  items-center">
          <h1 className="text-black font-bold text-xl">Re-enter Password: </h1>
          <input
            name="reTypePassword"
            id="url"
            placeholder="Alex123"
            className="w-120 h-12 p-2 text-lg text-black  bg-white rounded-lg"
          />
        </span>
        <button className="w-50 h-15 rounded-lg bg-gray-900 text-black font-bold shadow-lg cursor-pointer hover:-translate-y-0.5 active:translate-y-0.5 transition-all ease-in-out duration-200">
          Login
        </button>
      </form>
    </div>
  );
};

export default Registered;
