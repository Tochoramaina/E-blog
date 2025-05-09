import React, { useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { Navbar, TextInput, Button, Dropdown, Avatar} from 'flowbite-react';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon, FaSun} from "react-icons/fa"
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/User/userSlice';

const Header = () => {
    const path = useLocation().pathname;
    const dispatch = useDispatch()
    const {currentUser} = useSelector((state) => state.user)
    const {theme} = useSelector((state) => state.theme)
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl)
      }
    }, [location.search])
    const handleSignOut = async() => {
      try {
        const res = await fetch('/api/user/signout', {
          method : "POST"
        });
        const data = await res.json();
        if(!res.ok){
          console.log(data.message)
        }
        else{
          dispatch(signoutSuccess())
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`)
    }
  return (
    <Navbar className="border-b-2">
        <Link to= "/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Maina's</span>Blog
        </Link>
        <form onSubmit={handleSubmit}>
            <TextInput type='text' placeholder='Search...'  className='hidden lg:inline' rightIcon={AiOutlineSearch} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        </form>
       <Button className='w-12 h-10 lg:hidden' color='gray' pill><AiOutlineSearch/></Button>
       <div className='flex gap-2 md:order-2'>
          <Button 
            className='w-12 h-10 hidden sm:inline' color='gray' 
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'light' ? <FaSun/> : <FaMoon/>}
          </Button>
          {currentUser ? (
            <Dropdown arrowIcon={false} inline label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded/>
            }>
              <Dropdown.Header>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block font-medium text-sm truncate'>{currentUser.email}</span>
              </Dropdown.Header>
              <Link to={`/dashboard?tab=profile`}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : 
          (
            <Link to='/sign-in'><Button gradientDuoTone="purpleToBlue" outline>Sign In</Button></Link>
          )}
           <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
              <Navbar.Link as={'div'}><Link to='/' active ={path === '/'}>Home</Link></Navbar.Link>
              <Navbar.Link as={'div'}><Link to='/about' active = {path === '/about'}>About</Link></Navbar.Link>
              <Navbar.Link as={'div'}><Link to='/projects' active={path === '/projects'}>Projects</Link></Navbar.Link>
            
        </Navbar.Collapse>
       
    </Navbar>
  )
}

export default Header