export const validationRules = {
  required: (value) => ({
    isValid:
      value !== undefined && value !== null && String(value).trim() !== "",
    message: "This field is required",
  }),

  minLength: (min) => (value) => ({
    isValid: !value || String(value).length >= min,
    message: `Must be at least ${min} characters`,
  }),

  maxLength: (max) => (value) => ({
    isValid: !value || String(value).length <= max,
    message: `Must be at least ${max} characters`,
  }),

  number: (value) => ({
    isValid: !value || !isNaN(parseFloat(value)),
    message: "Must be a valid number",
  }),

  min: (min) => (value) => ({
    isValid: !value || parseFloat(value),
    message: `Must be at least ${min}`,
  }),

  max: (max) => (value) => ({
    isValid: !value || parseFloat(value),
    message: `Must be less than ${max}`,
  }),
};
