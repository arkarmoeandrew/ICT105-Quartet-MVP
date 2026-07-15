# Lab 08 – MVP Decision

## 1. Decision
Choose one:

- [ ] Continue with the current MVP direction
- [x] Continue with minor revisions
- [ ] Revise major workflow or feature
- [ ] Collect more evidence before implementation
- [ ] Pivot or change the solution direction

## 2. Evidence Supporting the Decision
The RSU Nexus customer validation results support continuing with the current MVP direction with minor revisions.

The prototype was evaluated using 12 test users, including students and admin/staff roles. Ten users successfully completed their assigned tasks, producing a task success rate of 83.3%.

The average feedback score was 4.17 out of 5, and the average interest level was 4.25 out of 5. These results show that users generally understood the purpose of RSU Nexus and considered the platform useful.

The main marketplace workflow was successfully completed by most users:

**Search or browse listings → View listing details → Submit a request → Check request status**

However, eight users experienced at least one confusion point. The main issues involved search filters, request-status labels, form validation, listing details, request-button wording, mobile usability, admin controls, and privacy handling.

The evidence shows that the main RSU Nexus concept is useful and should continue, but several interface elements need improvement before the next implementation stage.

## 3. Requirements to Keep

| Requirement ID | Reason |
|---|---|
| FR-01 | The homepage clearly introduces the purpose of RSU Nexus. |
| FR-02 | The main user pathway is essential for finding and requesting campus resources and services. |
| FR-03 | Students need to create equipment, learning-resource, and student-service listings. |
| FR-05 | The marketplace listing page is necessary for browsing available resources and services. |
| FR-06 | Search and filtering are core features that help users quickly find suitable listings. |
| FR-07 | Listing details are necessary for users to understand availability, provider information, and arrangements. |
| FR-08 | Availability and request-status tracking are important for completing the marketplace workflow. |
| FR-09 | Admin management is needed to review inappropriate, inactive, or pending listings. |
| FR-11 | Confirmation feedback helps users understand whether their actions were successful. |
| FR-12 | The dashboard helps users and administrators review listings, requests, and system activity. |
| FR-14 | Responsive design is necessary because students may use both laptops and mobile devices. |
| FR-15 | Privacy and responsible data handling are essential for a trusted campus platform. |

## 4. Requirements to Improve

| Requirement ID | Problem Found | Improvement Needed |
|---|---|---|
| FR-03 | One tester could not complete the create-listing task. | Simplify the form and clearly identify all required fields. |
| FR-06 | Category labels and mobile filters caused confusion. | Use clearer category names and make the mobile filter button more visible. |
| FR-07 | Some listing details did not clearly explain borrowing duration, price, exchange, or availability. | Add structured arrangement information to every listing-detail page. |
| FR-08 | Pending and Approved request statuses were not immediately clear. | Add short descriptions or tooltips for all availability and request statuses. |
| FR-09 | The admin dashboard needed clearer filtering for pending listings. | Add status filters and clearer management action buttons. |
| FR-10 | Form-validation messages were not noticeable enough. | Display specific error messages directly below invalid fields. |
| FR-11 | Contact Provider and Request Resource caused confusion. | Use more distinct button labels and clearer confirmation messages. |
| FR-14 | The mobile filter button was difficult to locate. | Improve the responsive layout and mobile filter controls. |
| FR-15 | A tester raised concerns about publicly displayed phone numbers. | Hide personal contact details and use private in-platform messaging. |

## 5. Prototype Changes Before Next Lab
The team will make the following changes:

1. Improve category labels for Equipment, Learning Resources, and Student Services.
2. Make search and filter controls more visible on mobile devices.
3. Add clear explanations for Available, Reserved, Pending, Approved, Rejected, and Completed statuses.
4. Display validation messages directly below incomplete or invalid form fields.
5. Clearly separate Contact Provider, Request Resource, and Request Service actions.
6. Add borrowing duration, price, exchange, and availability information to listing details.
7. Improve admin filters for pending, inactive, and inappropriate listings.
8. Hide personal phone numbers and support private platform messaging.
9. Test the revised workflow before deeper implementation.

## 6. GitHub Issues Created

| Issue Title | Assigned Member | Requirement ID |
|---|---|---|
| Improve marketplace search and mobile filters | Arkar Moe | FR-06, FR-14 |
| Clarify availability and request-status labels | Min Khant Ko | FR-08 |
| Improve listing form validation messages | Thiri Shin Thant | FR-03, FR-10, FR-11 |
| Improve listing details and request-button wording | Thiri Shin Thant | FR-07, FR-11 |
| Improve admin dashboard filtering and actions | Lin Htet Aung| FR-09, FR-12 |
| Improve privacy and private communication handling | Lin Htet Aung | FR-15 |
