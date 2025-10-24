export class Validator {
  validateField(value, fieldRules, values = {}) {
    const errors = [];

    for (const rule of fieldRules) {
      const result = rule(value, values);
      if (!result.isValid) {
        errors.push(result.message);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateForm(formData, formSchema) {
    const results = {};
    let isFormValid = true;

    for (const [fieldName, fieldRules] of Object.entries(formSchema)) {
      const value = formData[fieldName];
      const fieldResult = this.validateField(value, fieldRules);

      results[fieldName] = fieldResult;

      if (!fieldResult.isValid) {
        isFormValid = false;
      }
    }

    return {
      isValid: isFormValid,
      results,
    };
  }
}
