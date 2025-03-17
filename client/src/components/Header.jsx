import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {Navbar, TextInput} from 'flowbite-react'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'
const Header = () => {
    const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
        <Link to= "/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Maina's</span>Blog
        </Link>
        <form>
            <TextInput type='text' placeholder='Search...' rightIcon={<AiOutlineSearch/>} className='hidden lg:inline'/>
        </form>
       <button className='w-12 h-10 lg:hidden' color='gray' pill><AiOutlineSearch/></button>
       <div className='flex gap-2 md:order-2'>
          <button className='w-12 h-10 hidden sm:inline' color='gray' pill><FaMoon/></button>
           <Link to='/sign-in'><button gradientDuoTone="purpleToBlue" outline>Sign In</button></Link>
           <Navbar.Toggle/>
       </div>
        <Navbar.Collapse>
            <Navbar.Link>
            <Link to='/' active ={path === '/'} as={'div'}>Home</Link>
            <Link to='/about' active = {path === '/about'} as={'div'}>About</Link>
            <Link to='/projects' active={path === '/projects'} as={'div'}>Projects</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header