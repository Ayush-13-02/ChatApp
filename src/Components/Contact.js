import React from 'react'

function Contact() {
    return (
        <div>
            <div className='flex items-center rounded-t-xl justify-between my-auto bg-[#060415] text-xl font-bold px-2'>
                <div className='flex items-center p-2'>
                    <img className='flex flex-shrink-0 object-cover object-center w-12 h-12 rounded-full' src={currentuser.photoURL} alt="..." />
                    <div className='flex flex-col pl-2'>
                        <span className='px-2 text-lg font-medium'>{currentuser.displayName}</span>
                        <span className='px-2 text-sm font-medium'>12:00 am</span>
                    </div>
                </div>
                <button title='Add new Contact' onClick={() => setContact(true)} className='cursor-pointer active:scale-[0.95]'><i class="fa-solid fa-plus"></i></button>
                <button title='Logout' onClick={() => signOut(auth)} className='cursor-pointer active:scale-[0.95]'><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
            </div>
            <div>
                <div className='border-b-2 border-blue-500 mx-1'>
                    <input type="text" name="userimg" id="userimg" className="text-sm rounded block w-full p-2.5 bg-[#12172d] text-white placeholder-blue-800 font-medium outline-none" placeholder="Search User" required="" />
                </div>
                <div className='my-4'>
                    <div className='flex items-center m-2 p-2 rounded cursor-pointer bg-blue-700'>
                        <div className='w-12 h-12 rounded-full border border-blue-500'><img className='flex flex-shrink-0 object-cover object-center w-12 h-12 rounded-full' src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600" alt="..." /></div>

                        <div className='flex flex-col mx-2'>
                            <span className='font-bold'>OUser Name</span>
                            <span className='text-sm'>Last Messae in Chatbox</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
