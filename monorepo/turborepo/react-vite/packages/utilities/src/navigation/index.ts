export const navigateTo = (path: string) => {
  const event = new CustomEvent('shell:navigate', { detail: path });
  window.dispatchEvent(event);
};
