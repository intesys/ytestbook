# App structure

App navigation is organized in `/src/Navigation.tsx` and follows this schema:

- / - initial page for selecting a database, or creating/importing a new one
- /:testbook - testbook main page
  - /:testcase
    - /:test
      - /:step

# How code is organized

## API

`/src/api` folder contains all logic to connect to database/external resources.

App uses PouchDB network capabilities to connect to local or remote DB, so you don't have to write HTTP apis for most cases.
This ensures app to be able to work locally as electron app, PWA with local or remote DB.

App also relies on PouchSB `change`, exposing an observable query and allowing to update app state accordingly to DB state. This will be useful if we will connect to a remote and shared database.

Save in this folder all DB-related types and consts, that are not global and sould not be shared with other parts of the app.

## Hooks

`/src/hooks` contains hooks to connect PouchDB and react state. Use it for managing `change` events from PouchDB and connect them to react state. Use it also for calling regular DB function, as `get`, `put`, `delete` and expose to react components.

If needed for performance reasons, we could also move all or part of hooks logic to context, using react `context` api. In this case we could move part or all logic here in a `/src/context` folder.

## Types

Global types and data models are stored in `/src/types`.

## Components

**Page components** are stored in `/src/components/sections`.

Other folders in `/src/components` are pretty straightforward and can be extended as needed.

## Server

`/server` folder contains a local nodejs app exposing PouchDB. At this moment you **don't need to change it**, unsless you want to manage authentication or CORS.

## Electron

`/electron` folder contains electron settings, don't need to be touched.
