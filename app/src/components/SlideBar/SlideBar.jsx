import React from 'react'
import './SlideBar.css'
import { Link } from 'react-router-dom'
import { UserList } from '../UserList'


export const SlideBar = () => {
  return (
    <div className='sidebar shadow-2xl'>
        <UserList />
    </div>
  )
}