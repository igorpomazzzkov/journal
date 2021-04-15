import React, { useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import SubjectService from '../../service/subject-service'

const initialSubject = {
  name: '',
  shortName: ''
}

const AddSubject = props => {
  const [subject, setSubject] = useState(initialSubject)
  const { addData } = props
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const subjectHandler = (event) => {
    SubjectService.addSubject(subject).then((data) => {
      addData(data)
      setSubject(initialSubject)
      handleClose()
    })
  }

  const handleChange = name => ({ target: { value } }) => {
    setSubject({ ...subject, [name]: value })
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
        <DialogTitle id="form-dialog-title">Добавление дисциплины</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Наименование"
            type="text"
            fullWidth
            value={subject.name}
            onChange={handleChange('name')}
          />
          <TextField
            margin="dense"
            label="Краткое имя"
            type="text"
            fullWidth
            value={subject.shortName}
            onChange={handleChange('shortName')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={subjectHandler} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddSubject
