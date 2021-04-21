import { SearchIcon } from '@chakra-ui/icons'
import {
    IconButton,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import { SettingsIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import { Input } from "@chakra-ui/react"
import Avatar from 'react-avatar'
import { logout as log } from '../actions/auth'
import { useHistory } from 'react-router-dom';


const Header = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const logout = () => {
        const { history, dispatch } = props;
        dispatch(log())
    }

    const logout_key = (e) => {
        if (e.key === 'Delete') {
            logout()
        }
    }

    return (
        <Flex onKeyDown={logout_key}
            style={{ overflowY: "hidden" }}
            alignItems="center"
            w="100%"
            p="5"
            h="100%"
            justifyContent="space-between" >
            <IconButton size="lg"
                onClick={onOpen}
                aria-label="Search"
                variant="ghost"
                icon={< SearchIcon color="gray" />} />
            <Menu >
                <MenuButton as={IconButton}
                    aria-label="Options"
                    variant="" >
                    <Avatar color="#ff826b"
                        name={props.user?.lastName}
                        round={true}
                        size="50" />
                </MenuButton>
                <MenuList >
                    <MenuItem onClick={logout} > Выход </MenuItem>
                </MenuList> </Menu> <Modal isOpen={isOpen}
                    onClose={onClose} >
                <ModalOverlay />
                <ModalContent >
                    <ModalBody p="1" >
                        <Input border="0"
                            fontSize="18px"
                            placeholder="Search" />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default Header