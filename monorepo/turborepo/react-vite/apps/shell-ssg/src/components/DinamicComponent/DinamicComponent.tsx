import {
  __federation_method_getRemote,
  __federation_method_setRemote,
  // @ts-ignore
} from "__federation__";
import { useEffect, useState } from "react";
import { MfeConfig } from "../../context/ConfigContext";

interface DynamicRemoteAppProps {
  config: MfeConfig;
}

export const DynamicRemoteApp = ({ config }: DynamicRemoteAppProps) => {
  const [Component, setComponent] = useState<any>(null);

  useEffect(() => {
    if (config) {
      const { url, name, module } = config;

      __federation_method_setRemote(name, {
        url: () => Promise.resolve(url),
        format: "esm",
        from: "vite",
      });

      __federation_method_getRemote(name, module)
        .then((mod: any) => {
          setComponent(() => mod.default || mod);
        })
        .catch((err: any) => {
          console.error(`Failed to load MFE ${name}:`, err);
          setComponent(() => () => (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              <h3 className="font-bold">Failed to load {name}</h3>
              <p className="text-sm">{err?.message || 'Check console for details.'}</p>
            </div>
          ));
        });
    }
  }, [config]);

  if (!Component) return <div>Loading Remote...</div>;

  return <Component />;
};