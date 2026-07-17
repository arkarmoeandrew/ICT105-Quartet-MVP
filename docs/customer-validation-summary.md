# Lab 08 – Customer Validation Summary

## 1. Project Title

RSU Nexus – Campus Resource Marketplace

## 2. Prototype Tested

The team tested version `v0.1` of the RSU Nexus interactive web prototype. The prototype focused on the main campus marketplace workflow for finding academic equipment, learning resources, and student services.

- Prototype version: v0.1
- Prototype screenshot location: `/screenshots/validation-test-screens.png` (the current repository file is a placeholder and must be replaced manually with a valid screenshot)
- Main task tested: Search for a campus resource or student service, open the listing details, submit a request, and understand the request status
- Related requirements from `system-requirements.md`: FR-02, FR-03, FR-05, FR-06, FR-07, FR-08, FR-09, FR-10, FR-11, FR-12, FR-14, FR-15

## 3. Test Users

| Test User ID | User Role | Dataset Task |
|---|---|---|
| TU-01 | RSU Student | Searched for a laptop charger and submitted a request. |
| TU-02 | RSU Student | Searched for a programming textbook on mobile. |
| TU-03 | RSU Student | Requested a DSLR camera and reviewed availability information. |
| TU-04 | RSU Student | Attempted to create a calculator listing. |
| TU-05 | RSU Student | Searched for a graphic-design tutoring service on mobile. |
| TU-06 | RSU Staff | Reviewed pending marketplace listings in the admin dashboard. |
| TU-07 | RSU Student | Reviewed resource details and borrowing information on mobile. |
| TU-08 | RSU Student | Submitted a request for laboratory equipment. |
| TU-09 | RSU Student | Searched available student services on mobile. |
| TU-10 | RSU Student | Attempted to request a scientific calculator. |
| TU-11 | RSU Student | Created a student-service listing. |
| TU-12 | RSU Staff | Reviewed resource privacy information. |

## 4. Validation Method

The validation exercise used task-based prototype testing. Each tester was assigned a realistic RSU Nexus task and asked to complete it using prototype version `v0.1`. Task completion, time, scores, confusion points, comments, and affected requirements were recorded.

- Testing method: Task-based usability testing with structured feedback
- Validation testing date: 14 July 2026
- Analysis and documentation date: 15 July 2026
- Location or online platform: Online prototype testing
- Number of testers: 12
- Data collected: Task completion, completion time, ease-of-use score, usefulness score, confusion point, most useful feature, reuse intention, interest level, comments, and affected requirement IDs

## 5. Summary of Results

| Metric | Result | Interpretation |
|---|---:|---|
| Total test users | 12 | The validation included RSU Student and RSU Staff perspectives. |
| Completed tasks | 10 | Ten users completed their assigned tasks; two did not. |
| Task success rate | 83.3% | The result exceeded the Lab 07 target of 80%. |
| Average completion time | 108.75 seconds | This provides a baseline for future workflow improvements. |
| Average ease-of-use score | 4.17 out of 5 | Testers generally found the prototype understandable and usable. |
| Average usefulness score | 5.00 out of 5 | Every recorded usefulness rating was 5. |
| Average interest level | 4.25 out of 5 | Most testers showed strong interest in using RSU Nexus. |
| Users with confusion points | 8 of 12 (66.7%) | Several interface elements still require revision. |
| Most common confusion point | Search filter | Category labels and mobile filter visibility caused repeated confusion. |

## 6. Key User Comments

Testers found search and filtering, category browsing, listing details, request tracking, confirmation messages, and provider information useful.

Repeated comments showed that:

- Category labels should be clearer.
- The mobile filter button should be easier to notice.
- Available and Reserved statuses need clearer explanations; the same clarity should be applied to all request-status labels.
- Form-validation messages should identify the exact invalid field.
- Listing details should explain availability, borrowing duration, price, exchange arrangements, and pickup information.
- Contact Provider and Request Resource should use more distinct wording.
- Personal phone numbers should not be displayed publicly.
- The admin dashboard needs better filtering for pending listings.

## 7. Affected Requirements

| Requirement ID | Evidence Found | Required Prototype Improvement |
|---|---|---|
| FR-03 | One tester could not complete the create-listing form. | Simplify the listing form and make required fields clearer. |
| FR-06 | Two testers experienced search and filter confusion. | Improve category labels and make mobile filters more visible. |
| FR-07 | Testers requested clearer availability and borrowing information. | Add more complete arrangement information to the listing-detail page. |
| FR-08 | Availability and request actions or statuses were not immediately clear. | Add explanations for listing availability and request statuses. |
| FR-09 | The admin dashboard needed clearer controls for pending listings. | Add filters and clearer management actions for administrators. |
| FR-10 | A required-field validation message was unclear. | Show specific validation messages directly below invalid fields. |
| FR-11 | Request and confirmation actions need stronger feedback. | Use clearer action labels and confirmation messages. |
| FR-14 | Mobile search or filter controls were difficult to use. | Improve responsive layout and mobile filter visibility. |
| FR-15 | A tester raised concerns about displaying phone numbers. | Protect personal data and use private in-platform communication. |

## 8. Conclusion

The current RSU Nexus MVP direction is **partially validated**.

The prototype achieved an 83.3% task-success rate, an average ease-of-use score of 4.17 out of 5, an average usefulness score of 5.00 out of 5, and an average interest level of 4.25 out of 5. These results support continuing with the campus marketplace concept.

However, the 66.7% confusion rate shows that search and filtering, status explanations, form validation, listing details, request-button wording, admin controls, mobile responsiveness, and privacy handling require revision before deeper implementation.
