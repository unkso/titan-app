import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '@titan/registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {routes} from '@titan/modules/routes';
import {getStoreInstance} from '@titan/lib/redux';
import local_storage from "@titan/lib/storage/local_storage";
import {defaultTheme} from "@titan/themes/default";
import {SnackbarProvider} from "notistack";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {MatPickerDateUtils} from "@titan/lib/mat_picker_date_utils";
import {
    createMuiTheme,
    MuiThemeProvider
} from "@material-ui/core/styles";
import { Provider as ReduxProvider } from 'react-redux';
import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";

const defaultMuiTheme = createMuiTheme(createMuiTheme({
    palette: {
        type: 'dark',
    },
}));
const store = getStoreInstance();

// If auth credentials are present in local storage, load them into
// application state.
store.addInitHandler(state => {
    // TODO rename TITAN_APP to titan_auth
    const auth = local_storage.load('TITAN_APP');
    if (auth) {
        state.auth = auth;
    }
    return state;
});

ReactDOM.render(
  <MuiThemeProvider theme={defaultMuiTheme}>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'}}>
      <MuiPickersUtilsProvider utils={MatPickerDateUtils}>
        <div id="app-root">
          <ReduxProvider store={store.getStore()}>
              <BrowserRouter>
                  {routes}
              </BrowserRouter>
          </ReduxProvider>
        </div>
      </MuiPickersUtilsProvider>
    </SnackbarProvider>
  </MuiThemeProvider>
    , document.getElementById('root'));
registerServiceWorker();
