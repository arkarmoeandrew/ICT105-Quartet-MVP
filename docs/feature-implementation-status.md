# Lab 10 – Feature Implementation Status

## Purpose

Use this file to prove that the prototype implementation is connected to `system-requirements.md`.

| Req ID | Required Functionality | Prototype Screen/Module | Current Status | Evidence | Next Fix Needed |
|--------|------------------------|-------------------------|----------------|----------|-----------------|
| FR-01 | Homepage / Landing Screen | Homepage | Working Draft | `/prototype/index.html`, Issue #30 | Improve responsive layout |
| FR-02 | Login / Authentication | Login | In Progress | `/prototype/login.html`, Issue #34 | Complete authentication flow |
| FR-03 | Resource Submission | Create Listing | In Progress | `/prototype/create-listing.html`, Issue #31 | Improve validation |
| FR-04 | Data Storage | Supabase Database | In Progress | Supabase Tables, Issue #34 | Complete database integration |
| FR-05 | Marketplace Record List | Marketplace | Working Draft | `/prototype/marketplace.html`, Issue #32 | Connect live data |
| FR-06 | Search & Category Filter | Marketplace | In Progress | `script.js`, Issue #34 | Optimize filtering |
| FR-07 | Resource Detail View | Detail Page | Working Draft | `/prototype/detail.html`, Issue #32 | Improve UI |
| FR-08 | Request & Status Tracking | Requests | In Progress | Request Module, Issue #33 | Complete status workflow |
| FR-09 | Admin Functions | Admin Dashboard | In Progress | `/prototype/admin.html`, Issue #33 | Finish moderation features |
| FR-10 | Form Validation | Submission Form | Working Draft | JavaScript Validation | Improve error handling |
| FR-11 | Confirmation Messages | Request Workflow | In Progress | JavaScript Alerts | Add better success/error messages |
| FR-12 | Dashboard / Summary | Dashboard | In Progress | Dashboard Module, Issue #33 | Display live statistics |
| FR-13 | UI Consistency | All Pages | Working Draft | Shared CSS Styles | Improve design consistency |
| FR-14 | Mobile Responsive Design | Entire Website | In Progress | Responsive CSS | Optimize tablet/mobile layouts |
| FR-15 | Privacy & Responsible Data Handling | Authentication / Database | In Progress | Supabase RLS, Lab 09 Documents | Additional security testing |
| FR-16 | Final Prototype Traceability | Documentation | Working Draft | Issues, README, Feature Mapping | Continue updating documentation |

---

## Summary

- **Features working today:** Homepage, Marketplace List, Detail View, Basic Navigation
- **Features partially working:** Login, Listing Submission, Search & Filter, Dashboard, Admin, Status Tracking
- **Features not yet started:** None
- **Features requiring instructor feedback:** Final integration, usability testing, and deployment review

- # Feature Implementation Status

> Update this file during Lab 11. Every prototype feature must connect to `system-requirements.md`.

| Req ID | Required Functionality | Screen/Module | Lab 10 Status | Lab 11 Status | Owner | Evidence Screenshot/Commit | Notes/Next Action |
|---|---|---|---|---|---|---|---|
| FR-01 | Homepage or landing screen | Homepage | Partially Completed | Completed | Project Team | Homepage Screenshot | Improved homepage layout, navigation, branding, and featured items. |
| FR-02 | Primary user pathway | User Flow | Partially Completed | Completed | Project Team | User Flow Screenshot | Users can browse items, view details, submit borrow requests, and receive confirmation. |
| FR-03 | User input/submission | Input Form | Partially Completed | Completed | Project Team | Borrow Form Screenshot | Borrow request form supports user input with validation and successful submission. |
| FR-04 | Data storage/record management | Data Layer | Partially Completed | Completed | Project Team | GitHub Commit – Dataset Integration | PrototypeRecords and ActivityLog datasets are connected and used in Power BI. |
| FR-05 | View records/list | Record List | Partially Completed | Completed | Project Team | Item List Screenshot | Item list displays all available records with current status and category. |
| FR-06 | Search/filter/category | Search/Filter | Pending | Completed | Project Team | Search & Filter Screenshot | Search function and category filters help users quickly locate items. |
| FR-07 | Detail view | Detail Page/Section | Pending | Completed | Project Team | Item Detail Screenshot | Detail page provides complete information for each borrowable item. |
| FR-08 | Status/progress tracking | Status Module | Pending | Completed | Project Team | Status Module Screenshot | Tracks Available, Borrowed, Pending, Returned, Claimed, and Closed item status. |
| FR-09 | Admin/manager function | Admin View | Pending | Partially Completed | Project Team | Admin Dashboard Screenshot | Admin can review requests and update item status. Additional management features can be added later. |
| FR-10 | Validation/error prevention | Forms | Pending | Completed | Project Team | Form Validation Screenshot | Required fields and validation messages reduce invalid submissions. |
| FR-11 | Confirmation/feedback message | Submission Flow | Pending | Completed | Project Team | Confirmation Message Screenshot | Users receive a success message after submitting a borrow request. |
| FR-12 | Dashboard/analytics view | Dashboard | Pending | Completed | Project Team | Power BI Dashboard Screenshot | Startup Metrics Dashboard includes KPI cards, charts, slicers, requirement coverage, and record details using the required DAX measures. |
| FR-13 | UI consistency | All Screens | Partially Completed | Completed | Project Team | UI Screenshot | Consistent colours, typography, spacing, icons, and navigation across all pages. |
| FR-14 | Mobile/responsive consideration | All Screens | Pending | Partially Completed | Project Team | Mobile View Screenshot | Main pages support mobile devices, with additional responsive improvements planned. |
| FR-15 | Privacy/responsible data handling | Data Collection | Pending | Partially Completed | Project Team | Privacy Documentation | Only required prototype data is collected. Authentication and security can be enhanced in future versions. |
| FR-16 | Final prototype traceability | Documentation | Pending | Completed | Project Team | GitHub Repository & README | Documentation, screenshots, testing notes, startup metrics, and implementation evidence have been completed and uploaded. |
