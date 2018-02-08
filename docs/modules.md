# Modules
Titan is divided into isolated feature contains, known as modules.

## Structure
```
{vendor}-{module}
├─── actions/
├─── components/
├─── containers/
├─── reducers/
├─── scenes/
├─── services/
├─── index.js
```

### actions/
<a id="structure-actions"></a>
Contains a module's redux actions.

An action always updates the redux data store. They can fetch information from [API services](#structure-services), sort data, or perform any other business logic.

### components/
<a id="structure-components"></a>
Contains components that are specific to the module. Generic/universal components, such as form inputs, buttons, tables, cards, etc, should be placed in the `titan-components` module instead.

Components may only contain state and business logic specific to rendering a view. Redux operations do not belong in a component.

### containers/
<a id="structure-containers"></a>
Containers fetch data from the redux store, execute redux actions, and manage callbacks for interactive events (click, change, hover, submit, etc).

A container should render a very minimal template, passing callbacks and redux information as properties into the components it renders.

General purpose containers should be placed in the `titan-core` module.

### Reducers/
<a id="structure-reducers"></a>
Contains a module's redux state reducers.

Reducers simply update a piece of the application state. They should not perform API calls, sort data, or execute any other forms of business logic.

### Scenes/
<a id="structure-scenes"></a>
Contains a module's top level components.

Scenes are essentially top-level components that build the structure of a page. They construct row/column grids, and place containers or other child components within the grid structure.

They should not contain business logic, API calls, or interact with the redux store.

### Services
<a id="structure-services"></a>

Coming soon.


## Rendering
<a id="rendering"></a>

Layout, scene, component chart coming soon.