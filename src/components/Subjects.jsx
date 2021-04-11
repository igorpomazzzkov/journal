import React, { useState, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { Redirect } from 'react-router-dom'
import Loader from './Loader'
import SubjectService from '../service/subject-service'
import EnhancedTable from './Table/EnhancedTable'
import { Scrollbars } from 'react-custom-scrollbars';

const Subjects = (props) => {
    const [subjects, setSubjects] = useState(null)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    const name = "Дисциплины"

    useEffect(() => {
        SubjectService.getAllSubjects().then((data) => {
            setSubjects(data)
        })
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'Наименование',
                accessor: 'name',
            },
            {
                Header: 'Краткое имя',
                accessor: 'shortName',
            },
        ],
        []
    )

    const updateMyData = (rowIndex, columnId, value) => {
        console.log('asdasd')
    }

    if (subjects === null) {
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
                    data={subjects}
                    setData={setSubjects}
                    updateMyData={updateMyData}
                    skipPageReset={skipPageReset}
                    name={name}
                />
            </Flex >
        </Scrollbars>
    )
}

export default Subjects