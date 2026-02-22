import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config/tailwind.config"; // Adjust path as needed

const config: Pick<Config, "content" | "presets"> = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Local files
  presets: [sharedConfig], // Use the shared configuration
};

export default config;