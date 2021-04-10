import React, { Component } from 'react'
import { Grid, GridItem, Box } from '@chakra-ui/react'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'
import { connect } from 'react-redux'
import Header from './Header'
import Content from './Content'

class Main extends Component {

    state = {
        user: JSON.parse(localStorage.getItem('user'))
    }

    render() {
        const { isLoggedIn, dispatch } = this.props;
        if (!isLoggedIn) {
            return <Redirect to="/auth" />
        }
        return (
            <Grid h="100vh" templateColumns="280px 10fr">
                <GridItem h="100vh">
                    <Box h="100vh" boxShadow="xs" mb="-10" p="6">
                        <Nav isLoggedIn={isLoggedIn} dispatch={dispatch} user={this.state.user}/>
                    </Box>
                </GridItem>
                <GridItem ml="0">
                    <Grid templateRows="1fr 5fr" width="100%" height="100%">
                        <Header dispatch={dispatch} bg="red" user={this.state.user}/>
                        <Content/>
                    </Grid>
                </GridItem>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Main);