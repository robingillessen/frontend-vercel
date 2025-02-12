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



| Bun Command | npm Command |
| --- | --- |
| `bun add` | `npm install` |
| `bun build` | `npm run build` |
| `bun start` | `npm run start` |
| `bunx` | `npx` |

\* React 19 is stable for a couple of months now.

** I chose bun as the package manager / build tool / runtime because it's faster than npm and yarn and I expect less dependency issues with React 19. If we need to switch to npm or yarn, we can do it later.


