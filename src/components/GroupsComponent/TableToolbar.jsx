import React from 'react'
import clsx from 'clsx'
import DeleteIcon from '@material-ui/icons/Delete'
import GlobalFilter from './GlobalFilter'
import IconButton from '@material-ui/core/IconButton'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import AddGroup from './AddGroup'

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 100 100%',
    padding: '0 50px'
  },
  add: {
    width: '100%',
  }
}))

const TableToolbar = props => {
  const classes = useToolbarStyles()
  const {
    numSelected,
    addData,
    deleteData,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
    name
  } = props
  return (
    <Toolbar padding="100px"
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <AddGroup addData={addData} className={classes.add} />
      {numSelected > 0 ? (
        <Typography
          margin="dense"
          className={classes.title}
          color="primary"
          variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography color="error" className={classes.title} variant="h5" id="tableTitle">
          {name}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteData}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}
    </Toolbar>
  )
}

export default TableToolbar
