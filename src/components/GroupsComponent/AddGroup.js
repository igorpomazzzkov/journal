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
import GroupService from '../../service/group-service'

const initial = {
  name: '',
  course: ''
}

const AddGroup = props => {
  const [group, setGroup] = useState(initial)
  const { addData } = props
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handler = (event) => {
    GroupService.addGroup(group).then((data) => {
      addData(data)
      setGroup(initial)
      handleClose()
    })
  }

  const handleChange = name => ({ target: { value } }) => {
    setGroup({ ...group, [name]: value })
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
        <DialogTitle id="form-dialog-title">Добавление группы</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Наименование"
            type="text"
            fullWidth
            value={group.name}
            onChange={handleChange('name')}
          />
          <TextField
            margin="dense"
            label="Курс"
            type="email"
            fullWidth
            value={group.course}
            onChange={handleChange('course')}
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

export default AddGroup
