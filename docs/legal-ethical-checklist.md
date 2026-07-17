# Legal and Ethical Checklist

## Project Title

**RSU Nexus – Campus Resource Marketplace**

## Ethical Review

| Check Item | Yes/No | Evidence / Notes | Mitigation Action | Owner | GitHub Issue/Commit |
|---|---|---|---|---|---|
| Users are informed about the purpose of the prototype. | Yes | The homepage identifies RSU Nexus as a campus resource marketplace and explains that users can find equipment, learning resources, and student services within the RSU community. | Keep the purpose statement and main marketplace categories visible on the homepage and README. | Arkar Moe | Issue #21, Issue #28 |
| The prototype avoids misleading claims. | With revision | The homepage includes wording such as “Verified RSU students.” This may be misleading until RSU email verification is fully implemented and tested. | Replace the wording with “Built for the RSU community” until verification is working, or implement and test RSU email verification before keeping the claim. | Arkar Moe | Issue #21, Issue #22, Issue #27 |
| The prototype does not collect unnecessary sensitive data. | With revision | The planned system uses profile, listing, request, message, image, role, and timestamp data. A full data inventory and privacy review are still required. | Exclude national ID, passport details, home address, medical data, payment-card information, and plain-text passwords. Keep only data required for the MVP workflow. | Min Khant Ko | Issue #23, Issue #24 |
| Users can understand what happens after submission. | With revision | The homepage explains the general Explore, Review, Request, and Connect process, but listing and request forms still require clear validation, confirmation, and status guidance. | Add specific error messages, a clear success confirmation, and explanations for Pending, Approved, Rejected, and Completed statuses. | Thiri Shin Thant Ko | Issue #22, Issue #27 |
| Admin or manager actions are clearly separated from user actions. | With revision | The public homepage shows normal user actions only, but administrator access, ownership controls, and private-data permissions must still be implemented and tested. | Restrict admin pages to authorized accounts, prevent users from editing another user’s listing, and apply Supabase Row Level Security policies. | Lin Htet Aung | Issue #26 |
| The prototype avoids unfair or harmful treatment of users. | With revision | The current interface does not use sensitive personal characteristics to rank or reject users. However, moderation rules for misleading, unsafe, prohibited, inappropriate, duplicate, or copyrighted listings must be defined. | Apply the same moderation rules to every user, record reasons for rejection or removal, notify listing owners, and include the risks and mitigation actions in the risk register. | Min Khant Ko | Issue #21, Issue #27 |
| Personal contact information is protected. | With revision | Lab 08 validation identified public phone-number display as a privacy concern. | Do not display personal phone numbers or private email addresses publicly. Use authenticated requests or private platform messaging. | Min Khant Ko | Issue #23, Issue #24 |
| Third-party assets and intellectual property are documented. | With revision | The homepage image, RSU Nexus logo, Figma design work, and AI-assisted coding tools must be recorded with their source, licence, permission, and usage details. | Complete the IP and third-party assets register and keep required attribution visible. | Arkar Moe | Issue #25 |
| Basic security risks are reviewed. | With revision | Authentication, listing ownership, admin access, private requests, image uploads, Supabase policies, and secret-key handling require a documented review. | Complete the security risk check, validate uploads, restrict data access, and keep service-role keys and other secrets outside frontend code and GitHub. | Lin Htet Aung | Issue #26 |
| Responsible design risks are recorded and prioritized. | With revision | Legal, ethical, privacy, IP, security, and misuse risks need likelihood, impact, mitigation, owner, and status records. | Complete the responsible design risk register and link each risk to the related requirement and GitHub issue. | Min Khant Ko | Issue #27 |
| Responsible requirement updates are documented. | With revision | Lab 09 findings may clarify privacy, validation, access-control, disclaimer, moderation, and upload requirements. These changes must not be made silently. | Record the original requirement, clarification, reason, evidence, and related issue in `/docs/updated-requirements-note.md`. | Thiri Shin Thant Ko | Issue #22 |
| Lab 09 evidence is summarized and traceable. | With revision | The README and weekly logbook must include the final Lab 09 review, member responsibilities, evidence files, issue numbers, and requirement links. | Update README and the weekly logbook after the Lab 09 documents and datasets are completed. | Lin Htet Aung | Issue #28 |

## Summary Decision

- **Safe to continue:** With revision
- **Required revision before implementation:**  
  - Review or replace the “Verified RSU students” claim  
  - Complete the data inventory and privacy review  
  - Protect personal phone numbers and email addresses  
  - Add clear validation, confirmation, and request-status guidance  
  - Restrict administrator and listing-owner actions  
  - Define fair moderation rules  
  - Complete the IP and third-party assets review  
  - Complete the security risk check  
  - Complete the responsible design risk register  
  - Document requirement clarifications  
  - Update README and the weekly logbook with Lab 09 evidence
