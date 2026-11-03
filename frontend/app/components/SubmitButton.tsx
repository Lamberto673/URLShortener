"use client";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  label,
  pendingLabel,
  className = "",
}: {
  label: string;
  pendingLabel: string;
  className?: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`h-14 rounded-lg bg-amber-400 px-6 text-lg font-semibold text-blue-950 cursor-pointer shadow-[0_8px_16px_-8px_rgb(23_37_84/0.6)] transition-all duration-200 ease-out hover:bg-amber-300 hover:-translate-y-0.5 active:translate-y-0.5 disabled:cursor-wait disabled:bg-amber-200 disabled:translate-y-0 ${className}`}
    >
      {pending ? pendingLabel : label}
    </button>
  );
};

export default SubmitButton;
