import React, {Component} from "react";
import {FormControl, Input, FormHelperText, Stack} from "@chakra-ui/react"
import {Container, InputGroup, InputRightElement, Button, ButtonGroup, IconButton} from "@chakra-ui/react"
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import {NavLink, Redirect} from "react-router-dom";
import {login} from '../actions/auth'
import {connect} from 'react-redux'
import {
    Alert,
    AlertIcon,
    AlertDescription,
} from "@chakra-ui/react"
import UserService from '../service/user-service'

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.showPasswordFunction = this.showPasswordFunction.bind(this)
    }

    state = {
        isLoading: false,
        isShowPassword: false,
        passwordIcon: <ViewOffIcon color="tomato"/>,
        username: "",
        password: ""
    }

    showPasswordFunction(e) {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
        if (this.state.isShowPassword) {
            this.setState({
                passwordIcon: <ViewOffIcon color="tomato"/>
            })
        } else {
            this.setState({
                passwordIcon: <ViewIcon color="tomato"/>
            })
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleKeyPress = (e) => {
        if(e.code === 'Enter'){
            this.handleLogin(e)
        }
        if(e.code === 'ArrowDown' || e.code === 'ArrowUp'){
            this.setFocus(document.activeElement.id)
        }
    }

    setFocus(id){
        if(id === 'username'){
            document.getElementById('password').focus()
        } else {
            document.getElementById('username').focus()
        }
    }

    handleLogin(e) {
        this.setState({
            isLoading: true
        })
        const {dispatch, history} = this.props;
        dispatch(login(this.state.username, this.state.password))
            .then(() => {
                UserService.getActiveUser().then((data) =>{
                    console.log(data)
                    localStorage.setItem('user', JSON.stringify(data))
                    window.location.reload()
                })
                history.push('/')
            })
            .catch(() => {
                this.setState({
                    isLoading: false
                })
            })
    }

    render() {
        const {isLoggedIn, message} = this.props;

        if (isLoggedIn) {
            return <Redirect to="/"/>
        }

        return (
            <Container bg="white" padding="10" centerContent>
                {
                    message &&
                    (<Alert status="error" mb="10">
                        <AlertIcon/>
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>)
                }
                <FormControl id="username">
                    <Input size="sm" type="text" onChange={this.onChangeUsername}
                           isInvalid={message}
                           placeholder="Phone or Email"
                           onKeyDown={(e) => this.handleKeyPress(e)}
                           focusBorderColor="dimgray"/>
                    <FormHelperText>Вы можете ввести email или мобильный телефон</FormHelperText>
                </FormControl>
                <FormControl id="password" margin="5">
                    <InputGroup>
                        <InputRightElement>
                            <ButtonGroup padding="0" height="10" size="sm" variant="unstyled">
                                <IconButton size="sm" _focus={{outline: "none"}}
                                            aria-label="Show password" onClick={this.showPasswordFunction}
                                            icon={this.state.passwordIcon}/>
                            </ButtonGroup>
                        </InputRightElement>
                        <Input size="sm"
                               onChange={this.onChangePassword}
                               placeholder="Password"
                               id="password"
                               onKeyDown={(e) => this.handleKeyPress(e)}
                               type={this.state.isShowPassword ? 'text' : 'password'}
                               focusBorderColor="dimgray"/>
                    </InputGroup>
                </FormControl>
                <Stack direction="row" spacing={4} align="left">
                    <Button bg="tomato" color="white" focusBorderColor="tomato" isLoading={this.state.isLoading}

                            onClick={this.handleLogin}
                            varian="solid">Войти</Button>
                    <Button focusBorderColor="tomato" variant="ghost">
                        <NavLink to="/auth/registration">Регистрация</NavLink>
                    </Button>
                </Stack>
            </Container>
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

export default connect(mapStateToProps)(Login);
