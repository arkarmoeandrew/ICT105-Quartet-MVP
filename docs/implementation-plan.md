# Lab 10 – Implementation Plan

## 1. Project Information

- Group name: Quartet
- Project title: RSU Nexus – Campus Resource Marketplace
- Repository link: https://github.com/arkarmoeandrew/ICT105-Quartet-MVP
- Selected platform/tools:
  - HTML5
  - CSS3
  - Vanilla JavaScript
  - Supabase (Authentication, PostgreSQL, Storage, Realtime)
  - Vercel
- Backend status: Real backend (Supabase)

---

## 2. Prototype Scope for Sprint 1

List the features your group will implement in Lab 10.

| Feature | Requirement ID | User Story ID | Screen/Module | Sprint 1 Status |
|---------|----------------|---------------|---------------|-----------------|
| Homepage / Landing Screen | FR-01 | US-01 | Homepage | In Progress |
| Login / Authentication | FR-02 | US-01 | Login | In Progress |
| Resource Submission Form | FR-03 | US-02 | Create Listing | In Progress |
| Data Storage (Supabase) | FR-04 | US-02 | Database | In Progress |
| Marketplace Record List | FR-05 | US-03 | Marketplace | In Progress |
| Search & Category Filter | FR-06 | US-03 | Marketplace | In Progress |
| Resource Detail View | FR-07 | US-04 | Detail Page | In Progress |
| Request & Status Tracking | FR-08 | US-05 | Requests | In Progress |
| Admin Management | FR-09 | US-07 | Admin Dashboard | In Progress |
| Form Validation | FR-10 | US-02 | Submission Form | In Progress |
| Confirmation Messages | FR-11 | US-05 | Request Workflow | In Progress |
| Dashboard / Summary | FR-12 | US-08 | Dashboard | In Progress |

---

## 3. Implementation Approach

Explain how your prototype will be built.

- **Frontend:** Semantic HTML5, CSS3, Vanilla JavaScript
- **Data source/storage:** Supabase PostgreSQL Database and Storage
- **Admin/status handling:** Supabase Authentication with Row Level Security (RLS) and administrator role management
- **Search/filter approach:** JavaScript filtering with Supabase queries by keyword, category, and availability
- **Validation approach:** Client-side JavaScript validation with confirmation and error messages
- **Screenshots/evidence approach:** GitHub commits, implementation screenshots, issue tracking, and prototype demonstration

---

## 4. Member Responsibilities

| Member | Responsibility | Evidence of Contribution |
|---------|----------------|--------------------------|
| Arkar Moe | Homepage, Marketplace List, Detail View | Commit / Issue / Screenshot |
| Min Khant Ko | Submission Form, Search & Filter, Supabase Integration | Commit / Issue / Screenshot |
| Thiri Shin Thant Ko | Implementation Planning, Feature Tracking, Documentation | Commit / Issue / Documentation |
| Lin Htet Aung | Dashboard, Admin Functions, README & Weekly Logbook | Commit / Issue / Screenshot |

---

## 5. Risks or Blockers

- Supabase configuration and authentication may require additional testing.
- Integration between frontend pages and database may introduce bugs.
- Responsive layout may require further adjustments across different devices.
- Team members must regularly merge GitHub changes to avoid conflicts.
- Additional testing and refinement may be required before the final implementation.
