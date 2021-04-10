import { SearchIcon } from '@chakra-ui/icons'
import {
    IconButton,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button, useDisclosure
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { SettingsIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import { Input } from "@chakra-ui/react"
import Avatar from 'react-avatar'
import { logout as log } from '../actions/auth'

const Header = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const logout = () => {
        const { dispatch } = props;
        dispatch(log())
    }

    return (
        <Flex alignItems="center" w="100%" p="6" justifyContent="space-between">
            <IconButton size="lg"
                onClick={onOpen}
                aria-label="Search"
                variant="ghost"
                icon={<SearchIcon color="gray" />} />
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    variant="">
                    <Avatar name={props.user?.lastName} round={true} size="50" />
                </MenuButton>
                <MenuList>
                    <MenuItem icon={<SettingsIcon />}>Настройки</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={logout}>Выход</MenuItem>
                </MenuList>
            </Menu>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody p="1">
                        <Input border="0" fontSize="18px" placeholder="Search" />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default Header