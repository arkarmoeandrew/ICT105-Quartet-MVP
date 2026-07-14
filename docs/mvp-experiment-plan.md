## 1. Group and Project Information

- Group name: Quartet
- Project title: RSU Nexus – Campus Resource Marketplace
- Repository link: https://github.com/arkarmoeandrew/ICT105-Quartet-MVP
- Main target user: RSU students who need academic equipment, learning resources, or student services
- Prototype platform: Interactive web application built with HTML, CSS, and JavaScript, using Supabase for authentication, database storage, file storage, and backend services, with the frontend deployed on Vercel. Google AI Studio will be used as an AI-assisted development and prototyping tool.
  
## 2. Experiment Objective

We want to test whether RSU students can independently search for a campus resource or student service, understand the listing information, submit a request, and identify its current status.

## 3. Requirement Scope for the Experiment

| Requirement ID | Requirement Summary | Related Screen/Feature | Tested in This Experiment? |
|---|---|---|---|
| FR-01 | Clear problem-specific homepage or landing screen | Homepage | Yes |
| FR-02 | Primary user pathway | Homepage → Marketplace → Listing Details → Request Status | Yes |
| FR-03 | User input or data submission feature | Create Listing and Submit Request forms | Yes |
| FR-04 | Data storage or record management | Listing and request data stored using localStorage or JSON | Yes |
| FR-05 | View records or information list | Marketplace listing page | Yes |
| FR-06 | Search, filter, or category function | Marketplace search and filters | Yes |
| FR-07 | Detail view for each record | Resource or service detail page | Yes |
| FR-08 | Status or progress tracking | Listing availability and request-status display | Yes |
| FR-10 | Basic validation and error prevention | Create Listing and Request forms | Yes |
| FR-11 | Confirmation or feedback message | Listing and request submission confirmation | Yes |
| FR-12 | Dashboard, summary, or simple analytics view | Student dashboard | Yes |
| FR-14 | Mobile-friendly or responsive design | Mobile and desktop prototype screens | Yes |

## 4. MVP Experiment Type

Select one or combine more than one:

- Clickable prototype
- Landing page test
- Form-based simulation
- Dashboard demo
- Manual service simulation
- Simple web prototype
- Backend/database prototype

**Selected experiment type:** Simple web prototype and backend/database prototype

**Reason for selection:**  
A functional web prototype allows testers to interact with realistic pages, navigation, search controls, listing details, forms, and request-management features. Supabase will provide persistent database storage, authentication, and backend services, allowing the team to test a complete workflow using real stored data. The application will be deployed on Vercel so testers can access and evaluate the prototype through a live website.

## 5. Test Users

| Test User Group | Number of Testers | Why They Are Relevant |
|---|---|---|
| RSU students | 5 | They are the main target users who may search for equipment, learning resources, or student services and may also create their own listings. |

## 6. Experiment Procedure Summary

1. Explain to each tester that the prototype is being tested, not the tester.
2. Give the tester a scenario in which they need a resource or student service for a university project.
3. Ask the tester to open the homepage and explain what they think the system does.
4. Ask the tester to browse the marketplace and find a suitable listing using search or filters.
5. Ask the tester to open the listing and explain its availability, offer terms, and provider information.
6. Ask the tester to contact the provider or submit a request.
7. Ask the tester to check the current request status.
8. Ask the tester to create a new equipment, learning-resource, or student-service listing.
9. Observe where the tester hesitates, selects the wrong action, misunderstands labels, or needs assistance.
10. Ask the tester to complete the feedback form and answer the closing questions.
11. Record task completion, errors, comments, ratings, and recommended improvements.

## 7. Expected Learning

After the experiment, the team will decide:

- Whether students understand the purpose of RSU Nexus from the homepage.
- Whether the categories Equipment, Learning Resources, and Student Services are clear.
- Whether students can find listings using search and filters without assistance.
- Whether listing availability and request-status labels are understandable.
- Whether the request-and-approval workflow is sufficient or needs improvement.
- Whether the Create Listing form contains clear and appropriate fields.
- Which interface problems must be fixed before deeper implementation and the final prototype.
