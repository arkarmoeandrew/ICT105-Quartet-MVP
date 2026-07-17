# Risk Register

## Project Title

**RSU Nexus – Campus Resource Marketplace**

| Risk ID | Category | Risk Description | Affected Feature / Requirement | Severity | Likelihood | Mitigation Action | Owner | GitHub Evidence | Status |
|---|---|---|---|---|---|---|---|---|---|
| R-01 | Privacy | Personal phone numbers or private email addresses may be displayed publicly on listing or profile pages. | FR-07, FR-15 | High | Medium | Remove public contact details and use authenticated requests or private platform messaging. | Min Khant Ko | Issue #23, Issue #24 | In Progress |
| R-02 | Ethical | The wording “Verified RSU students” may mislead users before real RSU email verification is implemented. | FR-01, FR-02, FR-13 | High | Medium | Replace the claim with “Built for the RSU community” until verification is implemented and tested. | Arkar Moe | Issue #21, Issue #22 | In Progress |
| R-03 | IP | User-uploaded images, listing text, icons, or design assets may be copyrighted or used without permission. | FR-03, FR-13, FR-16 | Medium | Medium | Require original or permitted content, keep attribution for licensed assets, and record third-party materials in the IP register. | Arkar Moe | Issue #25 | In Progress |
| R-04 | Security | Unauthorized users may access administrator functions or change restricted records. | FR-04, FR-09, FR-15 | High | Medium | Restrict admin functions to authorized accounts and enforce access using Supabase Row Level Security. | Lin Htet Aung | Issue #26 | In Progress |
| R-05 | Legal | Users may believe that RSU Nexus is an official Rangsit University system or university-endorsed service. | FR-01, FR-13, FR-15 | High | Low | Keep a visible student-project disclaimer and avoid the official RSU logo or unsupported endorsement claims. | Arkar Moe | Issue #21, Issue #25 | In Progress |
| R-06 | Data quality | Incomplete, inaccurate, misleading, or outdated listing information may cause incorrect requests. | FR-03, FR-07, FR-08, FR-10 | Medium | High | Require clear fields for condition, availability, duration, price, exchange terms, and pickup method. Add validation and allow owners to update records. | Min Khant Ko | Issue #22, Issue #27 | In Progress |
| R-07 | Security | A user may edit or delete another user’s listing by changing client-side data or sending an unauthorized request. | FR-04, FR-09, FR-15 | High | Medium | Store the owner ID and enforce update and delete rules through database policies, not only frontend checks. | Lin Htet Aung | Issue #26 | In Progress |
| R-08 | Privacy | Private requests or messages may be visible to unrelated users. | FR-04, FR-08, FR-15 | High | Medium | Restrict requests and messages to the requester, related listing owner, and authorized administrator where necessary. | Min Khant Ko | Issue #24, Issue #26 | In Progress |
| R-09 | Security | Supabase service-role keys, database credentials, or other secrets may be committed to GitHub or exposed in frontend code. | FR-04, FR-15, FR-16 | Critical | Low | Store secrets in environment variables, never expose service-role keys in the frontend, and review commits before pushing. | Lin Htet Aung | Issue #26 | In Progress |
| R-10 | Security | Users may upload unsafe, oversized, unsupported, or unrelated files. | FR-03, FR-10, FR-15 | High | Medium | Restrict file types, enforce size limits, rename files safely, and use controlled Supabase Storage buckets. | Lin Htet Aung | Issue #22, Issue #26 | In Progress |
| R-11 | Ethical | Moderation decisions may be inconsistent, unfair, or unexplained. | FR-09, FR-11, FR-15 | Medium | Medium | Define standard moderation reasons, record the reason, and notify the affected listing owner. | Min Khant Ko | Issue #21, Issue #27 | In Progress |
| R-12 | Ethical | Similar actions such as `Contact Provider`, `Request Resource`, and `Request Service` may confuse users. | FR-02, FR-10, FR-11, FR-13 | Medium | High | Use distinct button labels, supporting descriptions, and separate confirmation messages. | Thiri Shin Thant Ko | Issue #21, Issue #22 | In Progress |
| R-13 | Data quality | Availability and request-status labels may be misunderstood. | FR-07, FR-08, FR-11, FR-13 | Medium | High | Add clear explanations for Available, Reserved, Pending, Approved, Rejected, and Completed. | Min Khant Ko | Issue #22, Issue #27 | In Progress |
| R-14 | Privacy | The project may collect unnecessary sensitive data such as national ID, home address, medical data, or payment information. | FR-03, FR-04, FR-15 | High | Low | Apply data minimization and exclude all unnecessary sensitive fields from forms, databases, datasets, and screenshots. | Min Khant Ko | Issue #23, Issue #24 | In Progress |
| R-15 | Security | Client-side role values may be changed using browser developer tools or local storage. | FR-09, FR-15 | High | Medium | Do not trust frontend role values alone. Verify roles through authentication data and database access policies. | Lin Htet Aung | Issue #26 | In Progress |
| R-16 | Security | Public links may expose private account, request, message, or moderation information. | FR-04, FR-07, FR-15 | High | Medium | Keep public links limited to safe listing information and require authentication for private records. | Min Khant Ko | Issue #24, Issue #26 | In Progress |
| R-17 | Ethical | Users may post unsafe, inappropriate, prohibited, fraudulent, or misleading equipment and service listings. | FR-03, FR-09, FR-10, FR-15 | High | Medium | Add content rules, reporting, moderation review, removal actions, and user feedback. | Min Khant Ko | Issue #21, Issue #27 | In Progress |
| R-18 | Legal | The official Rangsit University logo or trademarked material may be used without permission. | FR-01, FR-13, FR-16 | High | Low | Use only original RSU Nexus branding and do not use the official university logo without formal permission. | Arkar Moe | Issue #25 | In Progress |
| R-19 | IP | The homepage photograph may lose its required creator, source, licence, or modification attribution. | FR-01, FR-13, FR-16 | Medium | Low | Keep the CC BY-SA attribution visible in the footer and record the image in the third-party asset register. | Arkar Moe | Issue #25 | In Progress |
| R-20 | Security | Important deletion or status-change actions may happen accidentally without confirmation. | FR-08, FR-09, FR-10, FR-11 | Medium | Medium | Add confirmation dialogs and clear success or error messages before and after destructive actions. | Lin Htet Aung | Issue #22, Issue #26 | In Progress |
| R-21 | Data quality | Lab 08 CSV, Excel, Power BI, screenshots, and documents may show inconsistent metrics or filenames. | FR-12, FR-16 | Medium | Medium | Use the same source dataset, refresh Power BI, verify 12 users and 83.3% success, and standardize filenames and labels. | Min Khant Ko | Issue #27, Issue #28 | In Progress |
| R-22 | Privacy | Lab 08 screenshots or datasets may reveal real tester identities. | FR-15, FR-16 | Medium | Low | Use anonymous IDs such as TU-01 and remove names, phone numbers, emails, and other identifying information. | Min Khant Ko | Issue #23, Issue #24 | In Progress |
| R-23 | Traceability | Lab 09 findings may not be connected to requirements, issues, commits, README, or the weekly logbook. | FR-16 | Medium | Medium | Link each risk to the relevant issue, document requirement clarifications, and update README and the weekly logbook. | Lin Htet Aung | Issue #22, Issue #28 | In Progress |
| R-24 | Security | Important project data may be lost if stored only on one local device. | FR-04, FR-16 | Medium | Low | Keep source code and documents in GitHub and export important project datasets when necessary. | Lin Htet Aung | Issue #26, Issue #28 | In Progress |

## Overall Risk Decision

The RSU Nexus prototype is **safe to continue building with mitigation**.

The project does not require a complete redesign, but several high-priority risks must be addressed before the system is treated as a functional or production-ready application.

The most important actions are:

- Protect personal contact information
- Implement authentication and Supabase Row Level Security
- Restrict administrator and listing-owner actions
- Remove or support the “Verified RSU students” claim
- Keep private requests and messages restricted
- Validate form input and uploaded files
- Protect secret keys and credentials
- Define fair moderation rules
- Keep third-party asset attribution
- Maintain consistent validation data and repository traceability

## Risk Status Summary

| Risk Level | Current Decision |
|---|---|
| Critical | Must be fixed before deployment |
| High | Must be mitigated before full implementation |
| Medium | Must be documented and addressed during implementation |
| Low | Monitor and maintain current controls |

## Related GitHub Issues

- Issue #21 – Legal and ethical checklist
- Issue #22 – Responsible requirement updates
- Issue #23 – Data inventory and classification
- Issue #24 – Privacy and data protection review
- Issue #25 – Intellectual property and third-party assets
- Issue #26 – Security risk check
- Issue #27 – Responsible design risk register
- Issue #28 – README and weekly logbook update