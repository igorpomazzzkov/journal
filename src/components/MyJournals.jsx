import React from 'react'
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";

const MyJournals = (props) => {
    const history = useHistory();

    const lastUpdatedDate = (timestamp) => {
        var date = new Date(timestamp);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        return date.getDate() + '.' + date.getUTCMonth() + '.' + date.getFullYear() + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }

    return (
        <Flex flexDirection="column" w="100%" pr="5" pt="40px">
            <Text fontSize="4xl" m="5">Мои Журналы</Text>
            <SimpleGrid minChildWidth="200px" spacing="40px">
                {
                    props.props.journals?.map((journal) =>
                        <Box key={journal.id} _hover={{
                            cursor: "pointer",
                            backgroundColor: "rgba(44, 60, 10, 0.1)"
                        }} borderRadius="20" p="5" bg="whitesmoke" onClick={() => {
                            history.push('/home/journals/' + journal.id)
                        }}>
                            <p>{'Дисциплина: ' + journal.subject.shortName}</p>
                            <p>{'Группа: ' + journal.group.name}</p>
                            <p>{'Дата обновления: ' + lastUpdatedDate(journal.lastUpdated)}</p>
                        </Box>
                    )   
                }
            </SimpleGrid>
        </Flex>
    )
}

export default MyJournals