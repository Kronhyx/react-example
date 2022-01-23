import { Checkbox, Chip } from '@material-ui/core'
import { SwitchBaseProps } from '@material-ui/core/internal/SwitchBase'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React, { FunctionComponent, useEffect, useState } from 'react'

export enum UserGender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export interface UserItem {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  gender: UserGender
}

export interface UserListItemProps extends UserItem {
  onSelect?: (checked: boolean) => void
  checked?: boolean
}

export const UserListItem: FunctionComponent<UserListItemProps> = (props) => {
  const [checked, setChecked] = useState(props.checked)
  useEffect(() => setChecked(props.checked || false), [props.checked])

  const onChange: SwitchBaseProps['onChange'] = (event => {
    const isChecked = event.target.checked
    setChecked(isChecked)

    return props.onSelect?.(isChecked)
  })

  const baseColor = (gender: UserGender) => gender === UserGender.MALE ? 'primary' : 'secondary'

  return (
    <TableRow hover key={props.id}>
      <TableCell>
        <Checkbox checked={checked} onChange={onChange} />
      </TableCell>
      <TableCell>{props.id}</TableCell>
      <TableCell>{props.email}</TableCell>
      <TableCell>{props.first_name}</TableCell>
      <TableCell>{props.last_name}</TableCell>
      <TableCell>
        <Chip color={baseColor(props.gender)} label={props.gender} />
      </TableCell>
    </TableRow>
  )
}
