# Data Handling Policy

## Data Collection
RSU Nexus will collect only the data required to support the campus resource marketplace.

The prototype may collect:

- User display name
- RSU email address
- User role, such as student or admin
- Profile image, if provided
- Listing title, description, category, condition, availability, and arrangement type
- Listing images
- Resource or service request details
- Request status, such as Pending, Approved, Rejected, or Completed
- Private messages related to listings and requests
- Date and time records for listings, requests, and updates

## Data Storage
The RSU Nexus frontend will be hosted on Vercel.

User accounts, listings, requests, messages, and status records will be stored in a Supabase PostgreSQL database. Listing images and optional profile images will be stored using Supabase Storage.

Environment variables, Supabase keys, passwords, and private configuration information will not be stored publicly in the GitHub repository.

Sample or masked data may be used during prototype development and testing.

## Data Access
Authenticated RSU Nexus users can view public marketplace listing information.

Users can create and update their own listings. Resource owners and service providers can review requests related to their listings. Requesters can view their own submitted requests and their current statuses.

Private messages can only be accessed by the users involved in the related conversation.

Administrators can review listings, reports, user activity, and inappropriate content when required for platform management.

Supabase Row Level Security policies will be used to prevent users from accessing or modifying records that do not belong to them.

## Data Minimization
RSU Nexus will not collect information that is unnecessary for the prototype.

The following data will be removed or avoided:

- National identification numbers
- Passport information
- Home addresses
- Publicly displayed personal phone numbers
- Bank account information
- Credit or debit card information
- Payment credentials
- Sensitive personal documents
- Medical or health information
- Unnecessary student identification details
- Passwords stored directly in the application database

Only the minimum information needed to create accounts, publish listings, submit requests, communicate privately, and manage the marketplace will be collected.

## Responsible Data Rule
The prototype must avoid unnecessary sensitive data and use sample or masked data when possible.

RSU Nexus will use anonymized user IDs and sample records during testing. Personal information will not be included in public GitHub files, screenshots, CSV datasets, or project documentation.

Passwords and authentication will be managed securely through Supabase Authentication. Private information will not be displayed on public listing pages.

Users should be able to update or remove their own listings and account information. Administrators should only access user data when required for moderation, security, or marketplace management.
