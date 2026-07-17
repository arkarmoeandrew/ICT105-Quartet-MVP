# Critical Assumptions

## Instruction
Identify assumptions that could cause your final prototype to fail if they are wrong.

| Assumption ID | Category | Assumption | Related Requirement/User Story | Risk Level | Current Evidence | How to Test |
|---|---|---|---|---|---|---|
| A-01 | User problem | RSU students have difficulty finding academic equipment, learning resources, and student services through existing informal channels. | FR-01, FR-02 / US-03, US-05 | High | Lab 03 interviews and survey responses | Ask students to find a specific resource using their current method and compare the experience with RSU Nexus. |
| A-02 | Value proposition | Students will prefer using one centralized campus marketplace instead of searching through Facebook, LINE, Discord, and personal networks. | FR-05, FR-06 / US-03 | High | Lab 03 respondents showed interest in an organized and searchable platform. | Let students use the marketplace prototype and ask whether they would choose it over their current method. |
| A-03 | Value proposition | RSU students are willing to create listings and offer equipment, learning resources, or student services to other students. | FR-03 / US-02 | High | Some respondents said they would offer resources if users were verified. | Ask participants to create a sample listing and record how many are willing to publish it. |
| A-04 | Usability | Users can understand the difference between Equipment, Learning Resources, and Student Services. | FR-03, FR-06 / US-02, US-03 | Medium | Categories were developed from Lab 03 findings, but they have not been fully tested. | Give users sample listings and ask them to select the correct listing type and category. |
| A-05 | Usability | Students can use search and filters to find a suitable resource or service without assistance. | FR-05, FR-06 / US-03 | High | Search and filtering were identified as important, but the final interface has not yet been tested. | Ask users to find a specific listing and measure task completion, time, and errors. |
| A-06 | Usability | Users can understand availability and request statuses such as Available, Reserved, Pending, Approved, Rejected, and Completed. | FR-07, FR-08 / US-04, US-05 | Medium | No strong usability evidence yet | Show different status labels to users and ask them to explain the meaning and next action. |
| A-07 | Business logic | A request-and-approval workflow is enough for students to arrange resource borrowing or student services without a complex booking system. | FR-02, FR-08 / US-05 | High | Advanced booking was excluded from the MVP. | Ask users to submit, approve, reject, and complete a request, then identify any missing steps. |
| A-08 | Business logic | Students will feel comfortable contacting another student through a private request or messaging feature. | FR-02, FR-11, FR-15 / US-05 | Medium | Students currently use messaging applications, but the RSU Nexus workflow has not been tested. | Test the request/contact process and collect feedback about clarity, privacy, and safety. |
| A-09 | Technical feasibility | HTML, CSS, JavaScript, and the selected data-storage system can support the complete marketplace workflow. | FR-03, FR-04, FR-05, FR-08 | High | The selected technology supports the planned MVP, but full integration is incomplete. | Build and test one complete flow: create listing → store data → display listing → submit request → update status. |
| A-10 | Technical feasibility | The application will work correctly on mobile, tablet, and desktop screens. | FR-13, FR-14 | Medium | Responsive wireframes have been planned, but full device testing is incomplete. | Test the prototype at 375px, 768px, 1024px, and 1440px screen widths. |
| A-11 | Data handling | Students will trust the platform when access is limited to verified RSU accounts and unnecessary personal information is hidden. | FR-02, FR-10, FR-15 / US-01 | High | Lab 03 findings suggested that student verification would improve trust. | Show users the login, profile, verification, and privacy screens and ask whether they feel safe using the system. |
| A-12 | Data handling | Listings, requests, user information, and private messages can only be accessed or changed by authorized users. | FR-04, FR-09, FR-15 / US-05, US-07 | High | Security and user-role rules are planned but not fully tested. | Attempt to edit another user’s listing, access another private conversation, and enter the admin page using a student account. |

## Categories
Use these categories:
- User problem
- Value proposition
- Usability
- Technical feasibility
- Business logic
- Data handling
