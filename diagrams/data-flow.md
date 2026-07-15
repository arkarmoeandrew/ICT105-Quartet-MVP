flowchart TD
    A[User creates a resource listing] --> B{Input validation}
    B -->|Valid| C[Save listing]
    B -->|Invalid| D[Show error message]
    C --> E[Display confirmation]
    C --> F[Marketplace listings]
    F --> G[Search / Filter resources]
    F --> H[Resource detail view]
    H --> I[Contact resource owner]
    I --> J[Admin updates listing status]
    J --> K[Updated listing]
    K --> L[Dashboard / Summary]
