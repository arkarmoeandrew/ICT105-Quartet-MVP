# System Requirements

## Minimum Final Prototype Functionalities

These requirements define the minimum prototype functionalities for the **RSU Nexus – Campus Resource Marketplace** final prototype. The system focuses on helping RSU students discover, list, request, and manage academic resources, equipment, and student services through an interactive web application.

| Req ID | Minimum Prototype Functionality | What Students Must Show in Final Prototype |
| --- | --- | --- |
| **FR-01** | **Clear problem-specific homepage or landing screen** | The prototype must clearly show the project title **RSU Nexus – Campus Resource Marketplace**, the target users, the problem being solved, and the main actions users can take, such as browsing resources, creating listings, or requesting services. |
| **FR-02** | **Primary user pathway** | The prototype must show the main user flow from start to finish: open RSU Nexus → log in → browse marketplace → search/filter listings → view listing details → submit a request or contact the owner → receive confirmation/status. |
| **FR-03** | **User input or data submission feature** | The system must allow students to submit information by creating a resource, equipment, or student service listing with details such as title, description, category, availability, and arrangement information. |
| **FR-04** | **Data storage or record management** | Submitted listings and request information must be stored persistently in Supabase PostgreSQL, with listing images stored in Supabase Storage. Sample JSON may be used only as temporary development or test data. |
| **FR-05** | **View records / information list** | The prototype must allow users to view marketplace records, such as available equipment, academic resources, student services, and submitted listings. |
| **FR-06** | **Search, filter, or category function** | The prototype must include search, filtering, or category browsing so users can find relevant resources or services by keyword, category, resource type, or availability status. |
| **FR-07** | **Detail view for each record** | Users must be able to open a listing and view more details about a selected resource, equipment item, or student service before contacting the owner. |
| **FR-08** | **Status or progress tracking** | The system must show listing statuses such as Available, Reserved, or Unavailable and request statuses such as Pending, Approved, Rejected, Completed, or Closed. |
| **FR-09** | **Admin or manager function** | The prototype must include at least one admin or manager-side function, such as reviewing listings, approving requests, editing records, or removing invalid marketplace listings. |
| **FR-10** | **Basic validation and error prevention** | The system must prevent incomplete or incorrect input when users create listings or submit requests by using required fields, valid email format, simple error messages, or confirmation checks. |
| **FR-11** | **Confirmation or feedback message** | After a user submits, updates, or deletes information, the prototype must show feedback such as “Listing created successfully,” “Request submitted,” “Status updated,” or “Please complete required fields.” |
| **FR-12** | **Dashboard, summary, or simple analytics view** | The prototype must include a simple summary screen showing marketplace information such as total listings, available resources, pending requests, number of student services, or common categories. |
| **FR-13** | **Basic user interface consistency** | Screens must use consistent layout, navigation, labels, buttons, colors, and visual structure across the homepage, marketplace, listing detail, create listing, request/contact, and dashboard pages. |
| **FR-14** | **Mobile-friendly or responsive design consideration** | The prototype must show that RSU Nexus can reasonably work on both laptop and mobile screen sizes with responsive layout, readable text, and usable navigation. |
| **FR-15** | **Basic privacy and responsible data handling** | The system must avoid unnecessary sensitive data and show basic privacy awareness by using limited user fields, RSU email verification, sample/masked data, or a clear explanation of how student data is used. |
| **FR-16** | **Final prototype traceability** | Every major screen or feature in the prototype must connect back to the Lab 04 requirements, user stories, and MVP feature list so the team can explain why each feature exists. |

---

## Minimum Technical Requirement

The final prototype must not be only a static idea or presentation. It must be an interactive prototype where users can click, submit, view, search/filter, update, or simulate the main workflow of **RSU Nexus – Campus Resource Marketplace**.

For this project, the acceptable prototype form is:

| Platform Type | Acceptable Prototype Form |
| --- | --- |
| Web app | HTML5, CSS3, and vanilla JavaScript for the frontend; Supabase Authentication, PostgreSQL, and Storage for backend services; and Vercel for deployment. |

The prototype should demonstrate realistic interaction, including marketplace browsing, listing creation, search/filtering, detail viewing, request/contact actions, status display, validation messages, and simple dashboard or summary information.
