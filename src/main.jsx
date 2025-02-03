import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./Routes/Routes";
import AuthProvider from "./provider/AuthProvider";
import { ThemeProvider } from "./provider/ThemeContext";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <RouterProvider router={routes}></RouterProvider>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </Suspense>
  </StrictMode>
);
