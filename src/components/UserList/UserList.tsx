import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React, { FunctionComponent } from 'react'

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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">{user.id}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.first_name}</TableCell>
              <TableCell align="right">{user.last_name}</TableCell>
              <TableCell align="right">{user.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
