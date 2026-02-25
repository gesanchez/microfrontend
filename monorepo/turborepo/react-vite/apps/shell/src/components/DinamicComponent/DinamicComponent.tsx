import {
  __federation_method_getRemote,
  __federation_method_setRemote,
  // @ts-ignore
} from "__federation__";
import { lazy, useEffect, useState, useMemo } from "react";
import { useConfig } from "../../context/ConfigContext";

// We can't use hooks directly in lazy() without some adjustments
// Let's create a wrapper component or use a different approach.
// Since lazy() needs a function that returns a promise, we can use the config context values.

export const DynamicRemoteApp = () => {
  const { mfes } = useConfig();
  
  // Find the dashboard config dynamically
  const dashboardConfig = useMemo(() => mfes.find(m => m.name === 'dashboard'), [mfes]);

  const [Component, setComponent] = useState<any>(null);

  useEffect(() => {
    if (dashboardConfig) {
      const { url, name } = dashboardConfig;
      const module = './Dashboard'; // Hardcoded for now, or could come from config

      __federation_method_setRemote(name, {
        url: () => Promise.resolve(url),
        format: "esm",
        from: "vite",
      });

      __federation_method_getRemote(name, module).then((mod: any) => {
        setComponent(() => mod.default || mod);
      });
    }
  }, [dashboardConfig]);

  if (!Component) return <div>Loading Remote...</div>;

  return <Component />;
};