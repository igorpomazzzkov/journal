import React, { Component } from 'react'
import { Flex, Box, Text, Button, Collapse, Link, Spacer } from "@chakra-ui/react"
import { logout as log } from '../actions/auth'
import Avatar from 'react-avatar';

class Nav extends Component {

    constructor(props) {
        super(props)
        this.showCatalogs = this.showCatalogs.bind(this)
        this.showJournals = this.showJournals.bind(this)
        this.logout = this.logout.bind(this)
    }

    roles = JSON.parse(localStorage.getItem('credentials')).roles

    state = {
        isShowJournals: false,
        isShowCatalogs: false,
        email: JSON.parse(localStorage.getItem('credentials')).username,
        user: this.props.user,
        roleString: JSON.parse(localStorage.getItem('credentials')).roles.splice(',').toString().toLowerCase(),
        isTeacher: this.roles.some(role => 'TEACHER' === role),
        isAdmin: this.roles.some(role => 'ADMIN' === role),
        isStudent: this.roles.some(role => 'STUDENT' === role),
    }

    showJournals = () => this.setState({
        isShowJournals: !this.state.isShowJournals
    })

    showCatalogs = () => this.setState({
        isShowCatalogs: !this.state.isShowCatalogs
    })

    logout() {
        const { dispatch } = this.props;
        dispatch(log())
    }

    render() {
        return (
            <Flex flexDirection="column" justifyContent="start" alignItems="start" w="100%" h="100%">
                <Box d="flex" flexDirection="column" alignItems="start" w="100%">
                    <Box boxShadow d="flex" mb="50px" alignItems="center" borderRadius="10px" bg="whitesmoke" w="100%" py="16px" px="20px">
                        <Avatar round={true} size="40" extSizeRatio={1} name={this.state.user?.lastName} email={this.state.email} src={this.state.user?.image} />
                        <Box pl="10px">
                            <Text fontFamily="Be Vietnam, sans-serif" fontWeight="600" fontSize="0.875rem" lineHeight="1.5">
                                {this.state.user?.lastName + " " + this.state.user?.firstName.slice(0, 1).toUpperCase() + ". " + (this.state.user?.middleName ? this.state.user?.middleName?.slice(0, 1).toUpperCase() + "." : "")}
                            </Text>
                            <Text fontFamily="Be Vietnam, sans-serif" fontWeight="500" fontSize="0.875rem" lineHeight="1.5" color="grey">{this.state.roleString}</Text>
                        </Box>
                    </Box>
                    {this.state.isTeacher &&
                        <Box mb="10px">
                            <Button color={this.state.isShowJournals ? 'tomato' : 'grey'} variant="link" onClick={this.showJournals} _focus={{ outline: "none" }}>Мои журналы</Button>
                            <Collapse d="flex" justifyContent="start" initialScale={2} in={this.state.isShowJournals}>
                                <Box d="flex" flexDirection="column"
                                    w="100%"
                                    color="white"
                                    mt="4"
                                    rounded="md">
                                    <Link m="5px" color="gray.600">844691</Link>
                                    <Link m="5px" color="gray.600">844691</Link>
                                    <Link m="5px" color="gray.600">844691</Link>
                                </Box>
                            </Collapse>
                        </Box>
                    }
                    {this.state.isAdmin &&
                        <Box mb="10px" w="100%">
                            <Button align="start" color={this.state.isShowCatalogs ? 'tomato' : 'grey'} variant="link" onClick={this.showCatalogs} _focus={{ outline: "none" }}>Справочники</Button>
                            <Collapse w="100%" initialScale={2} in={this.state.isShowCatalogs}>
                                <Box d="flex" justifyContent="start" flexDirection="column"
                                    w="100%"
                                    color="white"
                                    mt="4"
                                    rounded="md">
                                    <Link m="5px" color="gray.600">Журналы</Link>
                                    <Link m="5px" color="gray.600">Преподаватели</Link>
                                    <Link m="5px" color="gray.600">Студенты</Link>
                                    <Link m="5px" color="gray.600">Группы</Link>
                                    <Link m="5px" color="gray.600">Дисциплины</Link>
                                </Box>
                            </Collapse>
                        </Box>
                    }
                    <br/>
                    <Button align="start" variant="link">Настройки</Button>
                </Box>
                <Spacer />
                <Box w="100%">
                    <Button variant="link" _focus={{ outline: "none" }} onClick={this.logout} align="start" w="100%">Выйти</Button>
                </Box>
            </Flex>
        )
    }
}

export default Nav