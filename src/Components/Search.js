import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../Firebase';

function Search({ setContact }) {
    const [search, setSearch] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false)
    const HandleSearch = async () => {
        console.log("Hello")
        const q = query(
            collection(db, "users"),
            where("displayName", "==", search));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            })
        } catch (err) {
            setErr(true)
        }
        console.log(user, search)
    }
    const HandleKey = (e) => {
        console.log("Hi");
        e.code === "Enter" && HandleSearch();
    }
    return (
        <div>
            <div className='flex items-center rounded-t-xl justify-between my-auto bg-[#060415] text-xl font-bold px-2'>
                <div className='flex items-center p-2 my-1'>
                    <button onClick={() => setContact(false)}><i className="fa-solid fa-arrow-left"></i></button>
                    <div className='flex flex-col pl-2'>
                        <span className='px-2 text-lg font-medium'>New Chat</span>
                    </div>
                </div>
            </div>
            <div className='border-b-2 border-blue-500 mx-1'>
                <input type="text" name="userimg" id="userimg" onKeyDown={HandleKey} onChange={(e) => setSearch(e.target.value)} value={search} className="text-sm rounded block w-full p-2.5 bg-[#12172d] text-white placeholder-blue-800 font-medium outline-none" placeholder="Search User" required="" />
            </div>

            <div className='my-4'>
                {user&&<div className='flex items-center m-2 p-2 rounded cursor-pointer bg-blue-700'>
                    <div className='w-12 h-12 rounded-full border border-blue-500'>
                        <img className='flex flex-shrink-0 object-cover object-center w-12 h-12 rounded-full' src={user.photoURL} />
                    </div>

                    <div className='flex flex-col mx-2'>
                        <span className='font-bold'>{user.displayName}</span>
                        <span className='text-sm'>Last Messae in Chatbox</span>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Search
