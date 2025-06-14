# yTestbook

## Motivation

Everytime clients ask for managing tests, we look for proper FREE software, ending using excel with big frustration.

We need a free software, simplified, with great user experience and with these additional features:

- text based database: simple to read, store, share (by email, messenger, shared folder, git repository...) and versioning (git...). Json or markdown could fit well.
- ability to export in multiple formats: html, excel (csv), pdf...
- standalone application, easy to install, also easy to deploy publicly, where loading data and saving/exporting/download

## Requirements

Each database/file represents a **testbook**, which contains multiple **use cases**.

Each Use case has multiple tests, each test has multiple steps.

Each of these entities (use case, test, step) has a **status**, container entities (use cases, tests) can have PASSED status only when all sub-entities have PASSED too.

Entities can have **tags**, to allow grouping in a flexible way. They can also have **comments**: every comment is also related to a session.

Tests are executed in **sessions**. Sessions are meant to record test execution, a new session is automatically started every day you execute tests (technically it can be simply represented by the execution date).

User journey shuold be divided in three main **contexts**:

**Plan**

This section represents the administrative part of the App in order to manage the entities and their relationships.
The section in preparatory in order to describe tests in a tree structure like:

```
- use case 1
  - test 1
    - step 1
    - step 2 ...
  - test 2
    - step 1
    - step 2 ...
- use case 2
  - tests ...
    - steps ...
```

Pages:

- Testbook: edit the testbook fields (name, description, version)
- Collaborators: Manage the users (no authentication logic)
- Use cases:

  - each use case has:
    - a title
    - an optional description
    - an optional accountable user (reporter)
    - a list of optional responsible users
    - a status (TODO, WORKING, PASSED, FAILED, BLOCKED, SKIPPED)
    - an optional tag (es: category)
    - a list of requirements (for data preparation): what is necessary to execute tests (list of strings or texts, in case of configuration files, stubs etc.)
    - start date
    - end date

- Test:

  - each test has:

    - a title
    - an optional description
    - a status (TODO, WORKING, PASSED, FAILED, BLOCKED, SKIPPED)
    - an optional tag (es: category)
    - multiple sessions
    - input data: an object or a list of data to run test properly
    - multiple comments, associated to:
      - session
      - user
    - _optional_: link to automated test
      - url
      - http method
      - input params
      - expected: result expected to pass

- Step

  - each step has:
    - a title
    - an optional description
    - a status (TODO, WORKING, PASSED, FAILED, BLOCKED, SKIPPED)
    - an optional tag (es: category)
    - input data: an object or a list of data to run test properly
    - expectation: a description of what makes it pass

**Execute**

> 1° Step: The page displays a list of Use Cases teasers. For each of them, if the user click on it, then it shows the detail of his.

> 2° Step: Inside the use case details there is the list of the test.

> 3° Step: if the user starts a test, the app loads the test details with the requirments, the extected result and a list of task in order to complete the test.

A session corresponds to a day. If the user start a test, the app check if there already is a session for that day. If there is no session already created for that day, a new one will be created and automatically associated to the test that you started before.

Use cases, tests and steps can have multiple comments

**Report**

- total number of use cases, test, steps
- number of use cases for each status
- number of test for each status
- number of steps for each status
- list of sessions, and possibility to view what's related to
- export

## Nice to have

- kanban view, using status as column and use cases or tests for cards
- kanban view by tag
- gantt views:
  - for planning, using use cases start/end dates
  - for execution: using sessions as "sections" and use cases /tests as "tasks"
- UI deployed to github pages, with public access, where load a local testbook and save it (download)
- export report and/or details as:
  - html
  - markdown (+ mermaid graphs)
  - csv/excel
  - pdf
- ability to link every test to a remote service, in order to automate test execution

## Dependencies and resources

Suggested tools

- desktop container:
  - https://neutralino.js.org/
  - electron
- react
- ui kit: https://mantine.dev/
- mermaid: https://mermaid-js.github.io/mermaid/#/
- json database options:
  - plain json
  - https://github.com/pubkey/rxdb
  - https://pouchdb.com
  - https://github.com/Nozbe/WatermelonDB
  - https://github.com/techfort/LokiJS
  - https://github.com/typicode/lowdb
