import React, {Component} from 'react'
import { Grid, GridItem, Box } from '@chakra-ui/layout'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'
import {connect} from 'react-redux'
import UserService from '../service/user-service'

class Main extends Component {

    constructor(props){
        super(props)
        UserService.getActiveUser().then((data) => {
            localStorage.setItem("user", JSON.stringify(data))
        })
    }

    render() {
        const {isLoggedIn, dispatch} = this.props;
        if (!isLoggedIn) {
            return <Redirect to="/auth"/>
        }
        return (
            <Grid h="100vh" templateColumns="2fr 10fr" gap={2}>
                <GridItem h="100vh">
                    <Box  h="100vh" boxShadow="xl" mb="-10" p="6">
                        <Nav isLoggedIn={isLoggedIn} dispatch={dispatch}/>
                    </Box>
                </GridItem>
                <GridItem p="6">
                    <p>Content</p>
                </GridItem>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    const {isLoggedIn} = state.auth;
    const {message} = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Main);