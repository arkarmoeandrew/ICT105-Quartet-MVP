# Technical Architecture

## Project Title

RSU Nexus – Campus Resource Marketplace

## 1. Selected Final Prototype Platform

- Frontend: HTML5, CSS3, and vanilla JavaScript
- Authentication: Supabase Authentication
- Database: Supabase PostgreSQL
- File storage: Supabase Storage
- Access control: Supabase Row Level Security (RLS)
- Hosting: Vercel
- Version control: GitHub

## 2. Architecture Decision and Revision History

The original Lab 06 plan used HTML, CSS, JavaScript, and `localStorage` or JSON to simulate the marketplace without a production backend. That approach was suitable for early interface planning and remains part of the project’s decision history.

After the requirements and experiment plan were refined, the team selected Supabase and Vercel for the final prototype. Persistent accounts, listings, requests, images, ownership rules, and request statuses require a shared backend that works across devices. Therefore, `localStorage` and sample JSON are now limited to isolated frontend development or fallback demonstration data; they are not the final system of record.

## 3. Main Components

| Component | Description | Tool / Technology | Related Requirement |
|---|---|---|---|
| Hosting | Deliver the frontend through a public test URL | Vercel | FR-14, FR-16 |
| User Interface | Homepage, navigation, marketplace, detail, form, and responsive screens | HTML5, CSS3, vanilla JavaScript | FR-01, FR-02, FR-05, FR-06, FR-07, FR-13, FR-14 |
| Authentication | Register, sign in, and maintain verified student sessions | Supabase Authentication | FR-02, FR-10, FR-15 |
| Data Input | Create listing and request forms with required-field validation | HTML forms, vanilla JavaScript | FR-03, FR-10, FR-11 |
| Database | Store profiles, categories, listings, requests, messages, and admin actions | Supabase PostgreSQL | FR-04 |
| Image Storage | Store listing images without placing binary data in database records | Supabase Storage | FR-03, FR-04, FR-15 |
| Marketplace Records | Display, search, filter, and open marketplace listings | Vanilla JavaScript, Supabase queries | FR-05, FR-06, FR-07 |
| Request and Status Workflow | Submit requests and show listing/request status changes | Vanilla JavaScript, Supabase PostgreSQL | FR-02, FR-04, FR-08, FR-11 |
| Admin Function | Allow authorized administrators to review and manage listings | Vanilla JavaScript, Supabase RLS | FR-09, FR-15 |
| Dashboard | Show listing, availability, category, and request summaries | Vanilla JavaScript, HTML, Supabase queries | FR-12 |

## 4. Intended Final Prototype Scope

- Homepage and verified RSU student access
- Marketplace browsing, search, and filtering
- Resource and student-service listing creation
- Listing details and availability status
- Request submission and request-status tracking
- Required-field validation and confirmation feedback
- My Listings management
- Authorized admin listing management
- Marketplace dashboard summary
- Responsive laptop and mobile layouts

## 5. Simplified or Simulated Elements

- RSU verification may be demonstrated through an approved email-domain check rather than integration with an official university identity system.
- Sample JSON may be used temporarily when developing an isolated frontend screen, but Supabase is the final persistent data source.
- Real-time chat, online payments, complex booking, push notifications, ratings, and reviews remain outside the first MVP scope.
- Email and push notifications may be represented by clear in-app confirmation and status messages.

## 6. Security and Delivery Risks

The main technical risks are incorrect access policies, exposed secrets, and attempting too many marketplace features within the semester timeline. The frontend may contain only the Supabase project URL and publishable/anon key. Secret keys, service-role keys, and database passwords must never be committed or exposed in browser code. RLS policies must ensure that users can change only their own records and that admin actions are limited to authorized accounts.

The group will reduce delivery risk by implementing and testing the core workflow first:

**Homepage → Login → Browse/Search → Listing Details → Submit Request → Check Status**
