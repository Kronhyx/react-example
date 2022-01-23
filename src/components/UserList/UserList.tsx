import { Button, Card, CardActions, CardContent, FormControlLabel, Switch } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/Delete'
import React, { FunctionComponent, ReactComponentElement, useState } from 'react'
import { UserItem, UserListItem } from '../UserListItem/UserListItem'
import './UserList.css'

export interface UserListProps {
  items: UserItem[]
}

export const UserList: FunctionComponent<UserListProps> = ({ items }) => {
  const [users, setUsers] = useState<UserItem[]>(items)
  const [showOnlyFemales, setShowOnlyFemales] = useState<boolean>(false)
  const [itemsSelected, setItemsSelected] = useState<number[]>([])
  const hasItemsSelected = () => !!itemsSelected.length

  const deleteSelected = () => {
    const remainingUsers = users.filter(user => !itemsSelected.includes(user.id))

    setUsers(remainingUsers)
    setItemsSelected([])
  }

  const onListItemSelected = (id: number, state: boolean) => {

    if (state) {
      setItemsSelected(old => [...old, id])
    }

    if (!state) {
      setItemsSelected(itemsSelected.filter(key => key !== id))
    }

  }

  const visibleUserListItems = (renderItem: (user: UserItem) => ReactComponentElement<any>) => {

    return users
      .filter(user => showOnlyFemales ? user.gender === 'Female' : true)
      .map(renderItem)
  }

  return (
    <Card>
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Gender</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleUserListItems(user => <UserListItem key={user.id} {...user} onSelect={onListItemSelected} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      <CardActions className="UserListActions">
        <Button color="secondary" startIcon={<DeleteIcon />} disabled={!hasItemsSelected()} onClick={deleteSelected}>
          <span>Remove</span>
          {hasItemsSelected() && <span>
            ({itemsSelected.length})
          </span>}
        </Button>

        <FormControlLabel
          control={<Switch name="jason" checked={showOnlyFemales}
                           onChange={(event) => setShowOnlyFemales(event.target.checked)} />}
          label="Show only Females"
        />

      </CardActions>
    </Card>
  )
}
