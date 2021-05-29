import React, {useEffect, useState} from 'react'
import {Box, Button, Flex, Text} from '@chakra-ui/react'
import {Scrollbars} from 'react-custom-scrollbars'
import JournalService from '../service/journal-service'
import StudentService from '../service/student-service'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const Journal = () => {

    const [info, setInfo] = useState(null)
    const [journal, setJournal] = useState(null)
    const [students, setStudents] = useState([])
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])
    const [id, setId] = useState(window.location.pathname.split('/').pop())

    useEffect(() => {
        JournalService.getJournalById(id).then((response) => {
            setJournal(response)
            StudentService.getStudentsByGroupId(response.group.id).then((data) => {
                setStudents(data.sort())
                JournalService.getJournalInfo(id).then((data) => {
                    setInfo(data)
                    data.sort((a, b) => {
                        return new Date(b.date).getUTCDate() - new Date(a.date).getUTCDate();
                    }).map((i) => {
                        let date = new Date(i.date).getDate() + '.' + new Date(i.date).getMonth() + '.' + new Date(i.date).getFullYear()
                        let isDates = columns.map((item) => {
                            return item.key
                        })
                        if (!isDates.includes(i.date)) {
                            let oldColumns = columns
                            oldColumns.push({key: i.date, name: date, enabled: true})
                            setColumns(oldColumns)
                        }
                        setRows(data)
                    })
                })
            })
        })
        if (!columns.map((item) => item.key).includes("student")) {
            columns.push({key: "student", name: "Учащийся", editable: false})
        }
    }, [])

    const createData = (s, items) => {
        const name = {
            mark: s.account.lastName + ' ' + s.account.firstName.substring(0, 1).toUpperCase() + '. ' + s.account.middleName.substring(0, 1).toUpperCase() + '.'
        }
        let response = [s.id, name]
        items.forEach((item) => {
            response.push(item)
        })
        return response
    }

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    const rr = students.map((s) => {
        let items = []
        if (info !== null) {
            columns.forEach((c) => {
                if (info.find((item) => item.student.id === s.id)) {
                    items.push(info.find((item) => item.student.id === s.id))
                } else {
                    items.push({
                        mark: ""
                    })
                }
            })
        }
        return createData(s, items)
    })

    const addColumn = () => {
        let d = new Date()
        const name = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear()
        let isDates = columns.map((item) => {
            return item.name
        })
        if (!isDates.includes(name)) {
            let oldColumns = columns
            oldColumns.push({key: name, name: name, enabled: true})
            setColumns(oldColumns)
        }
    }

    const setMark = (id, mark) => {
        if(mark.markType !== undefined){
            alert(mark.markType)
        }
    }

    const tCell = (r, student_id) => {
        var rows = [];
        for (var i = 1; i < r.length - 1; i++) {
            rows.push(<TableCell onClick={() => setMark(student_id, r[i])}>{r[i].mark}</TableCell>);
        }
        return rows
    }

    return (
        <Scrollbars height="100%">
            <Flex flexDirection="column" h="100%">
                <Flex p="5" flexDirection="column" alignItems="center" h="100%" justifyContent="start" w="100%"
                      pt="40px">
                    <Box d="flex" justifyContent="space-between" w="100%" mb="5" height="50px">
                        <Text
                            color="gray">Преподаватель: {journal?.teacher?.lastName + ' ' + journal?.teacher?.firstName.substring(0, 1) + '. ' + journal?.teacher?.middleName.substring(0, 1) + '.'}</Text>
                        <Text color="gray">Дата последнего обновления: {journal?.lastUpdated}</Text>
                    </Box>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table" className={classes.table} size="small"
                               aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((c) => (
                                        <TableCell>{c.name}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rr.map((r) => (
                                    <TableRow key={r[0]}>
                                        {tCell(r, r[0])}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Flex>
                <Flex justifyContent="space-around" height="50px">
                    <Button colorScheme="telegram" variant="ghost" onClick={addColumn}>
                        Добавить занятие
                    </Button>
                    <Button colorScheme="green" variant="ghost" onClick={addColumn}>
                        Сохранить
                    </Button>
                </Flex>
            </Flex>
        </Scrollbars>
    )
}

export default Journal