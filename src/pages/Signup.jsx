import useAuth from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { validationRules } from "@/utils/validation/validation-rules";
import { FormField } from "@/components/FormField";

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
      console.log("form submitted...");
      signup(formData);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tighter">Signup</h1>

      <form
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8"
        onSubmit={handleSubmit}
      >
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

        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
