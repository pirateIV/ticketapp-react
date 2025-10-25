import useAuth from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { validationRules } from "@/utils/validation/validation-rules";
import { useState } from "react";

// prettier-ignore
const signupSchema = {
  username: [
    validationRules.required,
    validationRules.minLength(3),
  ],
  email: [
    validationRules.required,
    validationRules.email,
  ],
  password: [
    validationRules.required,
    validationRules.minLength(6),
    validationRules.maxLength(30),
    validationRules.password,
  ],
};

export default function Signup() {
  const {} = useAuth();
  const { getFieldProps, validateForm } = useForm(signupSchema, {
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm();

    if (validation.isValid) {
      console.log("form submitted...");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="johndoe"
            autoComplete="username"
            {...getFieldProps("username")}
          />
          {getFieldProps("username").error && (
            <div className="form-error">{getFieldProps("username").error}</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
            autoComplete="email"
            {...getFieldProps("email")}
          />
          {getFieldProps("email").error && (
            <div className="form-error">{getFieldProps("email").error}</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="password"
            {...getFieldProps("password")}
          />
          {getFieldProps("password").error && (
            <div className="form-error">{getFieldProps("password").error}</div>
          )}
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
