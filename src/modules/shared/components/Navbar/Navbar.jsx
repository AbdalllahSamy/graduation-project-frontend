import { BellRing, Search } from 'lucide-react'
import React from 'react'

export default function Navbar() {
  return (
    <>
    <div className='flex justify-between items-center mb-6'> 
      <div>
        <span className='font-bold '>Health Overview</span>
      </div>
      <div className='flex gap-5'>
      <Search />
      <BellRing />
      </div>
    </div>
    </>
  )
}
