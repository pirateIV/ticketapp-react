import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/auth";
import { useForm } from "@/hooks/useForm";
import { validationRules } from "@/utils/validation-rules";
import { Form, FormField, FormSubmit } from "@/components/Form";

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
  const navigate = useNavigate();

  const { signup } = useAuth();
  const { formData, getFieldProps, validateForm } = useForm(signupSchema, {
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm();

    if (validation.isValid) {
      const { success, message } = await signup(formData);

      if (success) {
        navigate("/auth/login");
      } else {
        console.log(message);
      }
    }
  };

  return (
    <div className="h-full mx-auto max-w-9/10 sm:max-w-4/5 lg:max-w-140">
      <h1 className="text-4xl font-bold tracking-tighter">Signup</h1>

      <Form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="username"
          label="Username"
          placeholder="johndoe"
          autoComplete="username"
          fieldProps={getFieldProps("username")}
        />

        <FormField
          type="email"
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          autoComplete="email"
          fieldProps={getFieldProps("email")}
        />

        <FormField
          type="password"
          name="password"
          label="Password"
          autoComplete="new-password"
          placeholder="password"
          fieldProps={getFieldProps("password")}
        />

        <FormSubmit>Signup</FormSubmit>
      </Form>
    </div>
  );
}
