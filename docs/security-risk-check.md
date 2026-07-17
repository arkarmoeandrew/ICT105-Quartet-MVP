# Basic Security Risk Check

## Project Title

**RSU Nexus – Campus Resource Marketplace**

## Security Risk Review

| Area | Risk Question | Current Status | Risk Level | Mitigation | Owner |
|---|---|---|---|---|---|
| Form input | Can incomplete, invalid, or harmful data be submitted? | With revision | Medium | Add required-field checks, input-length limits, clear validation messages, and server-side validation before saving data. | Lin Htet Aung |
| Login and authentication | Can unauthorized users access protected features? | With revision | High | Use Supabase Authentication, require valid login sessions, and restrict protected pages and actions to authenticated users. | Lin Htet Aung |
| RSU verification claim | Can the system claim that users are verified when verification is not implemented? | With revision | High | Remove or replace “Verified RSU students” until RSU email verification is implemented and tested. | Arkar Moe |
| Admin function | Can normal users access admin actions? | With revision | High | Restrict admin pages and actions to authorized admin accounts. Do not rely only on hidden buttons or client-side role checks. | Lin Htet Aung |
| Listing ownership | Can users edit or delete another user’s listing? | With revision | High | Store the listing owner ID and apply Supabase Row Level Security so only the owner or an authorized admin can update or delete the record. | Lin Htet Aung |
| Request access | Can users view requests that do not belong to them? | With revision | High | Limit request visibility to the requester, the related listing owner, and authorized administrators. | Min Khant Ko |
| Message access | Can private messages be viewed by unrelated users? | With revision | High | Restrict messages to authenticated conversation participants and authorized administrators when review is necessary. | Min Khant Ko |
| Data display | Is private information visible to everyone? | With revision | High | Do not display phone numbers, personal email addresses, internal user IDs, private requests, messages, or admin records on public pages. | Min Khant Ko |
| Status update | Can listing or request statuses be changed without control? | With revision | High | Define who can change each status and validate all status transitions. Users must not directly modify restricted status values. | Lin Htet Aung |
| Public links | Does a public link expose data that should be private? | With revision | High | Keep only listing-safe information publicly accessible. Require authentication for requests, messages, account details, and admin pages. | Min Khant Ko |
| File upload | Can unsafe, unrelated, oversized, or unsupported files be uploaded? | With revision | High | Accept approved image formats only, enforce file-size limits, rename files safely, store them in controlled Supabase Storage buckets, and reject invalid uploads. | Lin Htet Aung |
| Uploaded content | Can users upload misleading, prohibited, harmful, or copyrighted content? | With revision | Medium | Add content rules, allow reporting, and provide admin review and removal for unsafe or inappropriate content. | Arkar Moe |
| Database access | Can users bypass the interface and directly access unauthorized database records? | With revision | High | Enable Supabase Row Level Security on every relevant table and test policies for profiles, listings, requests, messages, and admin records. | Lin Htet Aung |
| Secret keys | Can private API keys or service credentials be exposed in GitHub or frontend code? | With revision | Critical | Never commit Supabase service-role keys, database passwords, or other secrets. Use environment variables and expose only public client configuration that is safe for frontend use. | Lin Htet Aung |
| Client-side roles | Can a user change their role using browser developer tools? | With revision | High | Do not trust role values stored only in HTML, JavaScript, localStorage, or form fields. Verify permissions through database policies and protected backend logic. | Lin Htet Aung |
| Session handling | Can a user continue using protected functions after logout or session expiration? | With revision | Medium | Check authentication state before protected actions, clear local session data on logout, and redirect unauthenticated users to the login page. | Lin Htet Aung |
| Error messages | Can system errors expose technical or private information? | With revision | Medium | Show simple user-facing error messages and avoid exposing database queries, access tokens, stack traces, or internal configuration. | Lin Htet Aung |
| Delete actions | Can users accidentally delete important content? | With revision | Medium | Require confirmation before deleting listings, requests, messages, or administrative records. Use soft deletion where appropriate. | Lin Htet Aung |
| Spam and misuse | Can users repeatedly submit spam listings, requests, or messages? | With revision | Medium | Add input limits, duplicate checks, reporting, moderation, and basic rate limits where possible. | Arkar Moe |
| Validation data | Can Lab 08 evidence expose tester identities? | Yes | Low | Continue using anonymous tester IDs and remove personal names, phone numbers, emails, and sensitive information from CSV, Excel, Power BI, screenshots, and documents. | Min Khant Ko |
| Third-party services | Can external tools or services expose project data? | With revision | Medium | Use only necessary services, review their permissions, avoid uploading sensitive data, and document them in the IP and data-handling files. | Arkar Moe |
| Backup and recovery | Can important project data be lost without recovery? | With revision | Medium | Keep source code and documents in GitHub, export important datasets when needed, and avoid relying on a single local copy. | Lin Htet Aung |
| Logging and audit | Can important admin or moderation actions occur without traceability? | With revision | Medium | Record admin actions, status changes, moderation reasons, timestamps, and responsible users when appropriate. | Min Khant Ko |

## Main Security Risks Identified

1. Unauthorized access to administrator functions.
2. Users editing or deleting another user’s listing.
3. Exposure of private requests, messages, phone numbers, or email addresses.
4. Missing or incomplete Supabase Row Level Security policies.
5. Service-role keys or other secrets being committed to GitHub.
6. Unsafe, oversized, or unsupported file uploads.
7. Client-side role manipulation.
8. Uncontrolled listing and request-status changes.
9. Spam, misleading listings, and inappropriate uploaded content.
10. Public links exposing information that should require authentication.

## Required Security Mitigations

- Use Supabase Authentication for account access.
- Apply Row Level Security to all relevant database tables.
- Restrict admin functions to authorized administrator accounts.
- Restrict listing edits and deletion to the listing owner or admin.
- Keep requests and messages private.
- Remove public phone-number and personal-email display.
- Validate all forms on both the client and data-storage layer.
- Validate uploaded image type and size.
- Keep secret keys and credentials outside GitHub and frontend code.
- Confirm destructive actions before processing them.
- Define valid status transitions and authorized status owners.
- Add reporting and moderation for spam, unsafe, or inappropriate content.
- Keep validation evidence anonymous.
- Record important moderation and admin actions for traceability.

## Related GitHub Issues

- Issue #22 – Responsible requirement updates
- Issue #23 – Data inventory and classification
- Issue #24 – Privacy and data protection review
- Issue #26 – Security risk check
- Issue #27 – Responsible design risk register
- Issue #28 – README and weekly logbook update

## Related Requirements

- **FR-03** – Data submission
- **FR-04** – Data storage
- **FR-08** – Status tracking
- **FR-09** – Admin function
- **FR-10** – Validation
- **FR-11** – Confirmation
- **FR-15** – Privacy and responsible data handling
- **FR-16** – Final prototype traceability

## Security Decision

- **Decision:** Continue with mitigation
- **Safe to continue:** Yes, after the high-risk access-control, privacy, upload, authentication, and secret-management issues are addressed
- **Redesign required:** No
- **Main priority:** Implement authentication, Row Level Security, ownership controls, private-data restrictions, upload validation, and secure key management before production use