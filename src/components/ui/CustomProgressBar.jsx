import React from 'react'
import { Progress } from './progress'

function CustomProgressBar({ progress = 100 }) {
    return (
        <div className='relative w-full flex justify-center'>
            <Progress value={progress} className={' relative'} />
            {/* <MessageSquare size={36} strokeWidth={1.5}  /> */}
            <div className={`absolute -top-[2rem]  -translate-x-1/2 -translate-y-1/2 text-white bg-primary px-5 py-3 rounded-[5px] hover:transform hover:scale-105 transition-all duration-300  `} style={{ left: `${progress === 25 ? progress  : progress === 50 ? progress : progress === 75 ? progress : progress }%` }}>
                <span>{progress}%</span>
                <div className='relative'>
                    <div
                        className="  w-0 h-0 
            border-l-8 border-r-8 border-t-8 
            border-l-transparent border-r-transparent border-t-primary
            -mt-1
            absolute top-4
            start-0
          "
                    />
                </div>

            </div>


        </div>
    )
}

export default CustomProgressBar