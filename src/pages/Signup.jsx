import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { useForm } from "@/hooks/useForm";
import { validationRules } from "@/utils/validation-rules";
import { Form, FormField, FormSubmit, FormWrapper } from "@/components/Form";
import WavyLine from "@/components/WavyLine";
import { FormLink } from "@/components/Form/FormLink";

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
    <FormWrapper pageType="signup">
      <Form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="username"
          label="Username"
          placeholder="Choose a username"
          autoComplete="username"
          fieldProps={getFieldProps("username")}
        />

        <FormField
          type="email"
          name="email"
          label="Email address"
          placeholder="Enter your email"
          autoComplete="email"
          fieldProps={getFieldProps("email")}
        />

        <FormField
          type="password"
          name="password"
          label="Password"
          placeholder="Create a strong password"
          autoComplete="new-password"
          fieldProps={getFieldProps("password")}
        />

        <FormSubmit>Create your account</FormSubmit>

        <FormLink type="login" />
      </Form>
    </FormWrapper>
  );
}
