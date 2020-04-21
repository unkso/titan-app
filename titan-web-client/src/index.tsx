import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '@titan/registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {routes} from '@titan/modules/routes';
import {SnackbarProvider} from "notistack";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {MatPickerDateUtils} from "@titan/lib/mat_picker_date_utils";
import { StylesProvider, withStyles } from '@material-ui/core/styles';
import {
    createMuiTheme,
    MuiThemeProvider
} from "@material-ui/core/styles";
import { Provider as ReduxProvider } from 'react-redux';
import {CssBaseline} from "@material-ui/core";
import {AppStore} from "@titan/store";
import {Palette, Typography} from "@titan/themes/default";

const styles = theme => ({
    "@global": {
        // MUI typography elements use REMs, so you can scale the global
        // font size by setting the font-size on the <html> element.
        html: {
            fontSize: 18,
        },
        ...Typography,
    }
});

const defaultMuiTheme = createMuiTheme(createMuiTheme({
    palette: {
        primary: Palette.primary,
        background: {
            default: Palette.background[500],
            paper: Palette.background[400],
        },
        type: 'dark',
    },
    typography: Typography
}));

const AppWithStyles = withStyles(styles)(() => (
    <StylesProvider injectFirst>
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
    </StylesProvider>
));

ReactDOM.render(
    <AppWithStyles />
    , document.getElementById('root'));
registerServiceWorker();
