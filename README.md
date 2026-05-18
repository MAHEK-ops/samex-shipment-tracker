# Shipment Tracker — Samex.Delivery Engineering Assignment

## Project Overview

A lightweight shipment tracking dashboard built for the Samex.Delivery Full Stack Engineering Intern assignment.

The application allows logistics teams to create shipments, track shipment progress through a defined workflow, and search/filter active shipments from a centralized dashboard.

The implementation prioritized a reliable end-to-end workflow under a strict 30–60 minute time constraint, focusing first on working functionality and maintainable structure before secondary enhancements.

---

## Features

- View all shipments in a structured dashboard table
- Create shipments with input validation
- Update shipment status using controlled workflow transitions
- Backend-enforced status validation
- Search shipments by destination
- Filter shipments by shipment status
- Sort shipments by date
- Live stats strip showing shipment counts
- Toast notifications for actions and errors
- Error states with retry handling
- Persistent JSON-based storage
- Shipment metadata support:
  - `createdAt`
  - `updatedAt`
  - `history`
- Modern glass-inspired logistics dashboard UI

---

## Tech Stack

| Layer | Technology |
|---------|------------|
| Backend | Node.js, Express (ES Modules) |
| Frontend | React 18, Vite |
| Storage | JSON File Storage |
| HTTP Client | Axios |

---

## Project Structure

```text
samex-shipment-tracker/
├── server/
│   ├── controllers/
│   │   └── shipmentController.js
│   │
│   ├── data/
│   │   └── shipments.json
│   │
│   ├── routes/
│   │   └── shipmentRoutes.js
│   │
│   ├── utils/
│   │   └── statusFlow.js
│   │
│   └── app.js
│
└── client/
    └── src/
        ├── components/
        │   ├── ShipmentTable.jsx
        │   ├── CreateShipmentForm.jsx
        │   ├── FilterBar.jsx
        │   ├── StatsStrip.jsx
        │   └── StatusBadge.jsx
        │
        ├── pages/
        │   └── Dashboard.jsx
        │
        ├── services/
        │   └── api.js
        │
        └── App.jsx
```

---

## Separation of Responsibilities

- Routes only map endpoints to controller functions
- Business logic is isolated inside controllers and utility files
- Status transition rules are centralized inside `statusFlow.js`
- API requests are abstracted into a frontend service layer
- Components remain reusable and focused on presentation

---

## API Endpoints

### GET `/api/shipments`

Returns all shipments.

Response:

```json
[
  {
    "id": "1",
    "trackingId": "SHP-1001",
    "sender": "Ravi Kumar",
    "receiver": "Priya Sharma",
    "origin": "Mumbai",
    "destination": "Delhi",
    "status": "Delivered",
    "createdAt": "2026-05-18T08:00:00.000Z",
    "updatedAt": "2026-05-18T08:00:00.000Z"
  }
]
```

---

### POST `/api/shipments`

Creates a new shipment.

Request:

```json
{
  "sender": "Neha Gupta",
  "receiver": "Arjun Kapoor",
  "origin": "Pune",
  "destination": "Delhi"
}
```

Response:

```json
{
  "id": "f04c3824-779e-4469-a358-6312ac6795af",
  "trackingId": "SHP-1009",
  "sender": "Neha Gupta",
  "receiver": "Arjun Kapoor",
  "origin": "Pune",
  "destination": "Delhi",
  "status": "Pending",
  "createdAt": "2026-05-18T10:00:00.000Z",
  "updatedAt": "2026-05-18T10:00:00.000Z",
  "history": [
    {
      "status": "Pending",
      "timestamp": "2026-05-18T10:00:00.000Z"
    }
  ]
}
```

---

### PATCH `/api/shipments/:id/status`

Updates shipment status.

Request:

```json
{
  "status": "Picked Up"
}
```

Response:

```json
{
  "status": "Picked Up"
}
```

Invalid transition:

```json
{
  "error": "Invalid status transition"
}
```

---

## Status Transition Rules

```text
Pending → Picked Up → In Transit → Delivered
     ↓            ↓             ↓
 Cancelled    Cancelled    Cancelled
```

Rules implemented:

- `Cancelled` is allowed from any non-delivered state
- `Delivered` and `Cancelled` are terminal states
- Invalid transitions are rejected by the backend
- Frontend only displays valid next transitions

---

## Running the Application

### Backend

```bash
cd server
npm install
npm run dev
```

Runs on:

```text
http://localhost:3001
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Runs on:

```text
http://localhost:5173
```

Both frontend and backend servers should run simultaneously.

---

## Architecture Decisions

| Decision | Reason |
|------------|---------|
| JSON storage | Reduced setup overhead within the assignment time limit |
| Separate routes/controllers/utils | Clear separation of responsibilities |
| Dedicated status utility | Single source of truth for business rules |
| Tracking ID generation | Simulates realistic logistics workflows |
| API service layer | Keeps components cleaner |
| Shipment metadata | Supports future timeline/history features |

---

## Tradeoffs Under Time Constraints

To prioritize a working end-to-end experience within the assignment window:

- Used JSON storage instead of a database
- Prioritized core shipment workflows first
- Focused on maintainability and clean architecture
- Deferred authentication and deployment

---

## What I Would Do Next With More Time

- Replace JSON storage with MongoDB/PostgreSQL
- Add real-time shipment updates using WebSockets
- Expand search to sender, receiver, and origin
- Add role-based access control
- Add server-side pagination
- Add shipment timeline view
- Add unit and integration tests

---

## AI-Assisted Workflow

### AI tools used

- Claude
- ChatGPT

AI helped accelerate:

- Initial project scaffolding
- Component generation
- API implementation patterns
- Faster UI iteration

Manual review and validation were performed for:

- Business logic
- Status transition rules
- Folder structure decisions
- Final testing and cleanup

Generated outputs were reviewed, understood, modified where needed, and validated before integration.