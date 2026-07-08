# Technical Architecture

## Project Title
RSU Nexus – Campus Resource Marketplace

## 1. Selected Prototype Platform

- Frontend + localStorage or JSON

The final prototype will be developed using **HTML, CSS, JavaScript, and localStorage/JSON**.

## 2. Architecture Decision

This platform is suitable because the project is a semester MVP prototype and does not require a full production backend. HTML, CSS, and JavaScript are enough to create an interactive web app where users can browse resources, create listings, search/filter records, view details, and simulate request/contact actions. localStorage or JSON can be used to store and display sample resource data during the prototype demonstration.

## 3. Main Components

| Component | Description | Tool / Technology | Related Requirement |
|---|---|---|---|
| User Interface | Homepage, navigation, marketplace screens, and responsive layout | HTML, CSS | FR-01, FR-02, FR-13, FR-14 |
| Data Input Form | Create resource listing form with required fields and validation | HTML Form, JavaScript | FR-03, FR-10, FR-11 |
| Data Storage | Store or simulate resource listings, users, requests, and statuses | localStorage / JSON | FR-04 |
| Record List | Display marketplace resource cards or list view | HTML, JavaScript | FR-05 |
| Detail View | Show full resource information and availability status | HTML, JavaScript | FR-07, FR-08 |
| Admin Function | Allow admin to edit, delete, or update listing status | JavaScript, localStorage | FR-09, FR-08 |
| Dashboard / Summary | Show total listings, available resources, reserved items, and category summary | JavaScript, HTML | FR-12 |

## 4. What Will Be Fully Implemented?

- Homepage / landing screen
- Browse marketplace listings
- Create resource listing form
- Search and filter resources
- View resource detail page
- Availability status display
- Contact owner request simulation
- Basic form validation
- Confirmation and error messages
- My listings management
- Basic admin listing management
- Simple dashboard summary
- Responsive user interface

## 5. What Will Be Simulated?

- RSU student login and verification
- Database storage using localStorage or JSON instead of a real backend
- Contact owner / request message
- Admin account role
- Request approval or rejection status
- Notification or confirmation messages

## 6. Final Prototype Risk

The biggest technical risk is implementing too many marketplace features within the semester timeline. To reduce this risk, the group will focus on the core MVP workflow: homepage, create listing, browse/search marketplace, view details, contact owner, and basic admin management. More advanced features such as real-time chat, online payment, push notifications, and full authentication will remain out of scope for the current semester.
