import './index.css'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Main from './components/Main'
import NotFound from './components/NotFound'
import {ChakraProvider} from "@chakra-ui/react"
import Auth from "./components/Auth";
import {history} from "./settings/history";
import {clearMessage} from "./actions/message";
import { connect } from "react-redux";

function App(props) {

    history.listen((location) => {
        props.dispatch(clearMessage())
    })

    return (
        <ChakraProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="**" component={NotFound}/>
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
