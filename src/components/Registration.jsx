import {
    Button,
    Container,
    FormControl,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from "@chakra-ui/react";
import React, { Component } from "react";
import GroupService from '../service/group-service'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"

class Registration extends Component {

    constructor() {
        super();
        this.signIn = this.signIn.bind(this)
        GroupService.getGroupsName().then((data) => {
            this.setState({
                groups: data
            })
        })
    }

    state = {
        isLoading: false,
        groups: []
    }

    signIn() {
        this.setState({
            isLoading: true
        })
    }

    render() {
        const { isLoggedIn } = this.props;

        if (isLoggedIn) {
            return <Redirect to="/" />
        }

        return (
            <Container bg="white" padding="10" align="center">
                <Tabs align="start">
                    <TabList
                        _focut={{ outline: "none" }}
                        focusBorderColor="transparent">
                        <Tab color="tomato" _selected={{ color: "white", bg: "tomato" }}
                            __focut={{ outline: "none" }}>Учащийся</Tab>
                        <Tab color="tomato" _selected={{ color: "white", bg: "tomato" }}
                            _focus={{ outline: "none" }}>Преподаватель</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <FormControl padding="0" id="lastname" mb="5">
                                <Input margin="0" type="text" size="sm" focusBorderColor="dimgray"
                                    placeholder="Фамилия" />
                            </FormControl>
                            <FormControl id="firstname" mb="5">
                                <Input type="text" size="sm" focusBorderColor="dimgray" placeholder="Имя" />
                            </FormControl>
                            <FormControl id="middlename" mb="5">
                                <Input type="text" size="sm" focusBorderColor="dimgray" placeholder="Отчество" />
                            </FormControl>
                            <FormControl id="group" mb="5">
                                <Select placeholder="Выбери группу" size="sm">
                                    {this.state.groups.map((group) =>
                                        <option key={group.id}>{group.name}</option>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl id="email" mb="5">
                                <Input type="email" size="sm" placeholder="Email" focusBorderColor="dimgray" />
                            </FormControl>
                            <FormControl id="mobile" mb="5">
                                <InputGroup size="sm">
                                    <InputLeftAddon children="+375" />
                                    <Input type="number" focusBorderColor="dimgray"
                                        placeholder="Мобильный телефон" />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="password" mb="5">
                                <Input type="password" size="sm" placeholder="пароль" focusBorderColor="dimgray" />
                            </FormControl>
                        </TabPanel>
                        <TabPanel>
                            <FormControl id="lastname" mb="5">
                                <Input type="text" size="sm" focusBorderColor="dimgray" placeholder="Фамилия" />
                            </FormControl>
                            <FormControl id="firstname" mb="5">
                                <Input type="text" size="sm" focusBorderColor="dimgray" placeholder="Имя" />
                            </FormControl>
                            <FormControl id="middlename" mb="5">
                                <Input type="text" size="sm" focusBorderColor="dimgray" placeholder="Отчество" />
                            </FormControl>
                            <FormControl id="email" mb="5">
                                <Input type="email" size="sm" placeholder="Email" focusBorderColor="dimgray" />
                            </FormControl>
                            <FormControl id="mobile" mb="5">
                                <InputGroup size="sm">
                                    <InputLeftAddon children="+375" />
                                    <Input type="number" focusBorderColor="dimgray"
                                        placeholder="Мобильный телефон" />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="password" mb="5">
                                <Input type="password" size="sm" placeholder="пароль" focusBorderColor="dimgray" />
                            </FormControl>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <Button color="tomato" variant="ghost" isLoading={this.state.isLoading} _focus={{ outline: "none" }}
                    onClick={this.signIn}>Регистрация</Button>
            </Container>
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

export default connect(mapStateToProps)(Registration);