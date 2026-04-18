```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studios.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of browser: New note sent as request body
    server-->>browser: 302 Redirect to https://studios.cs.helsinki.fi/exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: new note sent back from server
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```