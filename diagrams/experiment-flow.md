flowchart TD
   
    A[Review RSU Nexus Requirements, User Stories, MVP Features, Architecture, and Wireframes]
    
    --> B[Identify Critical Assumptions]

    B --> C[Select Interactive Web Prototype and Form-Based Testing]

    C --> D[Define Test Users: At Least 5 RSU Students]

    D --> E[Prepare Experiment Script, Tasks, Feedback Form, and Success Metrics]

    E --> F[Run the RSU Nexus MVP Usability Test]

    F --> G[Collect Task Results, Ratings, Observations, and User Feedback]

    G --> H{Do the Results Meet the Success Targets?}

    H -->|Yes| I[Continue to Implementation Sprint]

    H -->|Some Metrics Fail| J[Revise the Interface, Workflow, Labels, or Feature Priority]

    H -->|Most Metrics Fail| K[Revisit Requirements, User Stories, and Critical Assumptions]

    J --> F
    K --> B
