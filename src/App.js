import './index.css'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Main from './components/Main'
import Login from './components/Login'
import Registration from './components/Registration'
import {ChakraProvider} from "@chakra-ui/react"

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Main/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/registration">
                        <Registration/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
