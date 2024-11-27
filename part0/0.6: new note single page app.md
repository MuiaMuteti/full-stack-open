```mermaid

sequenceDiagram
    participant Browser
    participant Server

    Note right of Browser: The browser renders the notes
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    Server-->>Browser: HTTP code 201 (created)
    deactivate Server
