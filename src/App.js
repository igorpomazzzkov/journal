import './index.css'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Main from './components/Main'
import { ChakraProvider } from "@chakra-ui/react"
import Auth from "./components/Auth";
import { history } from "./settings/history";
import { clearMessage } from "./actions/message";
import { connect } from "react-redux"
import NotFound from './components/NotFound'

function App(props) {

    history.listen((location) => {
        props.dispatch(clearMessage())
    })

    return (
        <ChakraProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/home" component={Main} />
                    <Route path="/auth" component={Auth} />
                    <Route path="**" component={NotFound} />
                </Switch>
            </BrowserRouter>
        </ChakraProvider>
    );
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(App)
