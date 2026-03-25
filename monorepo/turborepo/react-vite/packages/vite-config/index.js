export const virtualFederationSSRPlugin = () => ({
  name: 'virtual-federation-ssr',
  resolveId(id) {
    if (id === '__federation__' || id === 'virtual:__federation_fn_import') {
      return '\0' + id;
    }
  },
  load(id) {
    if (id === '\0__federation__' || id === '\0virtual:__federation_fn_import') {
      return `
        export const __federation_method_getRemote = () => Promise.resolve();
        export const __federation_method_setRemote = () => {};
        export const __federation_method_unwrapDefault = (m) => m;
      `;
    }
  }
});
