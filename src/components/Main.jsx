import React, { useState, useEffect } from 'react'
import { Grid, GridItem, Box, useMediaQuery, useDisclosure } from '@chakra-ui/react'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'
import { connect } from 'react-redux'
import Header from './Header'
import Content from './Content'
import UserService from '../service/user-service'
import JournalService from '../service/journal-service'
import { Drawer, DrawerContent, IconButton, DrawerOverlay } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import Loader from './Loader'
import { useHistory } from 'react-router-dom'

const Main = (props) => {

    const [journals, setJournals] = useState(null)
    const [isDisplayingInBrowser] = useMediaQuery([
        "(min-width: 900px)",
    ])

    const { isOpen, onOpen, onClose } = useDisclosure()
    const history = useHistory();
    const { isLoggedIn, dispatch } = props;
    useEffect(() => {
        if (isLoggedIn) {
            UserService.getActiveUser().then(() => {
                JournalService.getJournalsByTeacherId(JSON.parse(localStorage.getItem('user')).id).then((data) => {
                    setJournals(data)
                })
            })
        }
    }, [])


    if (!isLoggedIn) {
        return <Redirect to="/auth" />
    }
    if (journals === null) {
        return <Loader />
    }
    const user = JSON.parse(localStorage.getItem('user'))
    const roles = JSON.parse(localStorage.getItem('credentials')).roles
    const isTeacher = roles.some(role => 'TEACHER' === role)
    const isAdmin = roles.some(role => 'ADMIN' === role)
    const isStudent = roles.some(role => 'STUDENT' === role)

    return (
        <Grid h="100vh"
            templateColumns={isDisplayingInBrowser ? "280px 10fr" : "10fr"} gap={2}>
            {isDisplayingInBrowser && <GridItem colSpan="280px" boxShadow="xs">
                <Box boxShadow="xs" h="100%" mb="-10" p="6">
                    <Nav boxShadow="xs" isLoggedIn={isLoggedIn}
                        isAdmin={isAdmin}
                        isTeacher={isTeacher}
                        isStudent={isStudent}
                        journals={journals}
                        dispatch={dispatch} user={user} />
                </Box>
            </GridItem>}
            {!isDisplayingInBrowser &&
                <Box px="20px">
                    <IconButton size="lg"
                        onClick={onOpen}
                        aria-label="Search"
                        variant="ghost"
                        icon={<HamburgerIcon color="gray" />}
                    />
                    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                        <DrawerOverlay>
                            <DrawerContent p="5">
                                <Nav boxShadow="xs" isLoggedIn={isLoggedIn}
                                    isAdmin={isAdmin}
                                    isTeacher={isTeacher}
                                    isStudent={isStudent}
                                    journals={journals}
                                    dispatch={dispatch}
                                    user={user} />
                            </DrawerContent>
                        </DrawerOverlay>
                    </Drawer>
                </Box>
            }
            <GridItem>
                <Grid templateRows="1fr 8fr" h="100%">
                    <Header dispatch={dispatch} user={user} />
                    <Content
                        journals={journals}
                        isTeacher={isTeacher}
                        isAdmin={isAdmin}
                        isStudent={isStudent} />
                </Grid>
            </GridItem>
        </Grid>
    )
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