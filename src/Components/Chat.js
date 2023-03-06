import React from 'react'
import Chatbox from './Chatbox'
import Sender from './Sender'
function Chat() {
    return (
        <div className='relative shadow shadow-blue-600 flex flex-col flex-[3] w-[calc(100%-20rem)] bg-[#12172d] m-6 rounded-xl'>
            {/* Header */}
            <div className='bg-[#060415] rounded-t-xl text-zinc-50'>
                <div className='flex items-center p-2'>
                    <img className='flex flex-shrink-0 object-cover object-center w-12 h-12 rounded-full' src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600" alt="..." />
                    <div className='flex flex-col pl-2'>
                        <span className='px-2 text-lg font-medium'>User Name</span>
                        <span className='px-2 text-sm font-medium'>Online</span>
                    </div>
                </div>
            </div>
            <div className='max-h-[calc(100vh-180px)] overflow-auto'>
                <Chatbox />
            </div>
            <div className='w-[98%] absolute bottom-2 mx-[1%]'>
                <Sender />
            </div>
        </div>
    )
}

export default Chat
