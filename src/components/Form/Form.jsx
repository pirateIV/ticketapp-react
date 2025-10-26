import React from "react";

export function Form({ children, ...props }) {
  return (
    <form className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8" {...props}>
      {children}
    </form>
  );
}
