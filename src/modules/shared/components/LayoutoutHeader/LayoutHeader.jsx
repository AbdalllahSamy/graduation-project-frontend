import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function LayoutHeader() {
  return (
    <div>
      <Navbar />
      <div className='mt-10'>
        <Outlet/>
      </div>
    </div>
  )
}
