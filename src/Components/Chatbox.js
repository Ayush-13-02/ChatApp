import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'
import { db } from '../Firebase'

function Chatbox() {
    const { data } = useContext(ChatContext)
    const { currentuser } = useContext(AuthContext)
    const [chat, setChat] = useState([])
    const ref = useRef();

  
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
            doc.exists && setChat(doc.data().messages)
        });
        ref.current?.scrollIntoView({ behavior: "smooth" });
        console.log("Scroll")
        return (() => unsub())
    }, [data.chatID])
    
    return (
        <div className='w-full max-h-full overflow-auto'>
            {
                chat.map((item) => {
                    return (
                        <div ref={ref} key={item.id} className='mx-4'>
                            {
                                item.senderId === currentuser.uid ?
                                    <div className='flex w-full justify-end'>
                                        {
                                            item.img ?
                                                <div className="flex justify-end w-full max-w-[80%] sm:max-w-[70%] md:max-w-[50%] m-2">
                                                    <div className="relative flex flex-col min-w-0 break-words bg-blue-300 border-0 shadow-xl rounded-md bg-clip-border p-1 max-w-max">
                                                        <div className="relative shadow-inner bg-black">
                                                            <span className="block shadow-inner overflow-hidden opacity-70">
                                                                <img src={item.img} alt="img-blur-shadow" className="" />
                                                            </span>
                                                        </div>
                                                        <div className='flex flex-col mr-1 px-2 pt-1 text-sm shadow shadow-blue-300'>
                                                            <span>{item.text}</span>
                                                        </div>
                                                        <div className='text-gray-200 absolute bottom-2 right-3 text-xs font-bold'>{new Date(item.date.seconds*1000).toLocaleTimeString()}</div>
                                                    </div>
                                                </div> :
                                                <div className='flex w-full justify-end'>
                                                    <div className='flex m-2 max-w-[80%] sm:max-w-[70%] md:max-w-[50%]'>
                                                        <div className='flex flex-col mr-1 mt-4 rounded-xl rounded-tr-[0px] rounded-bl-[0px] text-sm bg-blue-300 px-2 py-1'>
                                                            <span>{item.text}</span>
                                                            <span className='text-xs text-gray-800 text-right font-bold'>{new Date(item.date.seconds*1000).toLocaleTimeString()}</span>
                                                        </div>

                                                        <div>
                                                            <img className='flex-shrink-0 object-cover object-center w-8 h-8 rounded-full mb-2 hidden' src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600" alt="..." />
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </div> :
                                    <div className='w-full flex justify-start'>
                                        {
                                            item.img ?
                                                <div className="flex justify-start w-full max-w-[80%] sm:max-w-[70%] md:max-w-[50%] m-2">
                                                    <div className="relative flex flex-col min-w-0 break-words border-0 shadow-xl rounded-md bg-clip-border bg-white p-1 max-w-max">
                                                        <div className="relative shadow-inner bg-black">
                                                            <span className="block shadow-inner overflow-hidden opacity-70">
                                                                <img src={item.img} alt="img-blur-shadow" className="" />
                                                            </span>
                                                        </div>
                                                        <div className='flex flex-col mr-1 px-2 pt-1 text-sm'>
                                                            <span>{item.text}</span>
                                                        </div>
                                                        <div className={"absolute bottom-2 right-3 text-xs font-bold "+(item.text?'text-gray-800':'text-gray-200')}>{new Date(item.date.seconds*1000).toLocaleTimeString()}</div>
                                                    </div>
                                                </div> :
                                                <div className='flex w-full justify-start'>
                                                    <div className='flex m-2 max-w-[80%] sm:max-w-[70%] md:max-w-[50%]'>
                                                        <div className='flex flex-col mr-1 mt-4 rounded-xl rounded-tr-[0px] rounded-bl-[0px] text-sm bg-white px-2 py-1'>
                                                            <span>{item.text}</span>
                                                            <span className='text-xs text-gray-800 text-right font-bold'>{new Date(item.date.seconds*1000).toLocaleTimeString()}</span>
                                                        </div>

                                                        <div>
                                                            <img className='flex-shrink-0 object-cover object-center w-8 h-8 rounded-full mb-2 hidden' src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600" alt="..." />
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                            }


                        </div>
                    )
                })
            }

        </div>
    )
}

export default Chatbox
