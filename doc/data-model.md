# Data model

Relational schema of the data model, with some exceptions (`tags` and `responsibles`, which are not normalized).

We want data to be explored by many points of view, such as:

- navigate trhrough use cases to test and steps
- view what test and steps have been executed per session, and what was their status
- report test statuses (ideally in a graph)
- view comments per session, data or test

```mermaid
erDiagram  
  UseCase {
    int id
    string title
    string description
    string requirements "Data preparation"
    string accountant "Accountable user"
    string responsible "List of responsible users"
    enum status "TODO, WORKING, PASSED, FAILED, BLOCKED"
    date startDate
    date endDate
    array tags "List tag ids"
  }
  Test {
    int id
    int useCaseId
    string title
    string description
    string requirements
    string inputData
    string expectation
    enum status "TODO, WORKING, PASSED, FAILED, BLOCKED"
    array tags "List tag ids"
  }
  Step {
    int id
    string title
    string description
    string expectation
    array tags "List tag ids"
  }
  Session {
    int id
    string title
    date date
  }
  Status {
    int id
    string entity "belongs to Test and Step"
    int entityId "Entity id"
    int sessionId
    enum value "TODO, WORKING, PASSED, FAILED, BLOCKED"
  }
  Comment {
    int id
    int sessionId
    string entity "belongs to UseCase, Test and Step"
    int entityId "Entity id"
    string text
    string user "Comment signature"
    date date
    array tags "List tag ids"
  }
  Tag {
    int id
    string label
  }
  UseCase   ||--o{   Test     : hasMany
  Test      ||--o{   Step     : hasMany
  Test      ||--o{   Status   : "has one status per session" 
  Step      ||--o{   Status   : "has one status per session"
  Status    }o--||   Session  : belongsTo
```