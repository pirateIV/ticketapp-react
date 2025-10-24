import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    errors: {
      username: "",
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
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={onChange}
          placeholder="johndoe"
          autoComplete="email"
        />
        <div className="form-error" data-form-error-type="email"></div>

        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="johndoe@gmail.com"
          autoComplete="email"
        />
        <div className="form-error" data-form-error-type="email"></div>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          autoComplete="new-password"
          placeholder="password"
        />
        <div className="form-error" data-form-error-type="password"></div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
