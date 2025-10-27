import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/auth";
import { useForm } from "@/hooks/useForm";
import { validationRules } from "@/utils/validation-rules";
import {
  Form,
  FormField,
  FormLink,
  FormSubmit,
  FormWrapper,
} from "@/components/Form";

// prettier-ignore
const loginSchema = {
  email: [
    validationRules.email,
    validationRules.required,
  ],
  password: [
    validationRules.password,
    validationRules.required,
    validationRules.minLength(6),
    validationRules.maxLength(30),
  ],
};

export default function Login() {
  const navigate = useNavigate();

  const { login, setUser } = useAuth();
  const { formData, getFieldProps, validateForm } = useForm(loginSchema, {
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm();

    if (validation.isValid) {
      const { success, user, message } = await login(formData);

      if (success) {
        setUser(user);
        navigate("/dashboard");
      } else {
        console.log(message);
      }
    }
  };

  return (
    <FormWrapper pageType="login">
      <Form onSubmit={handleSubmit}>
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
          autoComplete="current-password"
          placeholder="password"
          fieldProps={getFieldProps("password")}
        />

        <FormSubmit>Login</FormSubmit>

        <FormLink type="signup" />
      </Form>
    </FormWrapper>
  );
}
