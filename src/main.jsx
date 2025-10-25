import { createRoot } from "react-dom/client";

import "@/styles/index.css";
import App from "./App.jsx";
import { AppProviders } from "./providers.jsx";

createRoot(document.getElementById("root")).render(
  <AppProviders>
    <App />
  </AppProviders>
);
