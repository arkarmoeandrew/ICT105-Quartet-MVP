# Analytics Insights

## 1. Validation Overview

The RSU Nexus customer-validation exercise evaluated whether RSU students could use the campus resource marketplace to find academic equipment, learning resources, and student services, understand listing information, submit requests, and follow request statuses.

The source dataset is `/data/validation-results.csv`. It contains 12 test users with RSU Student and RSU Staff roles using prototype version `v0.1`.

## 2. Key Metrics

| Metric | Result | Interpretation |
|---|---:|---|
| Total test users | 12 | The dataset included RSU Student and RSU Staff perspectives. |
| Completed tasks | 10 | Most users completed their assigned task successfully. |
| Task success rate | 83.3% | The result exceeded the Lab 07 target of 80%. |
| Average completion time | 108.75 seconds | This is the current baseline for the tested tasks. |
| Average ease-of-use score | 4.17 out of 5 | Users generally found the prototype clear and usable. |
| Average usefulness score | 5.00 out of 5 | Every recorded usefulness rating was 5. |
| Average interest level | 4.25 out of 5 | Users showed strong interest in using RSU Nexus. |
| Users with confusion points | 8 of 12 (66.7%) | Several interface elements still require revision. |
| Would-use-again rate | 100% | All 12 records contain “Yes.” |
| Evidence-based decision | Partially Validated / Continue with Minor Revisions | The concept should continue, but usability improvements are needed. |

## 3. Main Findings

### Task Performance

Ten out of twelve test users completed their assigned tasks, producing an 83.3% task-success rate. This suggests that the main RSU Nexus workflow is understandable for most users.

The two incomplete tasks involved creating a marketplace listing and requesting a scientific calculator. The recorded causes were unclear required-field validation and confusion between Contact Owner and Request Resource actions.

### Most Useful Features

The dataset identified the following useful features:

- Search and category filtering
- Marketplace and service listings
- Listing-detail pages
- Request workflow and confirmation messages
- Create-listing form
- Admin dashboard

Search and filtering should remain a must-have MVP feature because it allows students to locate equipment, learning resources, and student services.

### Main Confusion Points

| Confusion Point | Number of Users | Insight |
|---|---:|---|
| Search filter | 2 | Category options and mobile filter visibility need improvement. |
| Availability status | 1 | Available and Reserved need clearer explanations. |
| Form validation | 1 | Required fields and validation messages should identify the exact problem. |
| Detail page | 1 | Borrowing duration and pickup information need to be clearer. |
| Dashboard filter | 1 | Admin filtering and management controls need refinement. |
| Request button | 1 | Contact Owner and Request Resource need more distinct wording. |
| Privacy information | 1 | Personal contact information should be protected through private platform communication. |

Although most users completed their tasks, eight users experienced a confusion point. Task completion alone is therefore not enough; interface clarity must also improve.

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

1. Make search and filter controls easier to find on desktop and mobile screens.
2. Add short explanations for `Available`, `Reserved`, `Pending`, `Approved`, `Rejected`, and `Completed` statuses.
3. Display form-validation messages directly below the affected input fields.
4. Clearly separate `Contact Provider`, `Request Resource`, and `Request Service` actions.
5. Add clearer borrowing, exchange, pricing, pickup, and availability information to listing details.
6. Improve admin filters for pending, inactive, and inappropriate listings.
7. Hide personal phone numbers and use private platform communication.

## 6. Evidence-Based Insight

The 83.3% task-success rate exceeded the Lab 07 target, while the 4.17 ease-of-use score, 5.00 usefulness score, 4.25 interest level, and 100% would-use-again rate support the RSU Nexus value proposition.

However, the 66.7% confusion rate shows that the current interface is not fully validated. The project should continue while the team revises the identified usability and privacy issues.

## 7. Conclusion

**Decision: Partially Validated – Continue with Minor Revisions**

RSU Nexus should continue toward the final prototype because the main campus marketplace concept and core workflow achieved the required task-success target. Before deeper implementation, the team should revise the identified usability and privacy issues and test the improved workflow again.
