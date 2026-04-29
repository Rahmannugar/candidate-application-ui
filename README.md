# Candidate Application UI

A Next.js candidate application interface built with TypeScript, Tailwind CSS,
React Hook Form, Zod, Zustand, TanStack Query, Phosphor Icons, and Byte
DatePicker.

## Features

- Light and dark mode
- Basic information form
- Professional summary
- Skills and languages
- Experience and education sections with month/year date selection
- Resume attachment
- Cover letter
- Mocked application submission to `https://25thandstaffing.com/api`
- Loading, success, error, and empty states

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Useful Commands

```bash
npm run lint
npm run build
```

## Structure

Domain logic lives in `lib/*` modules. UI sections live in matching
`components/*` folders. Submission logic is isolated in `lib/submission`.
