import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import PriceEntriesPage from "./pages/PriceEntriesPage";

const qc = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/price-entries", element: <PriceEntriesPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
