### Project structure

The project is an Angular 19 monorepo managed with **Turborepo**. It contains multiple applications and shared packages.

- See `apps/dashboard` for the Angular 19 dashboard micro-frontend (Standalone + Signals).
- See `apps/shell` for the Angular 19 shell application (SSR + SSG).
- UI components live in `packages/ui/src` (Angular Standalone Components).
- Shared Tailwind CSS and TypeScript configurations are in `packages/tailwind-config` and `packages/typescript-config`.
- See `packages/i18n` for shared translation assets (ngx-translate compatible).

### Development

- To develop all apps in the monorepo, run `npm run dev`.
- To build the entire project using Turborepo, run `npm run build`.
- To run the Shell in SSR mode, run `npm run start --workspace=shell`.
- To run tests across the monorepo, run `npm run test`.

### Core Technologies

- **Angular 19**: Uses modern Standalone components and Signals API.
- **Turborepo**: For optimized builds and workspace task orchestration.
- **SSR/SSG**: Unified server-side and static rendering built into the Shell.
- **Tailwind CSS**: Utility-first styling with shared theme tokens.
