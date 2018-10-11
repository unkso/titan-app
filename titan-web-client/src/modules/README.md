# Modules
There are certain features that *must* exist for Titan to function properly. Examples of these include login/logout, user management, permissions, settings, etc. These features are closely coupled and depend on each other to be functional. We call the implementation of these features a `module`.
 
 It is important to understand that a feature should only be implemented as a module if the core of titan is incomplete without it. Optional plug-and-play features should be implemented as an `extension`.
 
 ## Structure
 ```text
 modules/
 └── auth/
     ├── forgot-password
     │   ├── components/
     │   └── index.js
     ├── login
     │   ├── components/
     │   └── index.js
     └── logout
     │   ├── components/
     │   └── index.js
     ├── components/
     └── index.js
```

## State

### Actions
coming soon...

### Reducers
coming soon...
