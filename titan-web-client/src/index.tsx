import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '@titan/registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {routes} from '@titan/modules/routes';
import {SnackbarProvider} from "notistack";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {MatPickerDateUtils} from "@titan/lib/mat_picker_date_utils";
import {
    createMuiTheme,
    MuiThemeProvider
} from "@material-ui/core/styles";
import { Provider as ReduxProvider } from 'react-redux';
import {CssBaseline} from "@material-ui/core";
import {AppStore} from "@titan/store";

const defaultMuiTheme = createMuiTheme(createMuiTheme({
    palette: {
        type: 'dark',
    },
}));

ReactDOM.render(
  <MuiThemeProvider theme={defaultMuiTheme}>
      <CssBaseline />
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'}}>
      <MuiPickersUtilsProvider utils={MatPickerDateUtils}>
          <ReduxProvider store={AppStore}>
              <BrowserRouter>
                  {routes}
              </BrowserRouter>
          </ReduxProvider>
      </MuiPickersUtilsProvider>
    </SnackbarProvider>
  </MuiThemeProvider>
    , document.getElementById('root'));
registerServiceWorker();
