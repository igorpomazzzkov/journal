import React, { useState, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { Redirect } from 'react-router-dom'
import Loader from '../Loader'
import StudentService from '../../service/student-service'
import EnhancedTable from './EnhancedTable'
import { Scrollbars } from 'react-custom-scrollbars';

const Subjects = (props) => {
    const [data, setData] = useState(null)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    const name = "Учащиеся"

    useEffect(() => {
        StudentService.getAllStudents().then((data) => {
            setData(data)
        })
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'identifier',
            },
            {
                Header: 'Фамилия',
                accessor: 'account.lastName',
            },
            {
                Header: 'Имя',
                accessor: 'account.firstName',
            },
            {
                Header: 'Отчество',
                accessor: 'account.middleName',
            },
            {
                Header: 'группа',
                accessor: 'group.name',
            }
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
        <Scrollbars style={{ width: "100%", height: "100%" }}>
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

export default Subjects