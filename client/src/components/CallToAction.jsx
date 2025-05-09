import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col'>
            <h1 className='text-2xl'>Want to learn Javascript?</h1>
            <p className='text-gray-500 my-2'>Check these resorces in ws3schools</p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href='https://www.100jsprojects.com' target='_blank' rel='noopener noreferrer'>
                100 js projects
                </a>
            </Button>
        </div>
        <div className='p-7 flex-1'>
            <img src='https://bairesdev.mo.cloudinary.net/blog/2023/88/What-Is-Javascript-Used-For.jpg' alt='wowza'/>
        </div>
    </div>
  )
}

export default CallToAction