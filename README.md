# Full-Stack Project Setup

This repository is split into:

- `frontend`: React + TypeScript + Vite app
- `backend`: Express + MongoDB (Mongoose) API

## Requirements

- Node.js 20+
- npm 10+
- MongoDB instance (optional for initial startup)

## Install

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

## Environment

1. Copy `backend/.env.example` to `backend/.env`
2. Update variables as needed

Frontend can optionally use `frontend/.env.example`.

## Run

Start both services:

```bash
npm run dev
```

Or individually:

```bash
npm run dev:backend
npm run dev:frontend
```

## API

Base path: `/api`

- `GET /api` basic API status
- `GET /api/health` service health + database connection state
