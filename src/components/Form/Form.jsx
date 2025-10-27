import React from "react";

export function Form({ children, ...props }) {
  return (
    <form className="mt-8 space-y-8" {...props}>
      {children}
    </form>
  );
}
