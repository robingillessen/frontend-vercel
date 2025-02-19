## Changelog

### 12-02-2025

Project setup
- Added Next.js 15
- Added React 19*
- Added D3
- Added zustand for managing global client state
- Bun for package manager / build tool / runtime**
- Added tailwind for styling
- Added eslint for linting


\* React 19 is stable for a couple of months now.

** I chose bun as the package manager / build tool / runtime because it's faster than npm and yarn and I expect less dependency issues with React 19. If we need to switch to npm or yarn, we can do it later.

### 19-02-2025


- Set up Docker environment
- Node visualization (force-directed graph?)
- componenten skeletons (tanstack table)
- create a util function to merge tailwind classes
- Get an idea on why to choose JSONLD over regular JSON
- Build in the overheid branding (font, colors, etc.)
- Set up the beginning of the custimizable design system
- environment variables and upgrade to tailwind v4
- Add a basic chat interface
- Added logos to the project
- Added a validation text component
- Added a textarea component that resizes based on the content


### COMMANDS

### Bun

| Bun Command | npm Command |

| --- | --- |
| `bun add` | `npm install` |
| `bun build` | `npm run build` |
| `bun start` | `npm run start` |
| `bunx` | `npx` |


### Docker

```bash
docker build -t wegwijs-frontend .
docker run -p 31033:3000 wegwijs-frontend
```


