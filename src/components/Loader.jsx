import React from 'react'
import { Flex, CircularProgress } from '@chakra-ui/react'

const Loader = () => {
    return (
        <Flex style={{overflowY: "hidden"}} h="100vh" w="100vw" justifyContent="center" alignItems="center">
            <CircularProgress w="50px" h="100px" value={90} isIndeterminate color="tomato" />
        </Flex>
    )
}

export default Loader