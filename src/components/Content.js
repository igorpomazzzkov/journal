import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import MyJournals from './MyJournals'
import Students from './StudentsComponent/Students'
import Subjects from './SubjectsComponent/Subjects'
import Groups from './GroupsComponent/Groups'
import Journals from './JournalsComponent/Journals'
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
                        path="/home"
                        component={() => <MyJournals props={props} />}
                    />
                    <Route
                        exact
                        path="/home/subjects"
                        component={() => <Subjects />}
                    />
                    <Route
                        path="/home/students"
                        component={() => <Students />}
                    />
                    <Route
                        path="/home/groups"
                        component={() => <Groups />}
                    />
                    <Route
                        path="/home/journals"
                        component={() => <Journals />}
                    />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default Content