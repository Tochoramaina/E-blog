
import { Modal, Table, TableCell, TableRow, Button } from 'flowbite-react';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {FaCheck, FaTimes} from 'react-icons/fa'
const DashComments = () => {
    const {currentUser} =  useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentsIdToDelete, setCommentsIdToDelete] = useState('')
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment/getcomments`)
                const data = await res.json()
                if(res.ok){
                    setComments(data.comments);
                    if(data.comments.length < 9){
                        setShowMore(false)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        if(currentUser.isAdmin){
            fetchComments
        }
    }, [currentUser._id])
    const handleShowMore = async() => {
        const startIndex = comments.length;
        try {
            const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok){
                setComments((prev) => [...prev, ...data.users]);
                if(data.users.length < 9){
                    setShowMore(false)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteComment = async() => {
      setShowModal(false)
        try {
            const res = await fetch(`/api/comment/deleteComment/${commentsIdToDelete}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if(res.ok){
                setComments((prev) => prev.filter((comment) => comment._id !== commentsIdToDelete));
                setShowModal(false)
            }else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-500 dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && comments.length > 0 ? (
            <>
            <Table hoverable className='shadow-md'>
                <Table.Head>
                    <Table.HeadCell>Date created</Table.HeadCell>
                    <Table.HeadCell>Comment content</Table.HeadCell>
                    <Table.HeadCell>Number of likes</Table.HeadCell>
                    <Table.HeadCell>PostId</Table.HeadCell>
                    <Table.HeadCell>UserId</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {comments.map((comment) => {
                    <TableBody className='divide-y' key={comment._id}>
                        <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <TableCell>{new Date(comment.updatedAt).toLocaleDateString()}</TableCell>
                            <TableCell>{comment.content}</TableCell>
                            <TableCell> {comment.numberOfLikes}</TableCell>
                            <TableCell>{comment.postid}</TableCell>
                            <TableCell>{comment.userId}</TableCell>
                            <TableCell><span onClick={() => {setShowModal(true); setCommentsIdToDelete(comment._id)}}  className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span></TableCell>
                        </TableRow>
                    </TableBody>
                })}
            </Table>
            {showMore && (
                <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show More</button>
            )}
            </>
        ) : (
            <p>You have no comments yet</p>
        )}
         <Modal show={showModal} onClose={() => setShowModal(false)}
               popup size='md'
                >
                  <Modal.Header/>
                  <Modal.Body>
                    <div className="text-center">
                      <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                      <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this comment?</h3>
                       <div className="flex justify-center gap-3">
                        <Button color='failure' onClick={handleDeleteComment}>Yes, I'm Sure</Button>
                        <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
                       </div>
                    </div>
                  </Modal.Body>
                </Modal>
    </div>
  )
}

export default DashComments;