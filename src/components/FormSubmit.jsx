import React from "react";

export function FormSubmit({ children, ...props }) {
  return (
    <button
      type="submit"
      className="rounded-md bg-gray-900 mt-4 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
      {...props}
    >
      {children}
    </button>
  );
}
