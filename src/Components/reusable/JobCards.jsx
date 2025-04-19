import React, { useState } from 'react'
import JobForm from './JobForm'

const JobCards = (props) => {
    const [isImg, setIsImg] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const retrivedJobs = JSON.parse(localStorage.getItem('jobs') || '[]')

    const deleteJob =()=>{
        const newArray = retrivedJobs.filter(job=> job.id !== props.id)
        localStorage.setItem('jobs', JSON.stringify(newArray))
        props.update()
    }

    const Edit =()=>{
        props.edit(props)
        
    }
    return (
        <div>
          <div className='border border-gray-300 rounded-xl px-4 py-5 m-3 flex'>
            <div>
          { isImg ?
          <div className='h-[55px] w-[55px] flex justify-center items-center rounded-xl border border-gray-400 font-bold text-3xl me-2'>
                <img
                src={`https://logo.clearbit.com/${props.site}` }
                alt="Company Logo"
                width={40} height={40}
                onError={() => setIsImg(false)}
                className="object-contain"
            /> 
                 
              </div>
          :
              <div className='h-[55px] w-[55px] flex justify-center items-center rounded-xl border border-gray-400 font-bold text-3xl me-2'>
                  {props.site.slice(0,1).toUpperCase()}
              </div>
          }
            </div>
               <div>
                    <p className='text-xl font-bold'>{props.position}</p>
                    <p className='text-gray-900'>{props.company} </p>
                    <p className='text-xs'>{props.status} <span className='font-bold mx-1'>·</span> <span className='text-gray-400'>{props.date}</span></p>
                    <p className='text-xs text-gray-400'></p>
                    <div className='flex flex-row-reverse me-2 mt-2'>
                           <button className='hover:cursor-pointer'>
                           <img className='mx-2' src="https://img.icons8.com/?size=100&id=86376&format=png&color=8A8A8A" width={20} alt="" 
                           onClick={Edit}
                           />
                           </button>
                           <button className='hover:cursor-pointer'>
                           <img className='mx-1' src="https://img.icons8.com/?size=100&id=99961&format=png&color=D00B0B" width={20} alt="" 
                           onClick={deleteJob}
                           />
                           </button>
                    </div>
               </div>
              

            </div>
    </div>
  )
}

export default JobCards