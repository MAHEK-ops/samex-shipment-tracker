# Shipment Tracker - Samex.Delivery Engineering Assignment

## Project Overview

A lightweight shipment tracking dashboard built for the Samex.Delivery Full Stack Engineering Intern assignment.

The application allows logistics teams to create shipments, track their status through a defined workflow, and search/filter across active shipments.

The implementation prioritized a reliable end-to-end flow under a strict 30–60 minute time constraint - focusing on working core functionality before optional enhancements.

---

## Features

- View all shipments in a structured table (Tracking ID, Sender, Receiver, Route, Status, Date)
- Create new shipments with basic input validation
- Update shipment status via inline dropdown with only valid next transitions available
- Status transition enforcement at the API level
- Search shipments by destination in real time
- Filter shipments by status (Pending, Picked Up, In Transit, Delivered, Cancelled)
- Stats strip showing live counts:
  - Total
  - Pending
  - In Transit
  - Delivered
  - Cancelled
- Error states with retry handling if the API is unavailable
- 8 pre-seeded realistic shipment records
- Persistent storage using a JSON file

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
│   ├── data/
│   │   └── shipments.json
│   ├── controllers/
│   │   └── shipmentController.js
│   ├── routes/
│   │   └── shipmentRoutes.js
│   ├── utils/
│   │   └── statusFlow.js
│   └── app.js
│
└── client/
    └── src/
        ├── components/
        │   ├── ShipmentTable.jsx
        │   ├── CreateShipmentForm.jsx
        │   ├── FilterBar.jsx
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

### Separation of Responsibilities

- Routes are kept thin and only map HTTP endpoints to controller functions
- Business logic is isolated inside controllers and utility files
- Status transition rules are centralized in `statusFlow.js`
- API requests are abstracted into a frontend service layer
- UI components are kept reusable and focused on presentation

---

## API Endpoints

### GET `/api/shipments`

Returns all shipments.

**Response**

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
    "createdAt": "2026-05-18T08:00:00.000Z"
  }
]
```

---

### POST `/api/shipments`

Creates a new shipment.

**Request**

```json
{
  "sender": "Neha Gupta",
  "receiver": "Arjun Kapoor",
  "origin": "Pune",
  "destination": "Delhi"
}
```

**Response**

```json
{
  "id": "f04c3824-779e-4469-a358-6312ac6795af",
  "trackingId": "SHP-1009",
  "sender": "Neha Gupta",
  "receiver": "Arjun Kapoor",
  "origin": "Pune",
  "destination": "Delhi",
  "status": "Pending",
  "createdAt": "2026-05-18T10:00:00.000Z"
}
```

---

### PATCH `/api/shipments/:id/status`

Updates shipment status.

**Request**

```json
{
  "status": "Picked Up"
}
```

**Response**

```json
{
  "status": "Picked Up"
}
```

**Invalid Transition**

```json
{
  "error": "Invalid status transition"
}
```

---

## Status Transition Rules

```text
Pending → Picked Up → In Transit → Delivered
     ↓            ↓            ↓
 Cancelled    Cancelled   Cancelled
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

> Both frontend and backend servers should run simultaneously.

---

## Seed Data

The application includes 8 seeded shipments covering different shipment states:

- Pending
- Picked Up
- In Transit
- Delivered
- Cancelled

Tracking IDs follow:

```text
SHP-1001
SHP-1002
SHP-1003
```

---

## Architecture Decisions

| Decision | Reason |
|------------|---------|
| JSON storage | Reduced setup overhead for a time-boxed assignment |
| Separate routes/controllers/utils | Clear responsibility separation |
| Dedicated status transition utility | Single source of truth for business rules |
| Tracking ID generation | Simulates realistic logistics workflows |
| Service layer for API calls | Keeps components cleaner and easier to maintain |

---

## Tradeoffs Under Time Constraints

To prioritize a working end-to-end experience within the assignment window:

- Used JSON storage instead of a database to minimize setup time
- Focused on core shipment workflows before optional features
- Avoided authentication and deployment setup initially
- Prioritized functionality and reliability over advanced UI polish

---

## What I Would Do Next With More Time

- Replace JSON storage with PostgreSQL or MongoDB
- Add shipment history with timestamps for every status update
- Implement real-time updates using WebSockets
- Expand search capabilities (sender, receiver, origin)
- Add server-side pagination for large datasets
- Introduce role-based access control
- Add unit and integration tests

---

## AI-Assisted Workflow

AI tools used:

- Claude
- ChatGPT

AI accelerated:

- Project scaffolding
- Component structure generation
- API implementation patterns
- Faster iteration during development

Manual review and validation performed for:

- Business logic
- Status transition rules
- Folder structure decisions
- Final testing and cleanup

Generated outputs were reviewed, understood, and adjusted before integration.