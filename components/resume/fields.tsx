import type { ComponentProps } from "react";

const inputClass =
  "mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200";

type FieldProps = {
  label: string;
  hint?: string;
};

export function TextField({
  label,
  hint,
  ...props
}: FieldProps & ComponentProps<"input">) {
  return (
    <label className="block text-sm font-medium text-neutral-800">
      {label}
      <input {...props} className={inputClass} />
      {hint && <span className="mt-1 block text-xs font-normal text-neutral-500">{hint}</span>}
    </label>
  );
}

export function TextArea({
  label,
  hint,
  ...props
}: FieldProps & ComponentProps<"textarea">) {
  return (
    <label className="block text-sm font-medium text-neutral-800">
      {label}
      <textarea {...props} className={inputClass} />
      {hint && <span className="mt-1 block text-xs font-normal text-neutral-500">{hint}</span>}
    </label>
  );
}
