# Data Structure

## Project Title

RSU Nexus – Campus Resource Marketplace

## 1. Main Supabase Tables and Storage

| Table / Resource | Purpose | Example Record |
|---|---|---|
| `profiles` | Store student and authorized-admin profile information linked to Supabase Auth | User UUID, Andrew, masked RSU email, Student |
| `categories` | Store approved marketplace categories | Equipment, Learning Resources, Student Services |
| `listings` | Store equipment, learning-resource, and student-service listings | Listing UUID, Canon DSLR Camera, Equipment, Available |
| `requests` | Store requests between students and track their status | Request UUID, requester UUID, listing UUID, Pending |
| `messages` | Store private request-related messages when this simplified feature is enabled | Message UUID, request UUID, “Is this available tomorrow?” |
| `admin_actions` | Record important moderation actions | Action UUID, remove invalid listing, admin UUID |
| `listing-images` bucket | Store listing images in Supabase Storage | Authenticated image upload linked to a listing |

## 2. Core Field Definitions

| Table | Field Name | Data Type | Required? | Example Value | Validation Rule | Used for Search/Filter? |
|---|---|---|---|---|---|---|
| `profiles` | `id` | UUID | Yes | Auth user UUID | Must match an authenticated Supabase user | No |
| `profiles` | `display_name` | Text | Yes | Andrew | Cannot be empty | No |
| `profiles` | `email` | Text | Yes | a***@rsu.ac.th | Must be a valid approved RSU email | No |
| `profiles` | `role` | Text/List | Yes | Student | Student/Admin only | Yes |
| `listings` | `id` | UUID | Yes | Listing UUID | Unique value | No |
| `listings` | `title` | Text | Yes | Canon DSLR Camera | Cannot be empty | Yes |
| `listings` | `category_id` | UUID | Yes | Equipment category UUID | Must match an existing category | Yes |
| `listings` | `description` | Text | Yes | DSLR camera available for project work | Cannot be empty | Yes |
| `listings` | `availability_status` | Text/List | Yes | Available | Available/Reserved/Unavailable | Yes |
| `listings` | `owner_id` | UUID | Yes | User UUID | Must match the authenticated owner | No |
| `listings` | `image_path` | Text | No | listing-images/camera.jpg | Must reference an approved Storage path | No |
| `requests` | `id` | UUID | Yes | Request UUID | Unique value | No |
| `requests` | `listing_id` | UUID | Yes | Listing UUID | Must match an existing listing | No |
| `requests` | `requester_id` | UUID | Yes | User UUID | Must match the authenticated requester | No |
| `requests` | `request_status` | Text/List | Yes | Pending | Pending/Approved/Rejected/Completed/Closed | Yes |
| `messages` | `id` | UUID | Yes | Message UUID | Unique value | No |
| `messages` | `request_id` | UUID | Yes | Request UUID | Must match an accessible request | No |
| `messages` | `sender_id` | UUID | Yes | User UUID | Must be a participant in the request | No |
| `messages` | `message_text` | Text | Yes | Is this available tomorrow? | Cannot be empty | No |

## 3. Status Values

| Status | Meaning | Who Can Update? |
|---|---|---|
| Available | The resource or service is currently available | Listing owner |
| Reserved | The resource or service has an active approved arrangement | Listing owner |
| Unavailable | The resource or service is not currently available | Listing owner or authorized admin |
| Pending | A request has been submitted but not yet reviewed | System on submission |
| Approved | The listing owner accepted the request | Listing owner |
| Rejected | The listing owner declined the request | Listing owner |
| Completed | The borrowing or service request has been completed | Request participants or authorized admin |
| Closed | The listing or request is no longer active | Record owner or authorized admin |

## 4. Access-Control Rules

Supabase Row Level Security will be enabled for exposed tables. Authenticated users may view appropriate active listings, create listings under their own account, manage only their own listings, submit their own requests, and view requests in which they are the requester or listing owner. Only authorized administrators may perform moderation actions.

## 5. Sample Records

The repository’s current sample-data reference is stored at:

`/data/sample-record.csv`

The sample data may include fictional profiles, listings, categories, requests, and messages for development and demonstration.

## 6. Data Privacy Note

The prototype will not collect unnecessary sensitive information such as national ID numbers, home addresses, payment details, or publicly displayed personal phone numbers. Passwords are handled by Supabase Authentication and are not stored directly by the application. Sample data will use fictional names, masked RSU email addresses, and example listings.
