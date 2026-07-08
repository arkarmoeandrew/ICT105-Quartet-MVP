# Data Structure

## Project Title
RSU Nexus – Campus Resource Marketplace

## 1. Main Data Entities / Tables

| Entity / Table | Purpose | Example Records |
|---|---|---|
| Users | Store student and admin account information | U001, Andrew, andrew@rsu.ac.th, Student |
| Resource Listings | Store academic equipment, learning resources, and student service listings | L001, Canon DSLR Camera, Equipment, Available |
| Requests | Store borrow/contact requests between students | R001, U002 requests L001, Pending |
| Messages | Store simple contact messages between requester and owner | M001, “Is this available tomorrow?” |
| Categories | Store listing categories for filtering | Equipment, Textbooks, Student Services |
| Admin Actions | Store admin management actions | A001, Delete invalid listing, Admin01 |

## 2. Field Definition

| Entity | Field Name | Data Type | Required? | Example Value | Validation Rule | Used For Search/Filter? |
|---|---|---|---|---|---|---|
| User | user_id | Text/ID | Yes | U001 | Unique value | Yes |
| User | name | Text | Yes | Andrew | Cannot be empty | No |
| User | email | Text | Yes | andrew@rsu.ac.th | Must be valid RSU email | Yes |
| User | role | Text/List | Yes | Student | Student/Admin only | Yes |
| Resource Listing | listing_id | Text/ID | Yes | L001 | Unique value | Yes |
| Resource Listing | title | Text | Yes | Canon DSLR Camera | Cannot be empty | Yes |
| Resource Listing | category | Text/List | Yes | Equipment | Must match category list | Yes |
| Resource Listing | description | Text | Yes | DSLR camera available for project work | Cannot be empty | No |
| Resource Listing | availability_status | Text/List | Yes | Available | Available/Reserved/Unavailable | Yes |
| Resource Listing | owner_id | Text/ID | Yes | U001 | Must match existing user | No |
| Request | request_id | Text/ID | Yes | R001 | Unique value | Yes |
| Request | listing_id | Text/ID | Yes | L001 | Must match existing listing | No |
| Request | requester_id | Text/ID | Yes | U002 | Must match existing user | No |
| Request | request_status | Text/List | Yes | Pending | Pending/Approved/Rejected/Completed | Yes |
| Message | message_id | Text/ID | Yes | M001 | Unique value | No |
| Message | request_id | Text/ID | Yes | R001 | Must match existing request | No |
| Message | message_text | Text | Yes | Is this available tomorrow? | Cannot be empty | No |

## 3. Status Values

| Status | Meaning | Who Can Update? |
|---|---|---|
| Available | The resource or service is currently available | Listing Owner |
| Reserved | The resource or service has been requested or reserved | Listing Owner |
| Unavailable | The resource or service is not currently available | Listing Owner / Admin |
| Pending | A request has been submitted but not yet reviewed | System |
| Approved | The owner accepted the request | Listing Owner |
| Rejected | The owner declined the request | Listing Owner |
| Completed | The borrowing or service request has been completed | Listing Owner / Admin |
| Closed | The listing or request is no longer active | Admin |

## 4. Sample Records

Sample dataset will be stored in:

`/data/sample-records.csv`

Example records may include sample users, resource listings, categories, requests, and message records.

## 5. Data Privacy Note

The prototype will not collect sensitive personal information such as national ID numbers, passwords, phone numbers, addresses, or payment details. Sample data will use fictional student names, masked RSU email addresses, and example resource listings. Any user data shown in the prototype will be anonymized and used only for demonstration purposes.
