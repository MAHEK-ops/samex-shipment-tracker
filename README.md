# Samex Shipment Tracker

A shipment tracking dashboard built with Node.js + Express and React + Vite.

---

## Running the app

### Backend
```bash
cd server
npm install
npm run dev
```
Runs on http://localhost:3001

### Frontend
```bash
cd client
npm install
npm run dev
```
Runs on http://localhost:5173

---

## What I'd do next with more time

- **Database** — swap the JSON file for PostgreSQL or MongoDB so data scales and survives concurrent writes cleanly
- **Search improvement** — extend filtering to cover sender, receiver, and origin, not just destination
- **Shipment detail view** — clicking a row opens a timeline showing the full status history with timestamps
- **Real-time updates** — add WebSocket or polling so multiple users see status changes without refreshing
- **Auth** — role-based access so only dispatchers can update statuses and drivers see only their assigned shipments
- **Pagination** — table becomes unusable past ~100 rows; add server-side pagination
- **Tests** — unit tests for status transition logic and integration tests for all three API endpoints