import React from 'react'

function AuthButton({ title, classname, onclick, type }) {
  return (
    <div>
      <button onClick={onclick && onclick} type={type || "button"} className={`bg-black rounded-[30px] text-white px-10 py-2 cursor-pointer ${classname} hover:transform hover:scale-105 transition-all duration-300`}>{title}</button>
    </div>
  )
}

export default AuthButton