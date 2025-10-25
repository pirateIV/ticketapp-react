export const validationRules = {
  required: (value) => ({
    isValid:
      value !== undefined && value !== null && String(value).trim() !== "",
    message: "This field is required",
  }),

  email: (value) => ({
    isValid:
      !value ||
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(String(value)),
    message: "Must be a valid email address",
  }),

  password: (value) => ({
    isValid:
      !value ||
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(String(value)),
    message: "Must contain uppercase, lowercase, and a number (min 8 characters)",
  }),

  minLength: (min) => (value) => ({
    isValid: !value || String(value).length >= min,
    message: `Must be at least ${min} characters`,
  }),

  maxLength: (max) => (value) => ({
    isValid: !value || String(value).length <= max,
    message: `Must be at most ${max} characters`,
  }),

  // number: (value) => ({
  //   isValid: !value || !isNaN(parseFloat(value)),
  //   message: "Must be a valid number",
  // }),

  // min: (min) => (value) => ({
  //   isValid: !value || parseFloat(value),
  //   message: `Must be at least ${min}`,
  // }),

  // max: (max) => (value) => ({
  //   isValid: !value || parseFloat(value),
  //   message: `Must be less than ${max}`,
  // }),
};
