import React, { useState } from 'react'
import {Label, TextInput, Button, Alert, Spinner} from 'flowbite-react';
import {Link, useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrormessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value.trim()})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrormessage('Please fill out all fields')
    }
    try {
      setLoading(true)
      setErrormessage(null)
      const res = await fetch('/api/auth/signup', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        return setErrormessage(data.message)
      }
      setLoading(false)
      if(res.ok){
        navigate('/sign-in')
      }
    } catch (error) {
      setErrormessage(error.message)
      setLoading(false)
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
              <Label value = "Your username"/>
              <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
            </div>
            <div>
              <Label value = "Your email"/>
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value = "Your password"/>
              <TextInput type='password' placeholder='password' id='password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone ='purpleToPink' type="submit">
            {loading ? (
              <>
              <Spinner size='sm'>
                <span className='pl-3'>Loading...</span>
              </Spinner>
              </>
            ): ('Sign Up')}
            </Button>
            <OAuth/>
          </form>
          <div className ='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
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

export default SignUp