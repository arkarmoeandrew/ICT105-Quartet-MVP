# Final Prototype Report

## 1. Project Title

**RSU Nexus – Campus Resource Marketplace**

---

## 2. Group Members and Roles

| Name | Role | Main Contribution | GitHub Evidence |
|------|------|-------------------|-----------------|
| **Arkar Moe** | Frontend Developer & Documentation | Landing page, final improvement list, demo flow, user testing evidence | Commits for landing page and documentation |
| **Thiri Shin Thant** | Business Analysis & Documentation | Sales scenario, demo script | Documentation commits |
| **Min Khant Ko** | Testing & Validation | User testing plan, user testing results | Testing documentation commits |
| **Lin Htet Aung** | Repository Manager | README updates, weekly logbook, repository organization | README and logbook commits |

---

## 3. Problem Background

RSU students often need equipment, learning resources, tutoring services, and other campus services. However, these resources are scattered across social media, class chat groups, and personal contacts, making them difficult to discover. There is no centralized platform where students can easily explore, borrow, rent, share, offer resources, or hire student services. This problem was identified during Lab 02 and validated through research and user feedback in Lab 03.

---

## 4. Target Users

### Primary Users
- RSU students looking to borrow, rent, share, or offer equipment and learning resources.
- Students seeking tutors or campus-related services.

### Secondary Users
- Student organizations.
- Clubs and project teams.
- Campus service providers.

### Administrator
- Marketplace administrator responsible for managing listings, requests, and user activities.

---

## 5. Evidence Summary

User interviews, validation activities, landing page metrics, and user testing showed that students prefer a single marketplace where they can quickly discover campus resources instead of searching multiple communication channels. Testing confirmed that users could successfully browse resources, submit requests, track request status, and understand the overall workflow.

---

## 6. Final Prototype Overview

RSU Nexus is a web-based campus marketplace built for the RSU community. The system allows users to:

- Explore equipment, learning resources, tutoring, and student services.
- Search and filter marketplace listings.
- View detailed information about each listing.
- Submit borrowing, rental, or service requests.
- Communicate with resource owners through the messaging feature.
- Track request status using the dashboard.
- Allow administrators to manage marketplace listings and requests.

The prototype was developed using HTML, CSS, JavaScript, Supabase, and Vercel.

---

## 7. Requirement Traceability Summary

| Requirement ID | Implemented Feature / Screen | User Story ID | Evidence Source | Status |
|----------------|------------------------------|---------------|-----------------|--------|
| FR-01 | Homepage / Landing Page | US-01 | Homepage Screenshot | ✅ Completed |
| FR-02 | Explore Marketplace | US-02 | Marketplace Page | ✅ Completed |
| FR-03 | Submit Request Form | US-03 | Request Form | ✅ Completed |
| FR-04 | Supabase Data Storage | US-03 | Supabase Database | ✅ Completed |
| FR-05 | Marketplace Listing | US-02 | Listing Page | ✅ Completed |
| FR-06 | Search & Category Filter | US-02 | Marketplace Search | ✅ Completed |
| FR-07 | Listing Detail | US-04 | Detail Page | ✅ Completed |
| FR-08 | Request Status Tracking | US-05 | Dashboard | ✅ Completed |
| FR-09 | Admin Management | US-06 | Admin Dashboard | ✅ Completed |
| FR-10 | Form Validation | US-03 | Request Form | ✅ Completed |
| FR-11 | Dashboard Summary | US-05 | Dashboard | ✅ Completed |
| FR-12 | Final Prototype Traceability | All User Stories | README & Documentation | ✅ Completed |

---

## 8. Data Handling

The prototype stores and manages marketplace information using Supabase. User-submitted listings, borrowing requests, rental requests, and service requests are securely stored and retrieved through the database. Users can search, filter, view, update, and manage records according to their roles. Input validation is applied before data submission, and only the necessary information required for the marketplace is collected.

---

## 9. Validation and User Testing Results

User testing demonstrated that participants could complete the main workflow successfully, including exploring the marketplace, viewing listing details, submitting requests, messaging resource owners, and checking request status. Feedback highlighted that the interface is easy to understand while suggesting minor improvements such as clearer labels, improved navigation, and more informative status messages. Overall, the prototype is considered ready for final improvements before release.

---

## 10. Startup/Product Metrics

The project measured several key metrics during validation:

- Landing page views
- Marketplace exploration rate
- CTA (Call-to-Action) clicks
- Demo attempts
- User testing completion rate
- Feedback responses
- Interest conversion rate

These metrics were used to evaluate user interest and prototype usability.

---

## 11. Business Value and Venture Direction

RSU Nexus creates value by connecting students who need campus resources with students who can provide them. The platform reduces the time required to find equipment, tutors, textbooks, and services while promoting resource sharing within the university community. Future opportunities include expanding the marketplace to additional universities, integrating payment services for rentals, adding real-time notifications, and enhancing communication features.

---

## 12. Limitations and Future Improvements

Current limitations include limited notification features, basic administrator functions, and the absence of an integrated payment gateway. Future improvements include:

- Real-time notifications.
- Advanced messaging features.
- Online payment integration.
- Mobile application support.
- AI-powered resource recommendations.
- Enhanced analytics dashboard.
- Stronger moderation and reporting tools.
