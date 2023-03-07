import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
// import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext'
import { db } from '../Firebase';
import Chatbox from './Chatbox'
import Sender from './Sender'
function Chat() {
    const { data, dispatch } = useContext(ChatContext);
    // const { currentuser } = useContext(AuthContext);
    const [lastSeen, setLastSeen] = useState(null)
    useEffect(() => {
        const getContact = () => {
            const unsub = onSnapshot(doc(db, "userChats", data.user.uid), (doc) => {
                var chats = Object.entries(doc.data())?.sort((a, b) => b[1].date - a[1].date);
                console.log(chats)
                setLastSeen(new Date(chats[0][1].date.seconds * 1000).toLocaleTimeString())
            })
            return (() => unsub())
        }
        data.user.uid && getContact();
    }, [data.user.uid])

    const handleselect = (u) => {
        dispatch({ type: "SideOpen"})
    }
    // // console.log(new Date(lastSeen.seconds).toTimeString());
    // setLastSeen(new Date(lastSeen.seconds*1000).toLocaleTimeString());
    return (
        <div className='relative shadow shadow-blue-600 md:flex flex-col flex-[3] bg-[#12172d] rounded-xl w-full h-full'>
            {/* Header */}
            <div className='bg-[#060415] rounded-t-xl text-zinc-50'>
                <div className='flex items-center p-2'>
                    <i onClick={() => handleselect(data.user)} className="fa-solid fa-arrow-left block md:hidden ml-1 mr-3 active:scale-95"></i>
                    <img className='flex flex-shrink-0 object-cover object-center w-12 h-12 rounded-full' src={data.user.photoURL} alt="..." />
                    <div className='flex flex-col pl-2'>
                        <span className='px-2 text-lg font-medium'>{data.user.displayName}</span>
                        <span className='px-2 text-sm font-medium'>Last Seen at {lastSeen}</span>
                    </div>
                </div>
            </div>
            <div className='max-h-[calc(100vh-190px)] overflow-auto'>
                <Chatbox />
            </div>
            <div className='w-[98%] absolute bottom-2 mx-[1%]'>
                <Sender />
            </div>
        </div>
    )
}

export default Chat
