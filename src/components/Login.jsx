import {Grid, GridItem} from "@chakra-ui/react"

const Login = () => {
    return (
        <Grid h="100vh" templateColumns="repeat(2, 1fr)">
            <GridItem rowSpan={1}/>
            <GridItem rowSpan={1} bg="tomato"/>
        </Grid>
    )
}

export default Login;