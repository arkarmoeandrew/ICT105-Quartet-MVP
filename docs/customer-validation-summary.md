# Lab 08 – Customer Validation Summary

## 1. Project Title
RSU Nexus – Campus Resource Marketplace

## 2. Prototype Tested
The team tested version `v0.1` of the RSU Nexus interactive web prototype. The prototype focused on the main campus marketplace workflow for finding academic equipment, learning resources, and student services.

- Prototype version: v0.1
- Prototype link or screenshot location: `/screenshots/validation-test-screens.png`
- Main task tested: Search for a campus resource or student service, open the listing details, submit a request, and understand the request status
- Related requirements from `system-requirements.md`: FR-02, FR-03, FR-05, FR-06, FR-07, FR-08, FR-09, FR-10, FR-11, FR-12, FR-14, FR-15

## 3. Test Users

| Test User ID | User Role | Why this user is relevant |
|---|---|---|
| TU-01 | Student | Represents students who need to find and request academic equipment. |
| TU-02 | Student | Represents students searching for learning resources such as textbooks. |
| TU-03 | Student | Represents students who need to understand request-status tracking. |
| TU-04 | Student | Represents students who may create equipment listings. |
| TU-05 | Student | Represents students searching for creative student services. |
| TU-06 | Admin/Staff | Represents administrators who review and manage marketplace listings. |
| TU-07 | Student | Represents students who need clear resource details and availability information. |
| TU-08 | Student | Represents students requesting tutoring and academic support services. |
| TU-09 | Student | Represents students accessing the marketplace on mobile devices. |
| TU-10 | Student | Represents students contacting providers and requesting resources. |
| TU-11 | Student | Represents students creating student-service listings. |
| TU-12 | Admin/Staff | Represents users responsible for privacy and responsible data handling. |

## 4. Validation Method
The validation exercise used task-based prototype testing. Each tester was assigned a realistic RSU Nexus task and asked to complete it using prototype version `v0.1`. Task completion, completion time, confusion points, useful features, feedback scores, interest levels, comments, and affected requirements were recorded.

- Testing method: Task-based usability testing with structured feedback
- Date/time: 15 July 2026
- Location or online platform: Online prototype testing
- Number of testers: 12
- Data collected: Task completion, completion time, confusion points, most useful feature, feedback score, interest level, comments, and affected requirement IDs

## 5. Summary of Results

| Metric | Result | Interpretation |
|---|---:|---|
| Total test users | 12 | The validation included student and admin/staff perspectives. |
| Task success rate | 83.3% | Ten out of twelve testers completed their assigned tasks successfully. |
| Average feedback score | 4.17 out of 5 | Testers generally found the prototype useful and understandable. |
| Average interest level | 4.25 out of 5 | Most testers showed strong interest in using RSU Nexus. |
| Most common confusion point | Search/filter | Category labels and mobile filter visibility caused repeated confusion. |

## 6. Key User Comments
Testers found search and filtering, category browsing, listing details, request tracking, confirmation messages, and provider information useful.

Repeated comments showed that:

- Category labels should be clearer.
- The mobile filter button should be easier to notice.
- Pending and Approved request statuses need clearer explanations.
- Form-validation messages should be more visible.
- Listing details should clearly explain availability, borrowing duration, price, or exchange arrangements.
- Contact Provider and Request Resource should use more distinct wording.
- Personal phone numbers should not be displayed publicly.
- The admin dashboard needs better filtering for pending listings.

## 7. Affected Requirements

| Requirement ID | Evidence Found | Required Prototype Improvement |
|---|---|---|
| FR-03 | One tester could not complete the create-listing form. | Simplify the listing form and make required fields clearer. |
| FR-06 | Two testers experienced search and filter confusion. | Improve category labels and make mobile filters more visible. |
| FR-07 | Testers requested clearer availability and borrowing information. | Add more complete arrangement information to the listing-detail page. |
| FR-08 | Pending and Approved statuses were not immediately clear. | Add explanations for listing availability and request statuses. |
| FR-09 | The admin dashboard needed clearer controls for pending listings. | Add filters and clearer management actions for administrators. |
| FR-10 | A required-field validation message was overlooked. | Show specific validation messages directly below invalid fields. |
| FR-11 | One tester confused Contact Provider with Request Resource. | Use clearer button labels and stronger confirmation feedback. |
| FR-14 | A mobile tester found the filter button difficult to locate. | Improve responsive layout and mobile filter visibility. |
| FR-15 | A tester raised concerns about displaying phone numbers. | Protect personal data and use private in-platform messaging. |

## 8. Conclusion
The current RSU Nexus MVP direction is **partially validated**.

The prototype achieved an 83.3% task-success rate, an average feedback score of 4.17 out of 5, and an average interest level of 4.25 out of 5. These results support continuing with the campus marketplace concept.

However, the prototype requires revisions to search and filtering, request-status explanations, form validation, listing details, request-button wording, admin controls, mobile responsiveness, and privacy handling before deeper implementation.
