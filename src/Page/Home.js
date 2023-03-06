import React from 'react'
import Chat from '../Components/Chat'
import Sidenav from '../Components/Sidenav'

function Home() {
  return (
    <div className='w-full bg-[#060415]'>
      <div className='container font-sans flex h-screen mx-auto'>
        <Sidenav />
        <Chat />
      </div>
    </div>
  )
}

export default Home
