import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess} from '../redux/User/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashProfile = () => {
  const {currentUser, error, loading} = useSelector(state => state.user);
  const [imageFile, setImagefile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerref = useRef();
  const [imagefileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileuploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setshowModal] = useState(false)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setImagefile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }

  };
  useEffect(() => {
    if(imageFile){
      uploadImage();
    }
  }, [imageFile])
  setImageFileUploading(true)
  setImageFileUploadError(null)
  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =  (snapshot.bytesTransferred/ snapshot.totalBytes) *100;
        setImageFileUploadProgress(progress.toFixed(0))
      },
      (error) => {
        setImageFileUploadError('Could not upload image (file must be < 2mb)')
        console.log(error)
        setImageFileUploadProgress(null);
        setImagefile(null)
        setImageFileUrl(null)
        setImageFileUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({...formData, profilePicture : downloadURL});
          setImageFileUploading(false)
        })
      }
    ) 
  }
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null)
    if(Object.keys(formData).length === 0){
      setUpdateUserError('No changes made')
      return;
    }
    if(imageFileUploading){
      setUpdateUserError('Please wait for image to upload')
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method : 'PUT',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(!res.ok){
        dispatch(updateFailure(data.message))
        setUpdateUserError(data.message)
      }
      else{
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("User's profile has been updated successfully!")
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message)
    }
  }
  const handleDeleteUser = async () => {
    setshowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method : 'DELETE'
      });
      const data = await res.json();
      if(!res.ok){
        dispatch(deleteUserFailure(data.message))
      }
      else{
        dispatch(deleteUserSuccess(data))
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  const handleSignOut = async () => {
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
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='file' accept='image/*' onClick={handleImageChange} ref={filePickerref} hidden/>
        <div className='relative w-32 h-32 self-center' onClick={() => filePickerref.current.click()}>
          {imagefileUploadProgress && (
            <CircularProgressbar value ={imagefileUploadProgress || 0} text={`$
              {imagefileUploadProgress}%`}
              strokewidth = {5}
              styles = {{
                root: {    
                  width : '100%',
                  height : '100%',
                  position : 'absolute',
                  top :0, 
                  left : 0
                },
                path: {
                  stroke : `rgba(62, 152, 199, ${
                  imagefileUploadProgress/100}`
                }
              }}/> 
              
              
              
          )}
            <img src={imageFileUrl || currentUser.profilePicture} alt='user' className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover cursor-pointer shadow-md overflow-hidden ${imagefileUploadProgress && imagefileUploadProgress < 100 && 'opacity-65'}`} onChange={handleChange}/>
        </div>
        {imageFileuploadError && <Alert color='failure'>{imageFileuploadError}</Alert>}
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange}/>
        <TextInput type='password' id='password' placeholder='password' onChange={handleChange}/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading || imageFileUploading}>{loading ? 'loading' : "Update"}</Button>
        {currentUser.isAdmin && (
         <Link to={'/create-post'}>
          <Button type='button' gradientDuoTone='purpleToPink' className='w-full'>
            Create a post
          </Button>
         </Link>
        )
        }
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setshowModal(true)} className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer' onClick={handleSignOut}>Sign Out</span>  
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
      <Modal show={showModal} onClose={() => setshowModal(false)}
       popup size='md'
        >
          <Modal.Header/>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
               <div className="flex justify-center gap-3">
                <Button color='failure' onClick={handleDeleteUser}>Yes, I'm Sure</Button>
                <Button color='gray' onClick={() => setshowModal(false)}>No, cancel</Button>
               </div>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default DashProfile