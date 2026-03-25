# React Vite Microfrontend Monorepo

This monorepo demonstrates a robust Microfrontend (MFE) architecture built with **React**, **Vite**, and **Turborepo**. It supports two variants of the main Shell application: **SSR (Server-Side Rendering)** and **SSG (Static Site Generation)**.

## Project Architecture

The project is structured to allow multiple microfrontends to be developed and deployed independently, yet integrated seamlessly into a unified Shell application.

- **Dynamic MFE Configuration**: The Shell fetches MFE details (name, module, URL, route) from a central API at runtime.
- **Internationalization (i18n)**: Centralized translation management across all apps and packages.
- **Shared UI & Configs**: Reusable component library and standardized configurations for ESLint, TypeScript, Tailwind, and Vite.

## Apps and Packages

### Applications (`apps/`)

- **`shell`**: The main Shell application using **SSR**. It handles dynamic routing and MFE hydration.
- **`shell-ssg`**: A variant of the Shell application using **SSG** for pre-rendered performance.
- **`dashboard`**: A microfrontend providing dashboard-related functionality.
- **`account`**: A microfrontend for user account management.
- **`api`**: A dummy Express API that serves the MFE configuration.
- **`docs`**: Documentation site (Next.js).
- **`web`**: Main website presence (Next.js).

### Shared Packages (`packages/`)

- **`@repo/i18n`**: Centralized translations and i18next configuration (en, es).
- **`@repo/ui`**: Shared React component library.
- **`@repo/utilities`**: Common utility functions.
- **`@repo/vite-config`**: Shared Vite configurations.
- **`@repo/eslint-config`**: Standardized linting rules.
- **`@repo/typescript-config`**: Shared TypeScript configurations.
- **`@repo/tailwind-config`**: Shared Tailwind CSS configuration.

## Getting Started

### Prerequisites

- Node.js >= 22
- npm

### Installation

```sh
npm install
```

### Environment Configuration

Inside `apps/shell` and `apps/shell-ssg`, create a `.env` file in the root with the following content:

```env
VITE_API_URL=http://localhost:5005
```

### Running the Project

#### Build and Run in SSR Mode
Builds the shell, dashboard, account, UI, and API.
```sh
npm run build:ssr
```

#### Build and Run in SSG Mode
Builds the shell-ssg variant along with the MFEs.
```sh
npm run build:ssg
```

#### Development Mode
Runs all apps in development mode:
```sh
npm run dev
```

## Features

### Internationalization (i18n)

Translations are managed in `@repo/i18n` and shared across the monorepo. The Shell application uses `react-i18next` to provide language switching (English and Spanish).

### Dynamic Microfrontends

The `api` app provides a `/mfes` endpoint that returns the configuration for the MFEs. This allows the Shell to dynamically load and route to different MFEs without hardcoding their URLs.
