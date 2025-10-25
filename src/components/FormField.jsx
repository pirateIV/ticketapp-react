import React from "react";

export function FormField({ name, label, fieldProps, ...props }) {
  const errorMessage = fieldProps.error;
  const hasError = !!errorMessage;

  return (
    <div className="relative mt-2">
      <label
        htmlFor={name}
        className="block text-sm/6 font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:gray-100"
        aria-invalid={hasError}
        aria-required="true"
        {...fieldProps}
        {...props}
      />
      {hasError && (
        <div className="absolute -bottom-10px text-[13px] font-medium text-red-500" role="alert" aria-live="polite">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
