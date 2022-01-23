import { Card, CardContent } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React, { FunctionComponent } from 'react'
import { UserListItem } from '../UserListItem/UserListItem'

export interface User {
  id?: number,
  first_name: string,
  last_name: string,
  email: string,
  gender: string
}

export interface UserListProps {
  items: User[]
}

export const UserList: FunctionComponent<UserListProps> = ({ items }) => {
  const onUserItemSelected = console.log

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
              {items
                .map((user) => (<UserListItem key={user.id} {...user} onSelect={onUserItemSelected} />))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
