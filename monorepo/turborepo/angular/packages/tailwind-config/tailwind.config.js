const config = {
    content: [
        "../../apps/dashboard/src/**/*.{js,ts,jsx,tsx}",
        "../../apps/shell/src/**/*.{js,ts,jsx,tsx}",
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#c094f6",
                    dark: "#522281",
                    50: "#faf6fe",
                    100: "#f2e9fe",
                    200: "#e7d7fd",
                    300: "#d5b8fa",
                    400: "#c094f6",
                    500: "#a15eee",
                    600: "#8a3de0",
                    700: "#752cc4",
                    800: "#6429a0",
                    900: "#522281",
                    950: "#360c5f",
                },
            },
        },
        plugins: [],
    },
};
export default config;
