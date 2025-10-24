import { useForm } from "@/hooks/useForm";
import { validationRules } from "@/utils/validation/validation-rules";

const loginSchema = {
  email: [validationRules.required, validationRules.email],
  password: [
    validationRules.required,
    validationRules.min(6),
    validationRules.max(30),
  ],
};

export default function Login() {
  const { formData, errors, getFieldProps } = useForm(loginSchema, {
    email: "",
    password: "",
  });

  console.log(formData, errors);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData, errors);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="email"
            placeholder="johndoe@gmail.com"
            autoComplete="email"
            {...getFieldProps("email")}
          />
          <div className="form-error"></div>
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="password"
            {...getFieldProps("password")}
          />
          <div className="form-error"></div>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
