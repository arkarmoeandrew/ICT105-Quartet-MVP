# Startup / Product Metrics


## 1. Metrics Summary

| Metric ID | Metric Name | Metric Type | Why This Metric Matters | Formula / How to Calculate | Data Source | Prototype Screen |
|---|---|---|---|---|---|---|
| M-01 | Total Records | Usage | Shows the total number of borrow records managed by the system. | DISTINCTCOUNT(PrototypeRecords[RecordID]) | PrototypeRecords | Power BI Dashboard |
| M-02 | New Borrow Requests | Usage | Measures how many new borrow requests users submit. | COUNTROWS(ActivityLog where ActionType = "SubmitReport") | ActivityLog | Dashboard |
| M-03 | Pending Requests | Status | Shows how many borrow requests are still waiting for approval or processing. | COUNT(Status = "Pending") | PrototypeRecords | Dashboard |
| M-04 | Resolution Rate | Performance | Indicates how efficiently borrow requests are completed. | Resolved Cases ÷ Total Records × 100 | PrototypeRecords | KPI Cards |
| M-05 | Search Activity | User Behaviour | Measures how frequently users search for items before borrowing. | COUNT(ActionType = "SearchRecord") | ActivityLog | Dashboard |
| M-06 | Average Processing Time | Performance | Measures the average processing time for user activities and admin actions. | AVERAGE(ActivityLog[ProcessingTimeMinutes]) | ActivityLog | Dashboard |

---

## 2. Metrics Interpretation

The Startup Metrics Dashboard shows that the Nexus Borrow Item System is actively being used by students and administrators. The total number of borrow records and new submissions indicates that users are interacting with the system regularly. The pending request metric helps identify requests that still require administrator action. The resolution rate measures how efficiently borrow requests are completed and highlights the overall performance of the system. Search activity provides insight into how users find available items before making a request. The average processing time helps evaluate operational efficiency and identifies opportunities to improve response time. Overall, these metrics allow the team to monitor product usage, identify bottlenecks, and support future improvements based on real data.

---

## 3. Link to Final Prototype

These metrics are displayed in the **Lab 11 Startup/Product Metrics Dashboard** built with Power BI. KPI cards present Total Records, New Borrow Requests, Pending Requests, and Resolution Rate, while charts visualize item status, item categories, activity types, activity timeline, and requirement coverage. Interactive slicers allow users to filter the dashboard by User Role, Device Type, Current Status, and Item Category. Together, these metrics demonstrate the operational performance, user activity, and validation progress of the Nexus Borrow Item System.
