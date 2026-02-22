import type { Config } from "tailwindcss"
import sharedConfig from "@repo/tailwind-config/tailwind.config"

const config: Pick<Config, "content" | "presets"> = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [sharedConfig],
}

export default config