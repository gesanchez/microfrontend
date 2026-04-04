# Angular 19 Microfrontend Monorepo

This monorepo demonstrates a high-performance Microfrontend (MFE) architecture built with **Angular 19**, **Signals**, **Standalone Components**, and **Turborepo**. It features a unified Shell application with support for both **SSR (Server-Side Rendering)** and **SSG (Static Site Generation)**.

## Project Architecture

The project uses modern Angular 19 features to provide a reactive and efficient micro-frontend experience.

- **Signals-Based State**: Modern reactive state management using Angular Signals.
- **Unified SSR/SSG**: The Shell application is configured to handle dynamic SSR for the dashboard and static prerendering for common pages.
- **ngx-translate**: Centralized internationalization across all apps using shared assets in `@repo/i18n`.
- **Shared UI & Configs**: Reusable Component Library (`@repo/ui`) using Standalone Components and standardized configurations.

## Apps and Packages

### Applications (`apps/`)

- **`shell`**: The primary Angular 19 application. Optimized for both SSR and SSG. Handles navigation and micro-frontend orchestration.
- **`dashboard`**: An Angular micro-frontend providing real-time data and charts.
- **`account`**: An Angular micro-frontend for user profile and account management.
- **`api`**: A lightweight Express backend providing mock data and MFE configuration.

### Shared Packages (`packages/`)

- **`@repo/ui`**: Shared UI library built with **Angular Standalone Components** and **Signals**.
- **`@repo/i18n`**: Centralized JSON translations shared across the monorepo.
- **`@repo/utilities`**: Common TypeScript utilities (e.g., custom event navigation).
- **`@repo/eslint-config`**: Standardized Angular and TypeScript linting rules.
- **`@repo/typescript-config`**: Shared TypeScript configurations for Angular 19.
- **`@repo/tailwind-config`**: Shared Tailwind CSS configuration and custom color palettes.

## Getting Started

### Prerequisites

- Node.js >= 20.19.0 (Recommended: v22.12.0)
- npm

### Installation

```sh
npm install
```

### Running the Project

#### Development Mode
Runs all applications (Shell, Dashboard, Account, API) in parallel:
```sh
npm run dev
```

#### Build and Run (Production)
Builds all workspaces using Turborepo:
```sh
npm run build
```

#### Run Shell SSR
```sh
npm run start --workspace=shell
```

## Features

### Standalone & Signals
All components are built using Angular's standalone architecture and Signal-based inputs/outputs, reducing boilerplate and improving performance.

### Internationalization
Managed in `@repo/i18n`. The Shell app is configured with `ngx-translate` to load these translations dynamically based on the current language (English/Spanish).
