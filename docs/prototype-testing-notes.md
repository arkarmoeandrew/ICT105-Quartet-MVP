# Prototype Testing Notes

## Test Environment

- **Prototype link or folder:** Nexus Borrow Item System (Local Prototype & Power BI Dashboard)
- **Browser/device used:** Google Chrome on Windows 11 Laptop
- **Tester role:** Student User / Admin User
- **Test date:** 22 July 2026

---

## Main Test Cases

| Test ID | User Flow / Feature | Steps to Test | Expected Result | Actual Result | Status | Issue Found | Fix / Next Action |
|---|---|---|---|---|---|---|---|
| T-01 | Open homepage | Open the prototype homepage | Homepage displays title, navigation, and featured items correctly | Homepage loaded successfully with all sections | ✅ Passed | None | No action required |
| T-02 | Submit borrow request | Complete the borrow request form and submit | Request is submitted successfully and confirmation message appears | Form submitted successfully with confirmation message | ✅ Passed | None | Continue monitoring form validation |
| T-03 | View item list | Open the available items page | All items and their availability status are displayed | Item list displayed correctly with categories and status | ✅ Passed | None | No action required |
| T-04 | Search and filter items | Search using keywords and apply category/status filters | Matching items are displayed correctly | Search and filter returned correct results | ✅ Passed | None | Add advanced search options in future |
| T-05 | View item details | Select an item from the list | Complete item information is displayed | Item details displayed correctly | ✅ Passed | None | Consider adding related item recommendations |
| T-06 | Update item status (Admin) | Change an item's status from Admin page | Status is updated and reflected in the dashboard | Status updated successfully and Power BI metrics refreshed after data update | ✅ Passed | Dashboard requires refresh after CSV update | Automate data refresh using database integration |
| T-07 | Startup Metrics Dashboard | Open Power BI dashboard | KPI cards, charts, tables, and slicers display correct values | Dashboard displays all required metrics using lecturer's DAX measures | ✅ Passed | Device Type slicer affected KPI values during testing | Clear slicer filters before validating dashboard metrics |

---

## Summary of Issues

- Dashboard KPI values changed when the **Device Type** slicer was filtered instead of **All**.
- Timeline chart initially grouped data by **Date & Time** instead of **Date only**.
- Power BI dashboard requires a manual refresh after updating CSV datasets.

---

## Improvements Completed During Lab 11

- Implemented search and category filtering.
- Improved borrow request form validation.
- Added confirmation messages after successful submissions.
- Integrated **PrototypeRecords** and **ActivityLog** datasets for Power BI.
- Created all required DAX measures for Startup/Product Metrics Dashboard.
- Designed KPI cards, charts, slicers, requirement coverage, and detailed record table.
- Improved UI consistency across prototype pages.
- Updated documentation, screenshots, testing notes, and GitHub repository.
