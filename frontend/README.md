# Frontend

React + TypeScript + Vite client application.

## Scripts

- `npm run dev` start Vite dev server
- `npm run build` type-check and build production bundle
- `npm run preview` preview built bundle
- `npm run lint` run ESLint

## API Integration

The app calls `${VITE_API_URL}/health`.

- Default `VITE_API_URL` is `/api`
- During local dev, Vite proxies `/api` to `http://localhost:5000`
