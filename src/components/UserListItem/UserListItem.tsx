import { Checkbox } from '@material-ui/core'
import { SwitchBaseProps } from '@material-ui/core/internal/SwitchBase'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React, { FunctionComponent, useState } from 'react'
import { User } from '../UserList/UserList'

export interface UserListItemProps extends User {
  onSelect?: (id: number, state: boolean) => any
}

export const UserListItem: FunctionComponent<UserListItemProps> = (props) => {
  const [, setChecked] = useState(false)
  const onChange: SwitchBaseProps['onChange'] = (event => {
    const isChecked = event.target.checked
    setChecked(isChecked)

    return props.onSelect?.(props.id, isChecked)
  })

  return (
    <TableRow key={props.id}>
      <TableCell>
        <Checkbox onChange={onChange} />
      </TableCell>
      <TableCell>{props.id}</TableCell>
      <TableCell>{props.email}</TableCell>
      <TableCell>{props.first_name}</TableCell>
      <TableCell>{props.last_name}</TableCell>
      <TableCell>{props.gender}</TableCell>
    </TableRow>
  )
}
