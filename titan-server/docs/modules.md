# Modules

- [structure](#structure)
    - [controllers](#structure-controllers)
    - [listeners](#structure-listeners)
    - [lib](#structure-lib)
    - [mod.rs](#structure-mod)

## Structure
```
{module}
├─── controllers/
├─── listeners/
├─── lib/
├─── mod.rs
```

### controllers/
<a id="#structure-controllers"></a>

A controller contains methods for each route in the app. These methods must only hold logic for receiving input, sending input to another part of the app for processing, and returning an appropriate response. No other business logic may reside in a route method.

### listeners/
<a id="#structure-listeners"></a>

The listeners directory contains handlers for events that may be emitted from anywhere in the app.

### lib/
<a id="#structure-lib"></a>
Contains rust files for business logic, helper functions, etc.

### mode.rs

Mounts module routes and listeners to the app.
