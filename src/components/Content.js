import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import MyJournals from './MyJournals'
import Students from './Students'
import Subjects from './Subjects'
import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { ThemeProvider } from '@material-ui/styles';


const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#ff7043',
        },
        secondary: {
          main: '#ff8a65',
        },
      },
});

const Content = (props) => {

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={() => <MyJournals props={props} />}
                    />
                    <Route
                        exact
                        path="/subjects"
                        component={() => <Subjects />}
                    />
                    <Route
                        path="/students"
                        component={() => <Students />}
                    />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default Content