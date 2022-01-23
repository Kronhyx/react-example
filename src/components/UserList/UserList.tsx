import { Button, Card, CardActions, CardContent, FormControlLabel, Switch, TextField } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/Delete'
import React, { FunctionComponent, ReactComponentElement, useEffect, useState } from 'react'
import { UserItem, UserListItem } from '../UserListItem/UserListItem'
import './UserList.css'

export interface UserListProps {
  items: UserItem[]
}

export interface UserItemSelectable extends UserItem {
  selected?: boolean
}

export const UserList: FunctionComponent<UserListProps> = ({ items }) => {
  const [users, setUsers] = useState<UserItemSelectable[]>(items)
  const [search, setSearch] = useState<string>('')
  const [showOnlyFemales, setShowOnlyFemales] = useState<boolean>(false)

  useEffect(() => setUsers(items.map(user => ({ ...user, selected: false }))), [items])

  const visibleItems = () => users
    .filter(user => user.first_name.toLowerCase().includes(search.toLowerCase()))
    .filter(user => showOnlyFemales ? user.gender === 'Female' : true)

  const itemsSelected = () => visibleItems().filter(item => item.selected)

  const hasItemsSelected = () => !!itemsSelected().length

  const hasFemalesUsers = () => visibleItems().filter(item => item.gender === 'Female').length

  const deleteSelection = () => {
    const remainingUsers = visibleItems().filter(user => !user.selected)

    setUsers(remainingUsers)
  }

  const onUserSelected = (user: UserItemSelectable, selected: boolean) => {
    user.selected = selected

    setUsers(users.map(item => item.id === user.id
      ? { ...item, selected }
      : item))
  }

  const renderVisibleUsers = (renderItem: (user: UserItemSelectable) => ReactComponentElement<any>) => {
    return visibleItems().map(renderItem)
  }

  return (
    <Card>

      <CardActions className="UserListSearch">
        <TextField label="Search by name" value={search} onChange={(event => setSearch(event.target.value))} />
      </CardActions>

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
            <TableBody>{renderVisibleUsers(user =>
              <UserListItem
                key={user.id}
                checked={user.selected} {...user}
                onSelect={checked => onUserSelected(user, checked)}
              />
            )}</TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      <CardActions className="UserListActions">
        <Button color="secondary" startIcon={<DeleteIcon />} disabled={!hasItemsSelected()} onClick={deleteSelection}>
          <span>Remove</span>
          {hasItemsSelected() && <span>({itemsSelected().length})</span>}
        </Button>

        <FormControlLabel
          label="Show only Females"
          disabled={!hasFemalesUsers()}
          control={
            <Switch
              name="jason"
              checked={showOnlyFemales}
              onChange={(event) => setShowOnlyFemales(event.target.checked)} />
          }
        />
      </CardActions>

    </Card>
  )
}
