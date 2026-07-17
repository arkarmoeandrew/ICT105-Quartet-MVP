# RSU Nexus – Campus Resource Marketplace

ICT105 Quartet MVP repository

## Project Overview

RSU Nexus is a student-developed campus marketplace for RSU students who need temporary access to academic equipment, learning resources, or student services. Students can discover listings, submit requests, track status, and offer resources or services through one organized platform.

The project addresses a recurring problem: information is scattered across friends, LINE groups, Facebook groups, Discord communities, clubs, and personal networks. RSU Nexus is designed for the RSU community but is not an official Rangsit University platform.

## Target Users

- RSU students
- Campus club members
- Students who lend equipment or provide student services
- Authorized administrators who moderate marketplace content

## Project Source of Truth

| Information | Canonical Source |
|---|---|
| Project title and overview | `/README.md` |
| Functional requirement IDs and meanings | `/docs/system-requirements.md` |
| User stories | `/docs/user-stories.md` |
| MVP feature scope | `/docs/mvp-feature-list.md` |
| Feature traceability | `/docs/feature-requirement-mapping.md` |
| Final prototype architecture | `/docs/technical-architecture.md` |
| Data model | `/docs/data-structure.md` |
| Lab 08 validation data | `/data/validation-results.csv` |
| Historical decisions and contributions | `/docs/weekly-logbook.md` |

## Project Evolution

The Lab 01 idea described equipment lending and peer skill support. In Lab 02, the team selected the working concept “Campus Equipment Lending & Student Services Marketplace.” Lab 04 finalized the official title **RSU Nexus – Campus Resource Marketplace** and clarified that the platform covers three listing categories:

- Academic equipment
- Learning resources
- Student services

The problem, target users, and request-based workflow remained consistent throughout this refinement. Full real-time chat, payments, complex booking, ratings, and reviews remain outside the first MVP scope.

## Lab 01: Repository Setup and Initial Idea

The team created the GitHub repository, established the document structure, invited members, and recorded the initial resource-sharing problem area.

Main evidence:

- `/docs/idea-log.md`
- `/docs/team-profile.md`
- `/docs/weekly-logbook.md`

## Lab 02: Opportunity Scanning and Selection

The team reviewed six opportunities using the NUF (New, Useful, Feasible) method. RSU Nexus received the highest score of 15/15 and was selected as the semester project.

Main evidence:

- `/docs/opportunity-scan.md`
- `/docs/selected-opportunity.md`
- `/data/opportunity-scoring.xlsx`

## Lab 03: Customer Problem Discovery

The team collected 15 student responses and found that students frequently need temporary resources or peer support, rely on fragmented informal channels, and prefer a trusted student-only platform.

### Lab 03 Decision

Continue developing **RSU Nexus – Campus Resource Marketplace** with equipment, learning-resource, student-service, search, request, and verified-access features. Ratings and reviews were suggested during discovery but were postponed beyond the first MVP.

Main evidence:

- `/docs/problem-notes.md`
- `/docs/customer-questions.md`
- `/docs/assumption-evidence-table.md`
- `/docs/customer-discovery-summary.md`
- `/data/raw-responses.xlsx`

## Lab 04: Persona, Requirements, and User Stories

The authoritative requirement baseline is defined in `/docs/system-requirements.md`. Earlier feature-specific FR labels were consolidated into the lecturer’s FR-01 to FR-16 structure during Lab 04.

| Requirement | Canonical Meaning |
|---|---|
| FR-01 | Homepage / landing screen |
| FR-02 | Primary user pathway |
| FR-03 | User input / data submission |
| FR-04 | Data storage / record management |
| FR-05 | Records / information list |
| FR-06 | Search / filter / category function |
| FR-07 | Detail view |
| FR-08 | Status / progress tracking |
| FR-09 | Admin / manager function |
| FR-10 | Validation / error prevention |
| FR-11 | Confirmation / feedback |
| FR-12 | Dashboard / summary |
| FR-13 | UI consistency |
| FR-14 | Responsive design |
| FR-15 | Privacy / responsible data handling |
| FR-16 | Prototype traceability |

The aligned user stories are US-01 to US-08 and cover verified access, listing creation, search, details, requests, My Listings, admin moderation, and dashboard summaries.

Main evidence:

- `/docs/user-persona.md`
- `/docs/system-requirements.md`
- `/docs/user-stories.md`
- `/docs/mvp-feature-list.md`
- `/diagrams/user-flow.png`
- `/diagrams/use-case-diagram.png`

## Lab 05: Wireframes and Prototype Planning

The wireframes map to the Lab 04 requirements and user stories. The repository currently stores each screenshot inside a `.png`-named directory; the exact existing paths are listed below so references remain valid without renaming binary files.

| Screen | Current Repository Path |
|---|---|
| Homepage | `/wireframes/homepage.png/Screenshot 2569-07-08 at 22.02.41.png` |
| Create Listing | `/wireframes/input-form.png/Screenshot 2569-07-08 at 22.39.15.png` |
| Marketplace | `/wireframes/record-list.png/Screenshot 2569-07-08 at 23.20.12.png` |
| Listing Details / Request State | `/wireframes/details-view.png/Screenshot 2569-07-08 at 23.23.03.png` |
| Dashboard / My Listings State | `/wireframes/Dashboard.png/Screenshot 2569-07-08 at 22.29.40.png` |
| Admin View | `/wireframes/admin-view.png/Screenshot 2569-07-08 at 23.18.01.png` |

Main evidence:

- `/docs/product-concept.md`
- `/docs/feature-requirement-mapping.md`
- `/docs/wireframe-specification.md`
- `/docs/wireframe-usability-checklist.md`

## Lab 06: Business Model and Technical Design

### Architecture Revision

The original Lab 06 plan used `localStorage` or JSON for a simulated prototype. The team later finalized the following shared architecture for the final prototype:

| Component | Final Technology |
|---|---|
| Frontend | HTML5, CSS3, vanilla JavaScript |
| Authentication | Supabase Authentication |
| Database | Supabase PostgreSQL |
| Image storage | Supabase Storage |
| Access control | Supabase Row Level Security |
| Hosting | Vercel |
| Version control | GitHub |

`localStorage` and sample JSON may be used only for isolated frontend development or fallback demonstration data; Supabase is the final persistent system of record.

Main evidence:

- `/docs/business-model-canvas.md`
- `/docs/feature-value-mapping.md`
- `/docs/technical-architecture.md`
- `/docs/data-structure.md`
- `/diagrams/system-architecture.mmd`
- `/diagrams/data-flow.mmd`
- `/data/sample-record.csv`

## Lab 07: MVP Experiment Design

The experiment was designed to test whether students can complete the core workflow without assistance:

**Homepage → Login → Browse/Search → Listing Details → Submit Request → Check Status**

The Lab 07 plan required at least five testers and set an 80% task-success target plus average ease-of-use and usefulness targets of 4 out of 5. Lab 08 later expanded the completed validation dataset to 12 users.

Main evidence:

- `/docs/mvp-experiment-plan.md`
- `/docs/critical-assumptions.md`
- `/docs/experiment-script.md`
- `/docs/success-metrics.md`
- `/docs/feedback-form.md`
- `/diagrams/experiment-flow.md`

## Lab 08: Customer Validation and Analytics

### Dates

- Validation testing date: 14 July 2026
- Analysis and documentation date: 15 July 2026

### Dataset-Aligned Results

| Metric | Result |
|---|---:|
| Total test users | 12 |
| Completed tasks | 10 |
| Task success rate | 83.3% |
| Average completion time | 108.75 seconds |
| Average ease-of-use score | 4.17 out of 5 |
| Average usefulness score | 5.00 out of 5 |
| Average interest level | 4.25 out of 5 |
| Users with confusion points | 8 of 12 (66.7%) |
| Would-use-again rate | 100% |

### MVP Decision

**Partially Validated – Continue with Minor Revisions**

The task-success rate exceeded the Lab 07 target. Search/filter visibility, status explanations, form validation, listing details, request-button wording, admin controls, mobile responsiveness, and privacy handling still require improvement.

### Lab 08 Evidence

- `/data/validation-results.csv` — canonical text dataset
- `/data/validation-results.xlsx` — Excel copy; binary file not modified during the text-consistency review
- `/data/Quartet_Validation_Analytics.pbix` — Power BI report; binary file not modified
- `/docs/customer-validation-summary.md`
- `/docs/analytics-insights.md`
- `/docs/mvp-decision.md`
- `/docs/test-user-notes.md`
- `/screenshots/lab08_powerbi_dashboard.png` — current dashboard image path
- `/screenshots/validation-test-screens.png` — currently a placeholder and must be replaced manually with a valid screenshot
- `/docs/weekly-logbook.md`

## Lab 09 – Responsible IT Check

### Responsible Design Summary

During Lab 09, the RSU Nexus team reviewed the prototype from legal, ethical, privacy, intellectual property, and security perspectives to ensure responsible system design before implementation.

The review identified several improvements:

- Clarified that **RSU Nexus is an ICT105 student project** and is **not an official Rangsit University service**.
- Reviewed the **"Verified RSU students"** claim to ensure it is not misleading before verification is implemented.
- Applied **data minimization**, ensuring only necessary information is collected while excluding sensitive data such as national ID numbers, home addresses, payment information, and medical records.
- Improved **privacy protection** by recommending private platform communication instead of displaying personal phone numbers or email addresses.
- Documented **third-party assets, licences, and AI-assisted development tools** including the homepage image, Figma, OpenAI, Supabase, Vercel, GitHub, and Power BI.
- Reviewed **basic security risks** including authentication, administrator access, ownership control, uploaded files, secret-key management, and Supabase Row Level Security.
- Created a **risk register** documenting project risks, mitigation actions, responsible owners, and GitHub traceability.
- Recorded all requirement clarifications without changing the official FR-01 to FR-16 baseline.

Overall, the review concluded that the project is **safe to continue with revision**, provided that the identified privacy, security, moderation, and verification improvements are completed before the final implementation.

---

### Files Added

#### Documentation

- docs/legal-ethical-checklist.md
- docs/privacy-and-data-protection.md
- docs/ip-and-third-party-assets.md
- docs/security-risk-check.md
- docs/risk-register.md
- docs/updated-requirements-note.md


#### Existing Files Updated

- README.md
- docs/weekly-logbook.md

---

### Requirement Update

The official **FR-01 to FR-16** requirements were **not replaced or renumbered**.

Instead, Lab 09 introduced **requirement clarifications** related to:

- Student-project disclaimer
- Privacy and responsible data collection
- Verification claims
- Access control
- Administrator authorization
- Listing ownership
- Status explanations
- Upload validation
- Fair moderation
- Security controls
- Intellectual property
- Project traceability

These clarifications were documented in:

- docs/updated-requirements-note.md

---

### Team Contributions

| Member | Main Contribution | GitHub Issues |
|---|---|---|
| **Arkar Moe** | Legal and ethical review, intellectual property review, homepage wording, documentation updates | #21, #25 |
| **Thiri Shin Thant Ko** | Requirement review and requirement update documentation | #22 |
| **Min Khant Ko** | Data inventory, privacy review, responsible design risk register | #23, #24, #27 |
| **Lin Htet Aung** | Security review, README update, weekly logbook update | #26, #28 |
## Current Status After Lab 08

The project direction is validated well enough to continue with minor revisions. The next implementation stage should follow the requirement baseline, the revised Supabase/Vercel architecture, and the evidence-based improvements recorded in the Lab 08 documents and GitHub Issues.
