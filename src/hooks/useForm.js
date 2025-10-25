import { useMemo, useState, useCallback } from "react";
import { Validator } from "@/utils/validator";

export const useForm = (formSchema, initialData = {}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validator = useMemo(() => new Validator(), []);

  const validateField = useCallback((fieldName, value) => {
    if (!formSchema[fieldName]) return { isValid: true, errors: [] };

    const result = validator.validateField(
      fieldName,
      formSchema[fieldName],
      value,
      formData
    );
    
    setErrors((prev) => ({
      ...prev,
      [fieldName]: result.errors,
    }));

    return result;
  }, [formSchema, validator, formData]);

  const validateForm = useCallback(() => {
    const result = validator.validateForm(formData, formSchema);

    const newErrors = {};
    Object.entries(result.results).forEach(([fieldName, fieldResult]) => {
      newErrors[fieldName] = fieldResult.errors;
    });

    setErrors(newErrors);
    return result;
  }, [validator, formData, formSchema]);

  const setFieldValue = useCallback((fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // Validate if field was already touched
    if (touched[fieldName]) {
      setTimeout(() => validateField(fieldName, value), 0);
    }
  }, [touched, validateField]);

  const setFieldTouched = useCallback((fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    setTimeout(() => validateField(fieldName, formData[fieldName]), 0);
  }, [formData, validateField]);

  const handleChange = useCallback((fieldName) => (event) => {
    const value = event.target.value;
    setFieldValue(fieldName, value);
  }, [setFieldValue]);

  const handleBlur = useCallback((fieldName) => () => {
    setFieldTouched(fieldName);
  }, [setFieldTouched]);

  const setFormValues = useCallback((values) => {
    setFormData(values);
  }, []);

  const getFieldProps = useCallback((fieldName) => ({
    value: formData[fieldName] || "",
    error: errors[fieldName]?.[0] || "", 
    onChange: handleChange(fieldName),
    onBlur: handleBlur(fieldName)
  }), [formData, errors, handleChange, handleBlur]);

  // Reset form function
  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  return {
    formData,
    errors,
    touched,

    setFieldValue,
    setFormValues,
    validateField,
    validateForm,
    getFieldProps,
    resetForm,
  };
};