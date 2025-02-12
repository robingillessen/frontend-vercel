## Changelog

### 12-02-2025

Project setup
- Added zustand for managing global client state
- I chose bun as the package manager / build tool / runtime because it's faster than npm and yarn and I expect less dependency issues with React 19. If we need to switch to npm or yarn, we can do it later*.
- Added tailwind for styling
- Added eslint for linting
- Added drizzle for database

* bun add === npm install
* bun build === npm run build
* bun start === npm run start
* bunx === npx