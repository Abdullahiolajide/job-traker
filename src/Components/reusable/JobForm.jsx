import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import './Jobform.css';

const JobForm = (props) => {
    const retrivedJobs = JSON.parse(localStorage.getItem('jobs') || '[]')
    const inputClass = 'border-b-2 duration-150 bg-gray-100 w-6/6 p-2 border-gray-300 focus:border-blue-600 focus:outline-none'
    const [jobDetails, setJobDetails] = useState({
        id: nanoid(),
        company:'',
        site:'',
        position:'',
        status:'',
        date:''
    })
  useEffect(()=>{
    if (props.id) {
        
        const locatedJobIndex = retrivedJobs.findIndex(job => job.id == props.id)
        setJobDetails(retrivedJobs[locatedJobIndex])
    }
  }, [])

    const handleSubmit=(e)=>{
        e.preventDefault()
        if (props.id) {
            const locatedJobIndex = retrivedJobs.findIndex(job => job.id == props.id)
            
            retrivedJobs.splice(locatedJobIndex, 1,  jobDetails)
            localStorage.setItem('jobs', JSON.stringify(retrivedJobs))
            props.update()
            props.close()
        }else{

            const newArray = []
            newArray.push(...retrivedJobs)
            newArray.push(jobDetails)
            localStorage.setItem('jobs', JSON.stringify(newArray))
            console.log(jobDetails)
            props.update()
            props.close()
    }
    }


    const handlechange =(e)=>{
        const {name, value} = e.target;
        setJobDetails(prevDetails=>({
            ...prevDetails, [name]: value
        }))
    }

    
  return (
    <div className='fade-in absolute'>
        <div className='w-[100vw] h-[100vh] bg-black opacity-50 fixed'></div>
        <div className='fixed flex justify-center mt-5 w-[100%]'>

           <div className='bg-white rounded border border-2 border-blue-100 w-5/6 md:w-100 fade-in'>
               <form action="" className='p-4' onSubmit={handleSubmit}>
                    <h1 className='text-xl'>Job Information</h1>
                    <hr className='border-gray-300 mb-2 my-1'/>
                    
                    <div className=''>
                        <label htmlFor="company" className='text-sm'>Company</label> <br />
                        <input 
                        type="text" 
                        name='company'
                        className={inputClass}
                        onChange={handlechange}
                        value={jobDetails.company}
                        />
                    </div>
                    <div className=''>
                        <label htmlFor="company" className='text-sm'>Company Site</label> <br />
                        <input 
                        type="text" 
                        className={inputClass}
                        name='site'
                        onChange={handlechange}
                        value={jobDetails.site}
                        placeholder='Ex. google.com'
                        />
                    </div>

                    <div className=''>
                        <label htmlFor="company" className='text-sm'>Position</label> <br />
                        <input 
                        type="text" 
                        name='position'
                        className={inputClass}
                        onChange={handlechange}
                        value={jobDetails.position}
                        />
                    </div>

                    <div className=''>
                        <label htmlFor="company" className='text-sm'>Status</label> <br />
                      <select name="status" id="" className={inputClass} onChange={handlechange} >
                        <option value="Applied">-- choose --</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer Received">Offer Received</option>
                      </select>
                    </div>

                    <div className=''>
                        <label htmlFor="company" className='text-sm'>Date</label> <br />
                        <input 
                        type="date" 
                        name='date'
                        className={inputClass}
                        onChange={handlechange}
                        value={jobDetails.date}
                        />
                    </div>

                   <div className='flex justify-center'>
                  {!props.id ?
                   <button 
                   className={'active:scale-[0.97] hover:cursor-pointer bg-blue-500 text-white mt-4 duration-150 w-5/12 mx-2 p-2'}
                   
                   >Add Job</button> 
                   : 
                   <button 
                   className={'active:scale-[0.97] hover:cursor-pointer bg-blue-500 text-white mt-4 duration-150 w-5/12 mx-2 p-2'}
                   
                   >Edit Job</button> 

                  }
                    <span
                    className={'text-center active:scale-[0.97] hover:cursor-pointer border border-blue-500 text-blue-500  mt-4 duration-150 mx-2 w-5/12 p-2'}
                    onClick={props.close}
                    >Close</span>
                   </div>
               </form>
                
           </div>
        </div>
    </div>
  )
}

export default JobForm