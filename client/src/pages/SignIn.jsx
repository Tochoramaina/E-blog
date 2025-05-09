import React, { useState } from 'react'
import {Label, TextInput, Button, Alert, Spinner} from 'flowbite-react';
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/User/userSlice';
import OAuth from '../components/OAuth';
const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading, error : errorMessage} = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value.trim()})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill out all fields'))
    }
    try {
     dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message))
      }
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
     dispatch(signInFailure(error.message))
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link to= "/" className=' font-bold dark:text-white text-lg md:text-4xl'>
                  <span className='px-2 py-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Maina's</span>Blog
          </Link>
          <p className='text-sm mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, perferendis quos. Dolore natus, non labore veniam quaerat quidem quae repellendus eveniet architecto, earum obcaecati molestiae blandi</p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value = "Your email"/>
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value = "Your password"/>
              <TextInput type='password' placeholder='*********' id='password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone ='purpleToPink' type="submit">
            {loading ? (
              <>
              <Spinner size='sm'>
                <span className='pl-3'>Loading...</span>
              </Spinner>
              </>
            ): ('Sign in')}
            </Button>
            <OAuth/>
          </form>
          <div className ='flex gap-2 text-sm mt-5'>
            <span>Dont have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}


export default SignIn