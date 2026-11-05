# BookNook — A Small Online Library

A full-stack online library management app where users can browse books, add their own books, and borrow/return books with real-time copy tracking.

## Live Links

- Client (Vercel): https://book-nook-client.vercel.app
- Server (Render): https://booknook-server.onrender.com

## Features

- **Authentication with BetterAuth + JWT** — Email/password and Google social login; the Express server verifies EdDSA JWTs via the JWKS endpoint using `jose`.
- **Full Book Management (CRUD)** — Logged-in users can add books (with image URL), edit their own books, and delete them with a custom confirmation modal.
- **Smart Borrow System** — Borrowing decrements `availableCopies` atomically (`$inc`), returning restores it; double-borrowing the same book is blocked (409).
- **Route Protection** — Private pages (Book Details, Add Book, My Books, My Borrows) redirect guests to login and send them back after signing in via `callbackUrl`.
- **Modern UI** — Next.js 16 App Router + Tailwind CSS v4 + shadcn components, Swiper hero slider, toast notifications, and a fully responsive layout.

## Tech Stack

- **Client:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn, Swiper, Sonner, BetterAuth
- **Server:** Express 5, MongoDB (native driver), jose (JWT/JWKS verification)

## Run Locally

### Server

```bash
cd booknook-server
npm install
npm run dev
```

### Client

```bash
cd book-nook-client
npm install
npm run dev
```
