import React from 'react'

function sender() {
    return (
        <div className="flex flex-1 justify-between items-center shadow mt-auto rounded-md p-3 bg-[#060415]">
            <button className="bg-transparent opacity-70 text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-paperclip" viewBox="0 0 24 24">
                    <defs></defs>
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"></path>
                </svg>
            </button>
            <div className="border rounded text-sm flex flex-1 overflow-hidden py-[2px] pl-3 pr-1 items-center justify-between mx-2 bg-gray-900">
                <input type="text" className="border-none outline-none h-8 flex-1 mr-1 bg-gray-900 text-white" placeholder="Enter your message here" />
                <button className="bg-transparent flex items-center justify-center px-2 text-orange-300 p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-smile" viewBox="0 0 24 24">
                        <defs></defs>
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"></path>
                    </svg>
                </button>
            </div>
            <button className="flex h-8 text-sm items-center text-white bg-blue-400 rounded px-3 active:scale-[0.98]">Send
                <svg xmlns='http://www.w3.org/2000/svg' className='w-4 ml-1' viewBox='0 0 512 512'><defs /><path fill='white' d='M481.508 210.336L68.414 38.926c-17.403-7.222-37.064-4.045-51.309 8.287C2.86 59.547-3.098 78.551 1.558 96.808L38.327 241h180.026c8.284 0 15.001 6.716 15.001 15.001 0 8.284-6.716 15.001-15.001 15.001H38.327L1.558 415.193c-4.656 18.258 1.301 37.262 15.547 49.595 14.274 12.357 33.937 15.495 51.31 8.287l413.094-171.409C500.317 293.862 512 276.364 512 256.001s-11.683-37.862-30.492-45.665z' /></svg>
            </button>
        </div>
    )
}

export default sender
