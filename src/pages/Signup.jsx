import { useForm } from "@/hooks/useForm";
import { validationRules } from "@/utils/validation/validation-rules";

const signupSchema = {
  username: [
    validationRules.required,
    validationRules.min(3)
  ],
  email: [
    validationRules.required,
    validationRules.email
  ],
  password: [
    validationRules.required,
    validationRules.email
  ]
}

export default function Signup() {
  const { formData, errors, getFieldProps } = useForm(signupSchema,{
    username: "",
    email: "",
    password: "",
  }); 

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData, errors);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="johndoe"
          autoComplete="username"
          {...getFieldProps("username")}
        />
        <div className="form-error" data-form-error-type="email"></div>

        <input
          type="text"
          name="email"
          placeholder="johndoe@gmail.com"
          autoComplete="email"
          {...getFieldProps("email")}
        />
        <div className="form-error" data-form-error-type="email"></div>

        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="password"
          {...getFieldProps("password")}
        />
        <div className="form-error" data-form-error-type="password"></div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
