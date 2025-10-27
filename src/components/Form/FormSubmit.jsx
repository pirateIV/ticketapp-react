import React from "react";

export function FormSubmit({ children, ...props }) {
  return (
    <button
      type="submit"
      className="rounded-md w-full border-2 border-gray-500 bg-gray-900 mt-4 px-3 py-3 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
      {...props}
    >
      {children}
    </button>
  );
}
