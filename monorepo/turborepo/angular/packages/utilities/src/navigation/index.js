export const navigateTo = (path) => {
    const event = new CustomEvent('shell:navigate', { detail: path });
    window.dispatchEvent(event);
};
