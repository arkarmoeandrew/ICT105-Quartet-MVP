# Analytics Insights

## 1. Validation Overview

The RSU Nexus customer-validation exercise evaluated whether RSU students could use the campus resource marketplace to find academic equipment, learning resources, and student services, understand listing information, submit requests, and follow request statuses.

The validation dataset contained 12 test users, including student and admin/staff roles, using prototype version `v0.1`.

## 2. Key Metrics

| Metric | Result | Interpretation |
|---|---:|---|
| Total test users | 12 | The dataset included student and admin/staff perspectives. |
| Completed tasks | 10 | Most users completed their assigned task successfully. |
| Task success rate | 83.3% | The result exceeded the Lab 07 target of 80%. |
| Average feedback score | 4.17 out of 5 | Users generally found the prototype clear and usable. |
| Average interest level | 4.25 out of 5 | Users showed strong interest in using RSU Nexus. |
| Users with confusion points | 8 | Several interface elements still require revision. |
| Evidence-based decision | Partially Validated / Continue with Revisions | The concept should continue, but usability improvements are needed. |

## 3. Main Findings

### Task Performance

Ten out of twelve test users completed their assigned tasks, producing an 83.3% task-success rate. This result suggests that the main RSU Nexus workflow is understandable for most users.

The tasks with the lowest completion involved creating a marketplace listing and contacting a provider to request a resource. The main causes were unclear form-validation messages and confusion between the Contact Provider and Request Resource actions.

### Most Useful Features

The features identified as most useful were:

- Search and filtering
- Category-based browsing
- Listing detail pages
- Request tracking
- Confirmation messages
- Create-listing form
- Admin dashboard

Search and filtering should remain a must-have MVP feature because it allows students to quickly locate equipment, learning resources, and student services.

### Main Confusion Points

| Confusion Point | Number of Users | Insight |
|---|---:|---|
| Search/filter | 2 | Category labels and mobile filter visibility need improvement. |
| Status tracking | 1 | Pending and Approved statuses need clearer explanations. |
| Form fields | 1 | Required fields and validation messages should be more noticeable. |
| Detail view | 1 | Availability and borrowing arrangements need clearer information. |
| Admin dashboard | 1 | Admin filtering and management controls need refinement. |
| Request button | 1 | Contact Provider and Request Resource need more distinct wording. |
| Privacy note | 1 | Personal contact information should be protected through private platform messaging. |

Although most users completed their tasks, eight users experienced at least one confusion point. This shows that task completion alone is not enough; interface clarity must also be improved.

## 4. Requirements Affected

| Requirement | Required Improvement |
|---|---|
| FR-03 | Make the create-listing process easier to complete. |
| FR-06 | Improve search categories and mobile filter visibility. |
| FR-07 | Provide clearer listing details and arrangement information. |
| FR-08 | Explain availability and request-status labels more clearly. |
| FR-09 | Improve admin filtering and listing-management controls. |
| FR-10 | Display visible and specific validation messages beside invalid fields. |
| FR-11 | Clarify request actions and provide stronger confirmation feedback. |
| FR-14 | Improve the mobile marketplace and filter controls. |
| FR-15 | Protect personal data by using private in-platform communication. |

## 5. Recommended Improvements

1. Make the search and filter controls easier to find on both desktop and mobile screens.
2. Add short explanations for `Available`, `Reserved`, `Pending`, `Approved`, `Rejected`, and Completed statuses.
3. Display form-validation messages directly below the affected input fields.
4. Clearly separate `Contact Provider`, `Request Resource`, and Request Service actions.
5. Add clearer borrowing, exchange, pricing, and availability information to listing details.
6. Improve admin filters for pending, inactive, and inappropriate listings.
7. Hide personal phone numbers and support private platform messaging.

## 6. Evidence-Based Insight

The validation results support the RSU Nexus value proposition. The 83.3% task-success rate, 4.17 average feedback score, and 4.25 average interest level indicate that users understand the main concept and consider it useful.

However, the number of confusion points shows that the current interface is not ready to be treated as fully validated. The project should continue while the team revises search controls, status labels, form validation, request-button wording, listing details, admin controls, and privacy handling.

## 7. Conclusion

**Decision: Partially Validated – Continue with Revisions**

RSU Nexus should continue toward the final prototype because the main campus marketplace concept and core workflow achieved the required success target. Before deeper implementation, the team should revise the identified usability and privacy issues and test the improved workflow again.
