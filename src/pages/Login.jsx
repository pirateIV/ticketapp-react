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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
