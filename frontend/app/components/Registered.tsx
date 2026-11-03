import React from "react";
import { registerAction } from "../../lib/action/login";
import SubmitButton from "./SubmitButton";

const field =
  "h-14 w-full rounded-lg border border-blue-300 bg-white px-4 text-lg text-blue-950 placeholder:text-blue-900/80";
const label = "mb-2 block font-semibold text-blue-950";

const Registered = () => {
  return (
    <form
      className="flex w-full max-w-lg flex-col gap-5 rounded-lg bg-blue-50 p-6 shadow-[0_24px_48px_-16px_rgb(0_0_0/0.6)] sm:p-10"
      action={registerAction}
    >
      <div>
        <label htmlFor="name" className={label}>
          Username:
        </label>
        <input
          name="name"
          id="name"
          required
          autoComplete="username"
          placeholder="Alex"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="password" className={label}>
          Password:
        </label>
        <input
          name="password"
          id="password"
          type="password"
          required
          autoComplete="new-password"
          placeholder="Alex123"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="reTypePassword" className={label}>
          Re-enter Password:
        </label>
        <input
          name="reTypePassword"
          id="reTypePassword"
          type="password"
          required
          autoComplete="new-password"
          placeholder="Alex123"
          className={field}
        />
      </div>
      <SubmitButton label="Login" pendingLabel="Logging in..." className="mt-2" />
    </form>
  );
};

export default Registered;
