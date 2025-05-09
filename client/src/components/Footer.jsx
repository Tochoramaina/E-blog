import React from 'react'
import {Footer} from 'flowbite-react'
import {Link} from 'react-router-dom'
import {BsFacebook, BsGithub, BsTwitter, BsInstagram, BsDribbble} from 'react-icons/bs'
const FooterComp = () => {
  return (
    <div>
        <Footer container className='border border-t-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='mt-4 mb-3'>
                    <Link to= "/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                            <span className='px-2 py-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Maina's</span>Blog
                    </Link>
                    </div>
                    <div className='grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-5'>
                        <div>
                            <Footer.Title title='About'/>
                            <Footer.LinkGroup col>
                                <Footer.Link href='https://www.100jsprojects.com' target='_blank' rel='noopener noreferrer'>100 js projects</Footer.Link>
                                <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'>Maina Blog</Footer.Link>
                            </Footer.LinkGroup>
                            
                        </div>
                        <div>
                            <Footer.Title title='Follow us'/>
                            <Footer.LinkGroup col>
                                <Footer.Link href='https://www.github.com/TochoraMaina' target='_blank' rel='noopener noreferrer'>Github</Footer.Link>
                                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>Discord</Footer.Link>
                            </Footer.LinkGroup>
                            
                        </div>
                        <div>
                            <Footer.Title title='Legal'/>
                            <Footer.LinkGroup col>
                                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                                <Footer.Link href='/#' >Terms & Conditions</Footer.Link>
                            </Footer.LinkGroup>
                            
                        </div>
                    </div>
                </div>
                <Footer.Divider/>
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright href='#' by="Maina's blog" year={new Date().getFullYear()}/>
                    <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                        <Footer.Icon href='#' icon={BsFacebook}/>
                        <Footer.Icon href='#' icon={BsTwitter}/>
                        <Footer.Icon href='#' icon={BsInstagram}/>
                        <Footer.Icon href='#' icon={BsDribbble}/>
                        <Footer.Icon href='#' icon={BsGithub}/>
                    </div>
                </div>
            </div>
        </Footer>
    </div>
  )
}

export default FooterComp