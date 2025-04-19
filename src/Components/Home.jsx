import React, { useState } from 'react'
import JobForm from './reusable/JobForm'
import JobCards from './reusable/JobCards'

const Home = () => {
    const [showJobForm, setShowJobForm] = useState(false)
    const [editValues, setEditValues] = useState('')
    const [showEditForm, setShowEditForm] = useState(false)
    const [retrivedJobs, setRetrivedJobs]= useState(JSON.parse(localStorage.getItem('jobs') || '[]'))
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]')
    let [navS, setNavS] = useState('')
    const update = ()=>{
        if (navS) {
            const allJob = JSON.parse(localStorage.getItem('jobs') || '[]')
            const filtered = allJob.filter(all => all.status === navS);
            console.log('runed', navS)
            console.log(filtered)
            setRetrivedJobs(filtered)
        }else{
            setRetrivedJobs(JSON.parse(localStorage.getItem('jobs') || '[]'))
            console.log(('not runed', navS))
        }
    }
    const edit=(value)=>{
        setShowEditForm(prev=>!prev)
        setEditValues(value)
    }

    const filter = (status)=>{
        const filtered = allJobs.filter(job => job.status == status)
        setRetrivedJobs(filtered)
        setNavS(status)
    }

   const jobs = retrivedJobs.map((job, i)=>{
        return (
            <JobCards 
                key={i}
                update={update}
                id={job.id}
                company={job.company}
                date={job.date}
                position={job.position}
                site={job.site}
                status={job.status}
                edit={edit}
            />
        )
    })


  return (
    <div className='flex flex-row'>
        {showJobForm && <JobForm
            update={update} 
            close={()=> setShowJobForm(prev => !prev)}
        />}

        {showEditForm &&
            <JobForm
             close={()=> setShowEditForm(prev => !prev)}
                update={update} 
                id={editValues.id}
            />
        }
      <nav className='h-[100vh] bg-[#2B8CFF] md:flex'>
        <div className='flex flex-col items-center  p-1 ml-3 mr-3 md:mr-8 mt-16 text-white'>

         <main className='h-100 flex flex-col items-center justify-center space-y-6'>
            <div className={`flex items-center space-x-2 w-12/12 justify-between hover:text-blue-300 hover:cursor-pointer
            ${navS == '' && 'text-blue-300'}`}
            onClick={()=> {setRetrivedJobs(allJobs); setNavS('')}}
            >
                <img src={`https://img.icons8.com/?size=100&id=5moSvLHPSm17&format=png&color=${navS == '' ? '8EC5FF': 'ffffff'}`} alt="" width={26} className='rounded-lg'/> <span className='hidden md:block'>All</span>
            </div>

            <div className={`flex items-center space-x-2 w-12/12 justify-between 
            ${navS == 'Applied' && 'text-blue-300'}
            `}
            onClick={()=> filter('Applied')}
            >
                <img src={`https://img.icons8.com/?size=100&id=83144&format=png&color=${navS == 'Applied' ? '8EC5FF': 'ffffff'}`} alt="" width={26} className='rounded-lg'/> <span className='hidden md:block'>Applied</span>
            </div>

            <div className={`flex items-center space-x-2 w-12/12 justify-between
            ${navS == 'Interviewing' && 'text-blue-300'}
            `}
            onClick={()=> filter('Interviewing')}
            >
                <img src={`https://img.icons8.com/?size=100&id=0zlrkLWzxA4o&format=png&color=${navS == 'Interviewing' ? '8EC5FF': 'ffffff'}`} alt="" width={26} className='rounded-lg'/> <span className='hidden md:block'>Interviewing</span>
            </div>


            <div className={`flex items-center space-x-2 w-12/12 justify-between
            ${navS == 'Offer Received' && 'text-blue-300'}
            `}
            onClick={()=> filter('Offer Received')}
            >
                <img src={`https://img.icons8.com/?size=100&id=RA3LIMWdtwsO&format=png&color=${navS == 'Offer Received' ? '8EC5FF': 'ffffff'}`} alt="" width={26} className='rounded-lg'/> <span className='hidden md:block'>received</span>
            </div>
         </main>
           
        </div>
      </nav>

      <div className='w-[100vw] h-[100vh] overflow-y-scroll'>
        {/* Dashboard Layout */}

        <nav className='shadow-md p-2 flex items-center flex-row-reverse justify-between'>
            <div className='flex items-center'>
                <div className='md:h-[50px] h-[40px] md:w-[50px] w-[40px] bg-blue-500 flex items-center justify-center text-2xl font-bold text-white rounded-4xl'>A</div>
                <div className='px-2 text-md md:text-lg'>Abdullahi</div>
            </div>
        <   div className='flex items-center'>
                <img src="/src/images/tt-logor.png" alt="" width={50} className='rounded-lg'/> <span className='md:text-2xl text-lg font-bold'>Tracker</span>
            </div>
        </nav>


        <section className='ml-6 md:ml-12 my-2'>
            <div className='flex mt-8'>
            <button className='flex bg-blue-500 text-white p-2 rounded-md hover:cursor-pointer active:scale-[0.97]'
                onClick={()=> setShowJobForm(prev => !prev)}
            >
                <img src="https://img.icons8.com/?size=100&id=60953&format=png&color=ffffff" width={23} alt="" />
                <span>Add Job</span>
            </button>

            {/* <input 
            type="text" 
            className='border border-gray-400 rounded mx-2 px-2 w-60'
            placeholder='Filter'
            /> */}
            </div>

            
        </section>
         <section className='flex flex-wrap ml-3 md:ml-8'>

            {/* card Start  */}
               {jobs}
            {/* card End */}
         </section>

      </div>
        
    </div>
  )
}

export default Home