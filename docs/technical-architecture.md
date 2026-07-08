# Technical Architecture

## Project Title
RSU Nexus – Campus Resource Marketplace

## 1. Selected Prototype Platform

- Frontend: HTML/CSS/JavaScript
- Backend: Supabase

## 2. Architecture Decision

HTML, CSS, and JavaScript provide a simple and responsive web interface, while Supabase manages authentication and data storage. This architecture is suitable for the project scope and supports the required MVP features.

## 3. Main Components

| Component | Description | Tool / Technology | Related Requirement |
|---|---|---|---|
| User Interface | Responsive web interface | HTML, CSS, JavaScript | FR-01, FR-13, FR-14 |
| Data Input Form | Create resource listings | HTML Forms, JavaScript | FR-03, FR-10, FR-11 |
| Data Storage | Store users and resource listings | Supabase | FR-04 |
| Record List | Display marketplace listings | JavaScript, Supabase | FR-05, FR-06 |
| Detail View | Show resource information | HTML, JavaScript | FR-07, FR-08 |
| Admin Function | Manage listings and update status | Supabase | FR-09 |
| Dashboard / Summary | Display resource statistics | JavaScript | FR-12 |

## 4. What Will Be Fully Implemented?

- User login
- Create resource listing
- Browse marketplace
- Search and filter resources
- View resource details
- Manage personal listings

## 5. What Will Be Simulated?

- Notifications
- Admin approval process
- Dashboard statistics (using sample data)

## 6. Final Prototype Risk

The main risk is integrating the frontend with Supabase. This will be reduced by developing and testing each feature incrementally before integration.
