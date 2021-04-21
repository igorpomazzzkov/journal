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
import StudentService from '../../service/student-service'
import GroupService from '../../service/group-service'
import Select from '@material-ui/core/Select'
import { FormControl, InputLabel } from '@material-ui/core'

const initial = {
  identifier: '',
  groupId: '',
  account: {
    firstName: '',
    lastName: '',
    middleName: '',
    birthday: '',
    address: '',
    image: '',
  }
}

const AddStudent = props => {

  const [student, setStudent] = useState(initial)
  const { addData } = props
  const [open, setOpen] = React.useState(false)
  const [group, setGroup] = React.useState('')

  const [openSelect, setOpenSelect] = React.useState(false)

  const [groups, setGroups] = React.useState(null)

  useEffect(() => {
    GroupService.getGroupsName().then((data) => {
      setGroups(data)
    })
  }, [setGroups])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handler = (event) => {
    StudentService.addStudent(student).then((data) => {
      addData(data)
      setStudent(initial)
      handleClose()
    })
  }

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const handleChange = name => ({ target: { value } }) => {
    setStudent({ ...student, [name]: value })
  }

  const handleChangeAccount = (name) => ({ target: { value } }) => {
    setStudent((prevState) => ({
      ...prevState, account: {
        ...prevState.account,
        [name]: value
      }
    }))
  }

  const selectChange = (e) => {
    setStudent({ ...student, ['groupId']: e.target.value })
    setGroup(e.target.value)
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
        <DialogTitle id="form-dialog-title">Добавление студента</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Фамилия"
            type="text"
            fullWidth
            value={student.lastName}
            onChange={handleChangeAccount('lastName')}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Имя"
            type="text"
            fullWidth
            value={student.firstName}
            onChange={handleChangeAccount('firstName')}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Отчество"
            type="text"
            fullWidth
            value={student.middleName}
            onChange={handleChangeAccount('middleName')}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Идентификатор"
            type="number"
            fullWidth
            value={student.identifier}
            onChange={handleChange('identifier')}
          />
          <br />
          <FormControl fullWidth>
          <InputLabel htmlFor="age-native-simple">Выберите группу</InputLabel>
          <Select
            fullWidth
            w="100vw"
            label="Группа"
            placeholder="Выберите группу"
            onClose={handleCloseSelect}
            onOpen={handleOpenSelect}
            value={group}
            onChange={selectChange}>
            {groups?.map((group) => {
              return <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
            })}
          </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="Адрес"
            type="text"
            fullWidth
            value={student.address}
            onChange={handleChangeAccount('address')}
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

export default AddStudent
