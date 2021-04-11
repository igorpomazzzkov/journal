import React, { Component } from 'react'
import { Flex, Box, Text, Button, Collapse, Link, Spacer, IconButton } from "@chakra-ui/react"
import { logout as log } from '../actions/auth'
import Avatar from 'react-avatar';
import { NavLink } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

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
        journals: null,
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

    isNav = () => {

    }


    render() {
        return (
            <Flex flexDirection="column" justifyContent="start" alignItems="start" w="100%" h="100%">
                <Box d="flex" flexDirection="column" alignItems="start" w="100%">
                    <Box boxShadow d="flex" mb="50px" alignItems="center" borderRadius="10px" bg="whitesmoke" w="100%" py="16px" px="20px">
                        <Avatar color="#ff826b" round={true} size="40" extSizeRatio={1} name={this.state.user?.lastName} email={this.state.email} src={this.state.user?.image} />
                        <Box pl="10px">
                            <Text fontFamily="Be Vietnam, sans-serif" fontWeight="600" fontSize="0.875rem" lineHeight="1.5">
                                {this.state.user?.lastName + " " + this.state.user?.firstName.slice(0, 1).toUpperCase() + ". " + (this.state.user?.middleName ? this.state.user?.middleName?.slice(0, 1).toUpperCase() + "." : "")}
                            </Text>
                            <Text fontFamily="Be Vietnam, sans-serif" fontWeight="500" fontSize="0.875rem" lineHeight="1.5" color="grey">{this.state.roleString}</Text>
                        </Box>
                    </Box>
                    {this.props.isTeacher &&
                        <Box mb="10px">
                            <Button color={this.state.isShowJournals ? 'tomato' : 'grey'} variant="link" onClick={this.showJournals} _focus={{ outline: "none" }}>Мои журналы</Button>
                            <Collapse d="flex" justifyContent="start" initialScale={2} in={this.state.isShowJournals}>
                                <Box d="flex" flexDirection="column"
                                    w="100%"
                                    color="white"
                                    mt="4"
                                    rounded="md">
                                    {this.props.journals?.map((journal) =>
                                        <Link m="5px" key={journal.id} color="gray.600">{journal.group.name + ' ' + journal.subject.shortName}</Link>
                                    )}
                                </Box>
                            </Collapse>
                        </Box>
                    }
                    {this.props.isAdmin &&
                        <Box mb="10px" w="100%">
                            <Button align="start" color={this.state.isShowCatalogs ? 'tomato' : 'grey'} variant="link" onClick={this.showCatalogs} _focus={{ outline: "none" }}>Справочники</Button>
                            <Collapse w="100%" initialScale={2} in={this.state.isShowCatalogs}>
                                <Box d="flex" justifyContent="start" flexDirection="column"
                                    w="100%"
                                    color="white"
                                    mt="4"
                                    rounded="md">
                                    <Link m="5px" color="gray.600" href="/journals">Журналы</Link>
                                    <Link m="5px" color="gray.600" href="/students">Студенты</Link>
                                    <Link m="5px" color="gray.600" href="/groups">Группы</Link>
                                    <Link m="5px" color="gray.600" href="/subjects">Дисциплины</Link>
                                </Box>
                            </Collapse>
                        </Box>
                    }
                    <br />
                    <Button align="start" variant="link">Настройки</Button>
                </Box>
                <Spacer />
                <Box w="100%" d="flex">
                    <Button variant="link" _focus={{ outline: "none" }} onClick={this.logout} align="start" w="100%">Выйти</Button>
                    <IconButton
                        onClick={this.isNav}
                        variant="ghost"
                        aria-label="Search database"
                        icon={<ChevronLeftIcon size="md" />}
                    />
                </Box>
            </Flex>
        )
    }
}

export default Nav