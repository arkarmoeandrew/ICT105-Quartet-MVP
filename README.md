# ICT105-Quartet-MVP

## Initial Problem Area

University students frequently need short-term access to specialized tools, textbooks, equipment, or peer assistance, but finding available resources on campus is often difficult, time-consuming, and disorganized.

## Target Users

- University Students
- Campus Club Members

## Selected IT Venture Direction

RSU Nexus – Campus Resource Marketplace

Our team selected a RSU Nexus – Campus Resource Marketplace. The platform allows students to lend academic equipment, offer academic services, and request resources or assistance from other students within the campus community. The goal is to make campus resources and student services easier to discover, access, and manage.

## Current Status

In Lab 02, we reviewed six possible IT opportunities, evaluated them using the NUF (New, Useful, Feasible) scoring method, and selected the RSU Nexus – Campus Resource Marketplace as our semester project opportunity.

## Next Step

In Lab 03, we will prepare customer discovery questions, interview university students, collect evidence about the problem, and validate whether students need a dedicated campus equipment and student services marketplace.

## Lab 03 Customer Discovery Findings

The team conducted customer discovery interviews with RSU students to validate the selected opportunity.

### Key Findings

- Students frequently need temporary access to academic equipment and learning resources.
- Students usually rely on friends, LINE groups, and Facebook groups.
- Finding equipment or students offering academic services takes significant time.
- Students prefer a trusted university-only platform.
- Students value both equipment lending and student service features.

### Decision

The team will continue developing RSUNexus as a Campus Equipment Lending and Student Services Marketplace.

## Lab 04: User Persona, Requirements, and User Stories

In Lab 04, our team refined **RSU Nexus – Campus Resource Marketplace** by creating an evidence-based user persona, defining functional and non-functional requirements, writing user stories with acceptance criteria, prioritizing MVP features, and preparing the user flow and use case diagrams.

### Primary Target User

The primary target user of **RSU Nexus – Campus Resource Marketplace** is an RSU student who needs temporary access to academic equipment, learning resources, or student services for coursework and projects. The user needs a trusted campus platform to search, request, and manage resources more efficiently.

### Persona Summary

- **Persona name:** Andrew, Year 2 Computer Science Student
- **User type:** RSU student who needs to borrow academic equipment and find student services
- **Main goal:** Find academic resources, equipment, and student services quickly through a trusted campus marketplace
- **Main pain point:** Information is scattered across LINE groups, Facebook groups, Discord, friends, seniors, and personal networks
- **Current workaround:** Asking friends, posting in group chats, contacting seniors, borrowing from classmates, or renting equipment outside the university

### Key Requirements

| Req ID | Requirement | Priority | Related Evidence |
|---|---|---|---|
| FR-01 | The system shall allow students to create an account and log in using their RSU email. | Must | E01, E05, E09 |
| FR-02 | The system shall allow users to post academic resources, equipment, or student services with title, description, category, availability, and contact details. | Must | E01, E02, E04, E06 |
| FR-03 | The system shall allow users to search and filter listings by category, resource type, or keyword. | Must | E01, E02, E05, E08 |
| FR-04 | The system shall allow users to view detailed information about a resource or student service before contacting the owner. | Should | E03, E06, E09 |
| FR-05 | The system shall allow users to request or contact the listing owner regarding a resource or service. | Must | E02, E04, E10 |
| FR-06 | The system shall allow users to edit or remove their own listings. | Could | E10 |
| FR-07 | The system shall display the availability status of each resource or student service, such as Available, Borrowed, Pending, or Unavailable. | Must | E03, E10 |
| FR-08 | The system shall allow an admin or manager to review, edit, approve, or remove invalid marketplace listings. | Must | Course Requirement |
| FR-09 | The system shall validate required fields when users create listings or submit requests. | Must | E02, E04, E10 |
| FR-10 | The system shall display confirmation or feedback messages after users submit, update, or delete information. | Must | E02, E04, E10 |
| FR-11 | The system shall provide a simple dashboard or summary view showing marketplace information such as total listings, available resources, pending requests, or service categories. | Should | Course Requirement |
| FR-12 | The system shall provide clear navigation and consistent screens for the main marketplace workflow. | Must | Course Requirement |
| NFR-01 | The interface shall be mobile-friendly and easy to use for university students. | Must | E01, E05, E08 |
| NFR-02 | The system shall protect user information by allowing only verified RSU students to access the marketplace. | Must | E05, E09 |
| NFR-03 | Search results and listings shall load within three seconds during demonstration. | Should | E02, E04, E05 |
| NFR-04 | The project shall be maintained in GitHub with README, commits, issues, and documentation. | Must | Course Requirement |

### MVP Feature Scope

| Feature | Priority | Included in Final Prototype? |
|---|---|---|
| RSU student login | Must | Yes |
| Create resource listing | Must | Yes |
| Search and filter marketplace | Must | Yes |
| View listing details | Should | Yes |
| Contact resource owner | Must | Yes |
| Manage my listings | Could | Optional |
| Availability status | Must | Yes |
| Admin listing review | Must | Yes |
| Validation and error messages | Must | Yes |
| Confirmation / feedback messages | Must | Yes |
| Dashboard / summary view | Should | Yes |
| Clear navigation and consistent UI | Must | Yes |
| Mobile-friendly interface | Must | Yes |
| Verified RSU student access | Must | Yes |
| Fast search performance | Should | Yes |
| GitHub documentation | Must | Yes |
| Full private real-time messaging | Future | No |
| Online payment / booking system | Future | No |
| Ratings and reviews | Future | No |

### Diagram Links

- **User flow diagram:** diagrams/user-flow.png
- **Use case diagram:** diagrams/use-case-diagram.png

### GitHub Contribution Evidence

All members contributed to this repository through commits, issues, documentation updates, diagrams, or requirement preparation. During Lab 04, the team completed the user persona, system requirements, user stories, MVP feature list, user flow diagram, use case diagram, and README update for **RSU Nexus – Campus Resource Marketplace**.
# Lab 05: Wireframes and Prototype Planning

In Lab 05, our team designed low-fidelity wireframes for the **RSU Nexus – Campus Resource Marketplace**. These wireframes represent the core screens of the MVP and ensure that every screen is traceable to the system requirements, user stories, and MVP feature list developed in Lab 04.

### Wireframe Screens

The following wireframes were prepared for the final prototype:

- **Homepage** – Displays the project overview, target users, navigation, and main actions.
- **Resource Listing Form** – Allows students to create a new resource listing with validation.
- **Marketplace Listing** – Displays available resources with search and category filtering.
- **Resource Detail View** – Shows detailed information and the availability status of a selected resource.
- **Dashboard** – Displays a summary of marketplace statistics and resource information.
- **Admin Dashboard** – Allows administrators to manage listings and update resource status.

### User Flow

The user flow demonstrates the primary workflow of the system:

> Homepage → Login → Browse Marketplace → Search Resources → View Resource Details → Contact Resource Owner → Manage Listings

### Deliverables Completed

The following Lab 05 deliverables were completed:

| Deliverable | Status |
|---|---|
| Product Concept | ✅ Completed |
| Feature–Requirement Mapping | ✅ Completed |
| Wireframe Specification | ✅ Completed |
| Wireframe Usability Checklist | ✅ Completed |
| User Flow Diagram | ✅ Completed |
| Homepage Wireframe | ✅ Completed |
| Resource Listing Form Wireframe | ✅ Completed |
| Marketplace Wireframe | ✅ Completed |
| Resource Detail Wireframe | ✅ Completed |
| Dashboard Wireframe | ✅ Completed |
| Admin Dashboard Wireframe | ✅ Completed |
| Weekly Logbook Update | ✅ Completed |

### Wireframe Files

- `wireframes/homepage.png`
- `wireframes/input-form.png`
- `wireframes/record-list.png`
- `wireframes/detail-view.png`
- `wireframes/dashboard.png`
- `wireframes/admin-view.png`

### Diagram

- `diagrams/user-flow.png`

### GitHub Contribution Evidence

During Lab 05, the team completed the product concept, feature–requirement mapping, wireframe specification, usability checklist, user flow diagram, and all required wireframes for the **RSU Nexus – Campus Resource Marketplace**. These deliverables ensure that the final prototype follows the defined requirements and MVP scope.
# Lab 06: Business Model and Technical Design

In Lab 06, our team defined the business model and technical design for the **RSU Nexus – Campus Resource Marketplace**. We prepared the business model canvas, mapped MVP features to user and operational value, designed the system architecture and data flow, defined the data structure, and created a sample dataset to support the final prototype.

### Business Model Summary

The platform provides a centralized marketplace where RSU students can share and discover campus resources. The MVP focuses on improving resource accessibility, reducing unnecessary purchases, and encouraging collaboration within the university community.

### Technical Design Summary

The final prototype will be developed as a web application using **HTML, CSS, and JavaScript** for the frontend and **Supabase** for authentication and data storage. The system architecture and data flow diagrams illustrate how users interact with the platform and how resource information is managed.

### Data Structure Summary

The prototype includes three main entities:

- **Users** – RSU student accounts
- **Resources** – Campus resource listings
- **Requests** – Borrow and reservation requests

A sample dataset was prepared to support prototype development and testing.

### Deliverables Completed

| Deliverable | Status |
|---|---|
| Business Model Canvas | ✅ Completed |
| Feature–Value Mapping | ✅ Completed |
| Technical Architecture | ✅ Completed |
| Data Structure | ✅ Completed |
| System Architecture Diagram | ✅ Completed |
| Data Flow Diagram | ✅ Completed |
| Sample Dataset | ✅ Completed |
| Weekly Logbook Update | ✅ Completed |

### Documentation

- `docs/business-model-canvas.md`
- `docs/feature-value-mapping.md`
- `docs/technical-architecture.md`
- `docs/data-structure.md`

### Diagrams

- `diagrams/system-architecture.png`
- `diagrams/data-flow.png`

### Dataset

- `data/sample-records.csv`

### GitHub Contribution Evidence

During Lab 06, the team completed the business model canvas, feature–value mapping, technical architecture, data structure, system architecture diagram, data flow diagram, and sample dataset for the **RSU Nexus – Campus Resource Marketplace**. These deliverables provide the foundation for implementing the final MVP in the next development phase.


## Lab 07: MVP Experiment Design

### Experiment Objective
The objective of this experiment is to test whether RSU students can use the RSU Nexus prototype to find academic equipment, learning resources, or student services, understand listing details and availability, and submit a request without assistance before deeper system implementation.

### Critical Assumptions
1. RSU students experience difficulty finding reliable campus resources and student services through scattered channels such as Facebook, LINE, Discord, and personal networks.
2. Students will find a centralized and searchable campus marketplace more useful than relying on informal communication channels.
3. Students can understand the listing categories, search and filter functions, availability labels, and request-status workflow without significant assistance.

### MVP Experiment Type
The selected experiment type is an **interactive web prototype with form-based usability testing**.

This experiment type fits RSU Nexus because testers can interact with realistic screens and complete the main workflow:

**Homepage → Browse/Search → View Listing Details → Submit Request → Check Request Status**

The prototype will use HTML, CSS, and JavaScript for the frontend, Supabase for authentication and database services, and Vercel for deployment. This allows the team to test the core user experience using a live and accessible prototype before completing all advanced features.

### Success Metrics
- At least **80%** of testers can correctly explain the purpose of RSU Nexus after viewing the homepage.
- At least **80%** of testers can successfully find a target resource or service using search and filters.
- At least **80%** of testers can complete the main request workflow without assistance.
- At least **80%** of testers can correctly understand listing availability and request-status labels.
- At least **80%** of submitted listing forms contain valid and complete information.
- The average usability rating is at least **4 out of 5**.
- The average feature usefulness rating is at least **4 out of 5**.
- At least **80%** of testers indicate that they would consider using RSU Nexus if it were available.

### Files Added in Lab 07
- /docs/mvp-experiment-plan.md
- /docs/critical-assumptions.md
- /docs/experiment-script.md
- /docs/success-metrics.md
- /docs/feedback-form.md
- /docs/weekly-logbook.md

### Connection to Final Prototype
The Lab 07 experiment will help the team validate the main problem, critical assumptions, user workflow, and usability of RSU Nexus before deeper implementation. The testing results will show whether students can understand the platform, find suitable listings, submit requests, and follow request statuses successfully.

Feedback from testers will be used to improve navigation, search and filter controls, listing information, form validation, availability labels, request-status labels, and overall interface clarity. Features that meet the success targets will continue to the implementation sprint, while features that do not meet the targets will be revised and tested again.

This process will reduce development risk and help ensure that the final RSU Nexus prototype meets the real needs of RSU students.

# README Update – Lab 08

## Lab 08: Customer Validation and Analytics Sheet

### Validation Objective
The objective of the validation exercise was to evaluate whether RSU students could use the RSU Nexus prototype to search for academic equipment, learning resources, and student services, understand listing details, submit requests, and follow request statuses.

The group also evaluated the usability of the create-listing form, admin dashboard, mobile filtering, form validation, privacy handling, and confirmation messages.

### Prototype Version Tested
- Version: v0.1
- Link: https://github.com/arkarmoeandrew/ICT105-Quartet-MVP
- Screenshots: `/screenshots/validation-test-screens.png`

### Analytics Summary

| Metric | Result |
|---|---:|
| Total test users | 12 |
| Task success rate | 83.3% |
| Average feedback score | 4.17 out of 5 |
| Average interest level | 4.25 out of 5 |
| Main confusion point | Search and filtering |

### MVP Decision
**Continue with minor revisions.**

The RSU Nexus prototype achieved an 83.3% task-success rate, which exceeded the Lab 07 target of 80%. The average feedback score was 4.17 out of 5, and the average interest level was 4.25 out of 5.

These results support continuing with the RSU Nexus campus marketplace concept. However, the team will revise search and filter visibility, request-status explanations, form-validation messages, listing details, request-button wording, admin controls, mobile responsiveness, and privacy handling before deeper implementation.

### Files Added
- `/data/validation-results.xlsx`
- `/data/validation-results.csv`
- `/docs/customer-validation-summary.md`
- `/docs/analytics-insights.md`
- `/docs/mvp-decision.md`
- `/docs/test-user-notes.md`
- `/screenshots/validation-test-screens.png`
- `/screenshots/lab08-powerbi-dashboard.png`
- `/docs/weekly-logbook.md`

























