import { Link } from "react-router-dom";

export function FormLink({ type }) {
  const linkItem = {
    login: {
      to: "/auth/login",
      text: "Log in",
      prompt: "Already have an account? ",
    },
    signup: {
      to: "/auth/signup",
      text: "Sign up",
      prompt: "Don't have an account? ",
    },
  }[type];

  return (
    <div className="text-center">
      <p className="text-gray-600 text-sm">
        {linkItem.prompt}
        <Link
          to={linkItem.to}
          className="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-colors"
        >
          {linkItem.text}
        </Link>
      </p>
    </div>
  );
}
