import React, { useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import GroupService from '../../service/group-service'
import Select from '@material-ui/core/Select'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { FormControl, InputLabel } from '@material-ui/core'
import SubjectService from '../../service/subject-service'
import TeacherService from '../../service/teacher-service'
import JournalService from '../../service/journal-service'

const initial = {
  groupId: '',
  teacherId: '',
  subjectId: ''
}

const AddJournal = props => {
  const [journal, setJournal] = useState(initial)
  const { addData } = props
  const [open, setOpen] = React.useState(false)
  const [openSelect, setOpenSelect] = React.useState(false)
  const [groups, setGroups] = React.useState(null)
  const [subjects, setSubjects] = React.useState(null)
  const [teachers, setTeachers] = React.useState(null)

  useEffect(() => {
    GroupService.getGroupsName().then((data) => {
      setGroups(data)
    })
  }, [setGroups])

  useEffect(() => {
    SubjectService.getAllSubjects().then((data) => {
      setSubjects(data)
    })
  }, [setSubjects])
  useEffect(() => {
    TeacherService.getAllTeachers().then((data) => {
      setTeachers(data)
    })
  }, [setTeachers])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };


  const handler = () => {
    JournalService.addJournal(journal).then((data) => {
      addData(data)
      setJournal(initial)
      handleClose()
    })
  }

  const selectChange = (e) => {
    setJournal({ ...journal, ['groupId']: e.target.value })
  }

  const subjectChange = (e, value) => {
    setJournal({...journal, ['subjectId']: value.id})
  }

  const teacherChange = (e, value) => {
    setJournal({...journal, ['teacherId']: value.account.id})
  }

  return (
    <div>
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Добавление журнала</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel htmlFor="age-native-simple">Выберите группу</InputLabel>
            <Select
              fullWidth
              w="100vw"
              label="Группа"
              placeholder="Выберите группу"
              onClose={handleCloseSelect}
              onOpen={handleOpenSelect}
              onChange={selectChange}>
              {groups?.map((group) => {
                return <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          <Autocomplete
            options={subjects}
            debug
            onChange={subjectChange}
            getOptionLabel={(subject) => subject.shortName}
            getValue={(subject) => subject.id}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Выберите дисциплину" />}
          />
          <Autocomplete
            options={teachers}
            debug
            onChange={teacherChange}
            getOptionLabel={(teacher) => teacher.account.lastName + ' ' + teacher.account.firstName.substring(0, 1) + '. ' + teacher.account.middleName.substring(0, 1) + '.'}
            getValue={(teacher) => teacher.account.id}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Назначить преподавателя" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handler} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddJournal
