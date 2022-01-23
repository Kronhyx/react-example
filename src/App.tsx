import React from 'react'
import './App.css'
import { UserList } from './components/UserList/UserList'

export default function App () {
  const items = require('./components/UserList/UserList.json')

  return (
    <div className="App">
      <header className="App-header">
        <UserList items={items} />
      </header>
    </div>
  )
}
