import React from "react"
import {Grid, GridItem, Text, Center, Stack} from "@chakra-ui/react"
import {Route, Switch, useRouteMatch} from "react-router-dom"
import Registration from "./Registration"
import Login from './Login'
import {useMediaQuery} from "@chakra-ui/react"

const Auth = () => {
    let {path} = useRouteMatch();
    const [isDisplayingInBrowser] = useMediaQuery([
        "(min-width: 1020px)",
    ])

    return (
        <Grid h="100vh" templateColumns={isDisplayingInBrowser ? "repeat(2, 1fr)" : "repeat(1, 1fr)"}>
            {isDisplayingInBrowser ?
                <GridItem rowSpan={1}>
                    <Center h="100%">
                    <Stack spacing={-1}>
                        <Text color="tomato" fontWeight="800" fontSize="4xl">ЭЛЕКТРОННЫЙ</Text>
                        <Text color="darkslategray" fontWeight="600" fontSize="3xl">Журнал</Text>
                    </Stack>
                    </Center>
                </GridItem>: null}
            <GridItem rowSpan={1} bg="tomato">
                <Center h="100%">
                    <Switch>
                        <Route path={`${path}/registration`}>
                            <Registration/>
                        </Route>
                        <Route path={`${path}/login`}>
                            <Login/>
                        </Route>
                        <Route path={path}>
                            <Login/>
                        </Route>
                    </Switch>
                </Center>
            </GridItem>
        </Grid>
    );
}

export default Auth;