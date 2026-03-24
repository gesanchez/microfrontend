import { DynamicRemoteApp } from "@/components/DinamicComponent";
import { Home } from "@/pages/Home/Home";
import { Login } from "@/pages/Login/Login";
import { Suspense } from "react";
import { default as ErrorComponent } from "@/components/ErrorComponent";
import { MainLayout } from "@/components/Layout/MainLayout";
import { MfeConfig } from "@/context/ConfigContext";

export const getRoutes = (mfes: MfeConfig[] = []) => [
  {
    path: "/",
    index: true,
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: MainLayout,
    children: [
      ...[...mfes]
        .sort((a, b) => {
          // Ensure root dashboard is last so it doesn't steal specific routes
          if (a.route === "/dashboard") return 1;
          if (b.route === "/dashboard") return -1;
          return a.route.length > b.route.length ? -1 : 1;
        })
        .map((mfe) => {
          // Extract relative path from absolute route
          let relativePath = mfe.route === "/dashboard" 
            ? "" 
            : mfe.route.startsWith("/dashboard") 
              ? mfe.route.substring("/dashboard".length) 
              : mfe.route;

            console.log(relativePath)
          
          // Clean up slashes: /account/ -> account
          const safePath = relativePath.replace(/^\/+|\/+$/g, "");
          
          // Result: "" -> "*", "account" -> "account/*"
          // This ensures no leading / is present, avoiding "Absolute route" errors.
          const finalPath = safePath === "" ? "/dashboard" : `${safePath}/*`;

          return {
            path: finalPath,
            element: (
              <ErrorComponent>
                <Suspense fallback={<div>Loading {mfe.label || mfe.name}...</div>}>
                  <DynamicRemoteApp config={mfe} />
                </Suspense>
              </ErrorComponent>
            ),
          };
        }),
    ],
  },
];
