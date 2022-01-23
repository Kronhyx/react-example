import { Container } from '@material-ui/core'
import React from 'react'
import './App.css'
import { UserList } from './components/UserList/UserList'

export default function App () {
  const items = require('./components/UserList/UserList.json')

  return (
    <main>
      <Container>
        <header>
          <UserList items={items} />
        </header>
      </Container>
    </main>
  )
}
