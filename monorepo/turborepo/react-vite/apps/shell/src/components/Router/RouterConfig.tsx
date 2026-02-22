import { createBrowserRouter } from "react-router";
import { DynamicRemoteApp } from "@/components/DinamicComponent";
import { Home } from "@/pages/Home";
import { Suspense } from "react";
import App from "@/App";
import { default as ErrorComponent } from "@/components/ErrorComponent";

export const RouterConfig = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "dashboard",
        element: (
          <ErrorComponent>
            <Suspense fallback={<div>Loading...</div>}>
              <DynamicRemoteApp />
            </Suspense>
          </ErrorComponent>
        ),
      },
    ],
  },
]);
