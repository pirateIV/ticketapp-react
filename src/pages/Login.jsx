import { FormField } from "@/components/FormField";
import { useForm } from "@/hooks/useForm";
import { validationRules } from "@/utils/validation/validation-rules";

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
  // const { login } = useAuth();
  const { formData, errors, getFieldProps, validateForm } = useForm(
    loginSchema,
    {
      email: "",
      password: "",
    }
  );

  console.log(formData, errors);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.isValid) {
      console.log(errors);
    }

    // login(formData);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tighter">Login</h1>

      <form
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8"
        onSubmit={handleSubmit}
      >
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
          Login
        </button>
      </form>
    </div>
  );
}
