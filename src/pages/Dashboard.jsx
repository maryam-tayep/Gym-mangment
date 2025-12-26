import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <SideBar />


      <h1 className='text-capitalize '> admin dashboard</h1>
      <h2 className='text-capitalize'>key matrics overview</h2>
    </div>
  )
}
