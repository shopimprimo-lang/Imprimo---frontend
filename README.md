# Imprimo Trading Frontend

This is the frontend application for Imprimo Trading, an e-commerce platform built with Next.js, Tailwind CSS, Redux, and Framer Motion.

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` to start the development server.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies
- Next.js 14
- TypeScript
- Tailwind CSS
- Redux
- Framer Motion
- ShadCN UI

## Running without a database

All API calls go through `src/lib/api.ts`. If `NEXT_PUBLIC_API_URL` is empty, unreachable, or the
backend errors (e.g. no MongoDB yet), the app serves the dummy catalogue in `src/data/dummy.ts`
(placeholder images in `public/images/demo`). Once the backend returns real data, it is used automatically.
