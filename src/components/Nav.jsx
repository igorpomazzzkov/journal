import React from 'react'
import { Flex, Box, InputGroup, InputLeftElement, Input, Spacer, Avatar } from "@chakra-ui/react"
import { Menu, MenuItem, MenuList, MenuButton, MenuDivider } from '@chakra-ui/react'
import { SearchIcon, SettingsIcon, } from '@chakra-ui/icons'
import { logout as log } from '../actions/auth'

const Nav = (props) => {

    const user = JSON.parse(localStorage.getItem('user'))
    
    const logout = () => {
        const { dispatch } = props;
        dispatch(log())
    }

    return (
        <Flex alignItems="center">
            <Box>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<SearchIcon color="gray.300" />}
                    />
                    <Input focusBorderColor="tomato" type="text" />
                </InputGroup>
            </Box>
            <Spacer />
            <Box d="flex" alignItems="center">
                <Menu>
                    <MenuButton
                        aria-label="Options">
                        <Avatar name={user?.firstName + " " + user?.lastName} src={user?.image} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem icon={<SettingsIcon size="lg" d="flex" alignItems="center" />}>Настройки</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={logout}>Выйти</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    )
}

export default Nav