# Extensions
Need to implement a new feature? This will be its home. Extensions are mini-apps within Titan that expose a group of related features.

An extension should be self-contained, only dependent on Titan's core APIs to be functional. In other words, no two extensions should attempt to share state or reference each other in any way.

> You should be able to delete an extension without breaking other parts of the app.

## Structure
```text
auth/
├── actions/
│   ├── action-types.js
│   └── session-actions.js
├── app/
│   ├── forgot-password
│   │   ├── components/
│   │   └── index.js
│   ├── login
│   │   ├── components/
│   │   └── index.js
│   └── logout
│       ├── components/
│       └── index.js
├── components/
├── reducers/
    └── session-reducer.js
└── index.js
```

## actions/
An action always updates the redux data store. They can fetch information from an API service, sort data, or perform any other business logic before persisting it to redux.

## app
Each directory in `app/` should represent a page in the extension. The page's root component should be defined in `app/{page}/index.js`. Any page-specific components should reside in `app/{page}/components`.
 
 If a page has its own child views, each child view should have its own directory within `app/{page}/`.
 
# components
Generic components used by two or more of the extension's pages. If only one page uses a component, that component should reside in that page's directory.

## reducers/
Contains a extension's redux state reducers.

Reducers simply update a piece of the application state. They should not perform API calls, sort data, or execute any other forms of business logic.