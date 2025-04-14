import React from 'react'

function AuthButton({title}) {
  return (
    <div>
      <button className='bg-black rounded-[30px] text-white px-10 py-2 '>{title}</button>
    </div>
  )
}

export default AuthButton