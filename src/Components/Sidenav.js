import { signOut } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext';
import { auth, db } from '../Firebase'
import Search from './Search';

function Sidenav() {
    const { currentuser } = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);
    const [contact, setContact] = useState(false);
    const [allContact, setAllContact] = useState([])
    useEffect(() => {
        const getContact = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentuser.uid), (doc) => {
                setAllContact(doc.data());
            })
            return (() => unsub())
        }
        currentuser.uid && getContact();
    }, [currentuser.uid])
    const handleselect=(u)=>{
        dispatch({ type: "CHANGE_USER", payload: u });
    }
    //console.log(Object.entries(allContact))
    return (
        <div className='hidden shadow shadow-blue-600 sm:block w-80 m-6 rounded-xl bg-[#12172d] text-zinc-50'>
            {
                !contact ? <div>
                    <div className='flex items-center rounded-t-xl justify-between my-auto bg-[#060415] text-xl font-bold px-2'>
                        <div className='flex items-center p-2'>
                            <img className='flex flex-shrink-0 object-cover object-center w-12 h-12 rounded-full' src={currentuser.photoURL} alt="..." />
                            <div className='flex flex-col pl-2'>
                                <span className='px-2 text-lg font-medium'>{currentuser.displayName}</span>
                                <span className='px-2 text-sm font-medium'>12:00 am</span>
                            </div>
                        </div>
                        <button title='Add new Contact' onClick={() => setContact(true)} className='cursor-pointer active:scale-[0.95]'><i className="fa-solid fa-plus"></i></button>
                        <button title='Logout' onClick={() => signOut(auth)} className='cursor-pointer active:scale-[0.95]'><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                    </div>
                    <div>
                        <div className='border-b-2 border-blue-500 mx-1'>
                            <input type="text" name="userimg" id="userimg" className="text-sm rounded block w-full p-2.5 bg-[#12172d] text-white placeholder-blue-800 font-medium outline-none" placeholder="Search User" required="" />
                        </div>
                        <div className='my-4'>
                            {
                                Object.entries(allContact)?.sort((a,b)=>b[1].date - a[1].date).map((item) => {
                                    return (
                                        <div onClick={()=>handleselect(item[1].userInfo)} key={item[0]} className='flex flex-1 items-center m-2 p-2 rounded cursor-pointer bg-blue-700 h-20'>
                                            <div className='w-12 h-12 rounded-full border border-blue-500'><img className='flex flex-shrink-0 object-cover object-center w-12 h-12 rounded-full' src={item[1].userInfo.photoURL} alt="..." /></div>

                                            <div className='flex flex-col mx-2'>
                                                <span className='font-bold'>{item[1].userInfo.displayName}</span>
                                                <span className='flex-grow text-sm overflow-hidden w-56 whitespace-nowrap text-ellipsis'>{item[1].lastMessages.text}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div> :
                    <Search setContact={setContact} />
            }
        </div>
    )
}

export default Sidenav
