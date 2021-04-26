import React, { useState, useEffect } from 'react'
import { Box, Flex, Text, Button } from '@chakra-ui/react'
import { Scrollbars } from 'react-custom-scrollbars'
import JournalService from '../service/journal-service'
import StudentService from '../service/student-service'
import Loader from './Loader';
import ReactDataGrid from "react-data-grid";

class Journal extends React.Component {

    constructor(props) {
        super(props)
        this.onGridRowsUpdated = this.onGridRowsUpdated.bind(this)
        this.addColumn = this.addColumn.bind(this)
        this.id = window.location.pathname.split('/').pop()
        JournalService.getJournalById(this.id).then((data) => {
            this.setState({ journal: data })
            StudentService.getStudentsByGroupId(data.journal?.group?.id).then((data) => {
                this.setState({ students: data })
                this.setState({
                    rows: data.map((s) => {
                        return {
                            student: s.account.lastName + ' ' + s.account.firstName.substring(0, 1) + '. ' + s.account.middleName.substring(0, 1) + '.',
                        }
                    })
                })
            })
        })
        JournalService.getJournalInfo(this.id).then((data) => {
            this.setState({ info: data })
            this.setState({
                columns: [
                    { key: "student", name: "Учащийся", editable: false },
                ]
            })
            data.sort((a, b) => {
                return new Date(b.date).getUTCDate() - new Date(a.date).getUTCDate();
            }).map((i) => {
                let date = new Date(i.date).getDate() + '.' + new Date(i.date).getMonth() + '.' + new Date(i.date).getFullYear()
                this.setState({
                    columns: [...this.state.columns, { key: i.date, name: date, enabled: true }]
                })
                console.log(this.state.columns)
                this.setState({rows: data})
                console.log(this.state.rows)
                console.log(this.state.rows[i.student.id])
            })
            
        })

        
    }

    state = {
        info: [],
        journal: {},
        students: [],
        columns: [],
        rows: [],
    }

    onGridRowsUpdated({ fromRow, toRow, updated }) {
        this.setState(state => {
            const rows = state.rows.slice();
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
            }
            return { rows };
        });
    };

    addColumn() {
        let d = new Date()
        const name = d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear()
        this.setState({
            columns: [...this.state.columns, { key: 'date_', name: name, editable: true }]
        })
    }

    render() {
        return (
            <Scrollbars height="100%">
                <Flex flexDirection="column" h="100%">
                    <Flex p="5" flexDirection="column" alignItems="center" h="90%" justifyContent="start" w="100%" pt="40px">
                        <Box d="flex" justifyContent="space-between" w="100%" mb="5">
                            <Text color="gray">Преподаватель: {this.state.journal?.teacher?.lastName + ' ' + this.state.journal?.teacher?.firstName.substring(0, 1) + '. ' + this.state.journal?.teacher?.middleName.substring(0, 1) + '.'}</Text>
                            <Text color="gray">Дата последнего обновления: {this.state.journal?.lastUpdated}</Text>
                        </Box>
                        <ReactDataGrid
                            minHeight={660}
                            style="border: 1px solid red"
                            width="100vw"
                            h="100%"
                            columns={this.state.columns}
                            rowGetter={i => this.state.rows[i]}
                            rowsCount={this.state.students.length}
                            onGridRowsUpdated={this.onGridRowsUpdated}
                            enableCellSelect
                        />
                    </Flex>
                    <Flex justifyContent="space-around">
                        <Button colorScheme="telegram" variant="ghost" onClick={this.addColumn}>
                            Добавить занятие
                    </Button>
                        <Button colorScheme="green" variant="ghost" onClick={this.addColumn}>
                            Сохранить
                    </Button>
                    </Flex>
                </Flex>
            </Scrollbars>
        )
    }
}

export default Journal