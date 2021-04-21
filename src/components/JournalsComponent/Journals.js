import React, { useState, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { Redirect } from 'react-router-dom'
import Loader from '../Loader'
import JournalService from '../../service/journal-service'
import EnhancedTable from './EnhancedTable'
import { Scrollbars } from 'react-custom-scrollbars';

const Journals = (props) => {
    const [data, setData] = useState(null)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    const name = "Журналы"

    useEffect(() => {
        JournalService.getAllJournals().then((data) => {
            setData(data)
        })
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'Группа',
                accessor: 'group.name',
            },
            {
                Header: 'Дисциплина',
                accessor: 'subject.shortName',
            },
            {
                Header: 'Преподаватель',
                accessor: 'teacherFio',
            },
            {
                Header: 'Дата обноваления',
                accessor: 'lastUpdated',
            },
        ],
        []
    )

    const updateMyData = (rowIndex, columnId, value) => {
        console.log('asdasd')
    }

    if (data === null) {
        return <Loader />
    }

    if (props.isAdmin === false) {
        <Redirect to="/" />
    }
    return (
        <Scrollbars style={{width: "100%", height: "100%"}}>
            <Flex p="5" flexDirection="column" alignItems="center" justifyContent="start" w="100%" pt="40px">
                <EnhancedTable
                    columns={columns}
                    data={data}
                    setData={setData}
                    updateMyData={updateMyData}
                    skipPageReset={skipPageReset}
                    name={name}
                />
            </Flex >
        </Scrollbars>
    )
}

export default Journals