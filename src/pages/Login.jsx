import { validationRules } from "@/utils/validation/validation-rules";
import { useState } from "react";

const loginSchema = {
  email: [
    validationRules.required,
    validationRules.email,
  ],
  password: [
    validationRules.required,
    validationRules.min(6).max(10)
  ],
};

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  const onChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="johndoe@gmail.com"
            autoComplete="email"
          />
          <div className="form-error" data-form-error-type="email"></div>
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            autoComplete="new-password"
            placeholder="password"
          />
          <div className="form-error" data-form-error-type="password"></div>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
