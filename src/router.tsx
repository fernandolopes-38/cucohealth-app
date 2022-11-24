import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClientForm } from "./routes/ClientForm";
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
      },
      {
        path: "/client-form/:id",
        element: <ClientForm />,
      },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
