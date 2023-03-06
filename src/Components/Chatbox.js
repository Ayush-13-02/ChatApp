import React from 'react'

function Chatbox() {
    const data = [1, 2, 3, 4, 5, 6]
    return (
        <div className='w-full max-h-full overflow-auto'>
            {
                data.map((item) => {
                    return (
                        <div key={item}>
                            <div className='flex w-full justify-end'>
                                <div className='flex m-2 max-w-[80%] sm:max-w-[70%] md:max-w-[50%]'>
                                    <div className='flex flex-col mr-1 mt-4 rounded-xl rounded-tr-[0px] rounded-bl-[0px] bg-blue-300 px-2 py-1'>
                                        <span>Hi</span>
                                        <span className='text-xs text-right font-bold'>12:00 am</span>
                                    </div>

                                    <div>
                                        <img className='flex-shrink-0 object-cover object-center w-8 h-8 rounded-full mb-2 hidden' src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600" alt="..." />
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full justify-start'>
                                <div className='flex m-2 w-3/4 sm:w-2/3 md:w-1/2'>
                                    <div className='flex flex-col ml-1 mt-4 rounded-xl rounded-tr-[0px] rounded-bl-[0px] bg-blue-50 p-2'>
                                        <span>Hi</span>
                                        <span className='text-xs text-right font-bold'>12:00 am</span>
                                    </div>
                                    <div>
                                        <img className='flex-shrink-0 object-cover object-center w-8 h-8 rounded-full mb-2 hidden' src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600" alt="..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Chatbox
