import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClientForm, loader, action } from "./routes/ClientForm";
import { Home } from "./routes/Home";
import { Layout } from "./routes/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/client-form",
        element: <ClientForm />,
        action,
      },
      {
        path: "/client-form/:id",
        element: <ClientForm />,
        loader,
        action,
      },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
