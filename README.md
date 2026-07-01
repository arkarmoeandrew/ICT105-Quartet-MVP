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
