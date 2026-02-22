
import {
  __federation_method_getRemote,
  __federation_method_setRemote,
  __fede
  // @ts-ignore
} from "__federation__";
import { lazy } from "react";

export const DynamicRemoteApp = lazy(() => {
    const {url, name, module } =  {url:'http://localhost:5001/assets/remoteEntry.js', name:'dashboard', module:'./Dashboard' }

    __federation_method_setRemote(name, {
      url: () => Promise.resolve(url),
      format: "esm",
      from: "vite",
    });
    return __federation_method_getRemote(name, module)
});