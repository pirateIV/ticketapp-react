import React from "react";

export function Form({ children, ...props }) {
  return (
    <form className="mt-4 space-y-6" {...props}>
      {children}
    </form>
  );
}
