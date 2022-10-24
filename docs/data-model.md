# Data model

Relational schema of the data model, with some exceptions (`tags` and `responsibles`, which are not normalized).

We want data to be explored by many points of view, such as:

- navigate trhrough use cases to test and steps
- view what test and steps have been executed per session, and what was their status
- report test statuses (ideally in a graph)
- view comments per session, data or test

```mermaid
erDiagram
  Testbook{
    string name
    string description
    string version
  }
  UseCase {
    int id
    string title
    string description
    string requirements "Data preparation"
    int accountantId "Accountable user"
    array responsibleId "List of responsible users"
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
    array tags "List tag ids"
  }
  Step {
    int id
    int testId
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
    int sessionId
    string entity "belongs to Test and Step"
    int entityId "Entity id"
    enum value "TODO, WORKING, PASSED, FAILED, BLOCKED, SKIPPED"
  }
  Comment {
    int id
    int sessionId
    string entity "belongs to UseCase, Test and Step"
    int entityId "Entity id"
    string text
    int userId "optional"
    date date
    array tags "List tag ids"
  }
  User {
    int id
    string name
    string surname
    string role "Working role e.g (Manager, Developer)"
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
