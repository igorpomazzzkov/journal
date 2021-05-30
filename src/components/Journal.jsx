import React, {useEffect, useState} from 'react'
import {Box, Button, Flex, Text, Textarea, useDisclosure} from '@chakra-ui/react'
import {Scrollbars} from 'react-custom-scrollbars'
import JournalService from '../service/journal-service'
import StudentService from '../service/student-service'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import 'date-fns'
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const Journal = () => {

    const [info, setInfo] = useState(null)
    const [journal, setJournal] = useState(null)
    const [students, setStudents] = useState([])
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])
    const [id, setId] = useState(window.location.pathname.split('/').pop())
    const {isOpen, onOpen, onClose} = useDisclosure()

    const [modelStudent, setModelStudent] = useState(null)
    const [modelMark, setModelMark] = useState(null)
    const [modelMarkType, setModelMarkType] = useState(null)
    const [modelData, setModelDate] = useState(new Date())

    const [scrollBehavior, setScrollBehavior] = React.useState("inside")

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
                        let date = new Date(i.date).getDate() + '.' + (new Date(i.date).getMonth() + 1) + '.' + new Date(i.date).getFullYear()
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
        const name = d.getDate() + '.' + (d.getMonth()) + '.' + d.getFullYear()
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
        if (mark.markType !== undefined) {
            alert(mark.date)
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
            <Flex flexDirection="column">
                <Flex p="5" flexDirection="column" alignItems="center" h="100%" justifyContent="start" w="100%"
                      pt="40px">
                    <Box d="flex" justifyContent="space-between" w="100%" height="50px">
                        <Text
                            color="gray">Преподаватель: {journal?.teacher?.lastName + ' ' + journal?.teacher?.firstName.substring(0, 1) + '. ' + journal?.teacher?.middleName.substring(0, 1) + '.'}</Text>
                        <Text color="gray">Дата последнего обновления: {journal?.lastUpdated}</Text>
                    </Box>
                    <Flex flexDirection="column" justifyContent="start" alignItems="start" width="100%">
                        <AddJournalInfo students={students} journalId={journal?.id}/>
                    </Flex>
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
            </Flex>
        </Scrollbars>
    )
}


const AddJournalInfo = (props) => {
    const [open, setOpen] = React.useState(false)

    let info = {
        studentId: 0,
        journalId: 0,
        mark: 9,
        markType: "",
        date: Date(),
        desc: ""
    }

    const markTypes = ["Лекция", "Лабораторная работа", "Семинар", "Практическая"]
    const marks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [selectedDate, setSelectedDate] = React.useState(new Date());


    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const studentSelect = (e, value) => {
        info.studentId = value.id
    }

    const markTypeSelect = (e, value) => {
        info.markType = value
    }

    const markSelect = (e, value) => {
        info.mark = value
    }

    const descHandler = (e, value) => {
        info.desc = e.target.value
    }

    const addMark = () => {
        info.journalId = props.journalId
        JournalService.addJournalInfo(info.journalId, info).then((response) => {
            console.log(response)
        })
    }

    const handleDateChange = (e, value) => {
        info.date = Date.parse(value)
    }

    return (
        <div>
            <Tooltip title="Add">
                <IconButton aria-label="add" onClick={handleClickOpen}>
                    <AddIcon/>
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Добавление отметки</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        options={props.students}
                        debug
                        onChange={studentSelect}
                        getOptionLabel={(student) => student.account.lastName}
                        getValue={(student) => student.id}
                        style={{width: 300}}
                        renderInput={(params) => <TextField {...params} label="Выберите учащегося"/>}
                    />
                    <Autocomplete
                        options={markTypes}
                        debug
                        onChange={markTypeSelect}
                        getOptionLabel={(t) => t}
                        getValue={(t) => t}
                        style={{width: 300}}
                        renderInput={(params) => <TextField {...params} label="Выберите тип занятия"/>}
                    />
                    <Autocomplete
                        options={marks}
                        debug
                        onChange={markSelect}
                        getOptionLabel={(t) => t.toString()}
                        getValue={(t) => t}
                        style={{width: 300}}
                        renderInput={(params) => <TextField {...params} label="Отметка"/>}
                    />
                    <br/>
                    <Textarea placeholder="Описание для студента" onChange={descHandler}/>
                    <br/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            width="300px"
                            label="Date picker inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={addMark}>
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Journal