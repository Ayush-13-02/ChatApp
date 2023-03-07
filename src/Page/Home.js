import React, { useContext } from 'react'
import Chat from '../Components/Chat'
import Sidenav from '../Components/Sidenav'
import { ChatContext } from '../Context/ChatContext'

function Home() {
  const {sideOPen} = useContext(ChatContext)
  return (
    <div className='w-full h-full bg-[#060415]'>
      <div className='max-w-[90rem] font-sans flex flex-1 h-screen mx-auto'>
        <div className={"basis-full md:basis-[30%] h-screen p-6 md:pr-3 "+(sideOPen?'':'hidden md:block')}><Sidenav/></div>
        <div className={"basis-full md:basis-[70%] h-screen p-6 md:pl-3 "+(sideOPen?'hidden md:block':'')}><Chat/></div>
      </div>
    </div>
  )
}

export default Home
