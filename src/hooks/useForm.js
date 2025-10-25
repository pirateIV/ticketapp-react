import { useMemo, useState } from "react";
import { Validator } from "@/utils/validation/validator";

export const useForm = (formSchema, initialData = {}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validator = useMemo(() => new Validator(), []);

  const validateField = (fieldName, value) => {
    if (!formSchema[fieldName]) return { isValid: true, errors: [] };

    const result = validator.validateField(
      fieldName,
      formSchema[fieldName],
      value
    );
    setErrors((prev) => ({
      ...prev,
      [fieldName]: result.errors,
    }));

    return result;
  };

  const validateForm = () => {
    const result = validator.validateForm(formData, formSchema);

    const newErrors = Object.fromEntries(Object.entries(result.results).map(([fieldName, fieldResult]) => [fieldName, fieldResult.errors]));

    setErrors(newErrors);
    return result;
  };

  const setFieldValue = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // Validate if field was already touched
  };

  const handleChange = (fieldName) => (event) => {
    const value = event.target.value; // just for text, email, password etc...
    setFieldValue(fieldName, value);
  };

  const setFormValues = (values) => {
    setFormData(values);
  };

  const getFieldProps = (fieldName) => ({
    value: formData[fieldName] || "",
    error: touched[fieldName] ? errors[fieldName] : undefined,
    onChange: handleChange(fieldName),
  });

  return {
    formData,
    errors,
    touched,

    setFieldValue,
    setFormValues,
    validateField,
    validateForm,
    getFieldProps,
  };
};
