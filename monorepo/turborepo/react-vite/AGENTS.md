### Project structure

the project is a monorepo with turborepo, inside the monorepo we have multiple apps and packages

- see `apps/dashboard` for a microfrontend app for dashboard, builded with vite and react 19
- see `apps/shell` for a microfrontend app for shell, builded with vite and react 19
- components live in `packages/ui/src` and it's builded with tailwindcss
- eslint, tailwindcss and typescript config are in `packages/eslint-config`, `packages/tailwind-config` and `packages/typescript-config`
- see `packages/agents` for agents specifications
- see `.agent/skills/react-best-practices` for react best practices

### Development

- to develop the monorepo run `npm run dev`
- to build the monorepo run `npm run build`
- to run the monorepo run `npm run start`
- to run the monorepo wuth module federation run `npm run micro`
