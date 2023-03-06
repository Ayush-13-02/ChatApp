import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import { db } from '../Firebase';

function Search({ setContact }) {
    const [search, setSearch] = useState("");
    // const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [searchdata, setSearchdata] = useState([]);
    const [err, setErr] = useState(false)
    const { currentuser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const HandleSearch = async (e) => {
        setSearch(e.target.value);
        var Search = e.target.value;

        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            var list = [];
            querySnapshot.forEach((doc) => {
                list.push(doc.data());
            });
            setAllUsers(list)
        } catch (err) {
            setErr(true)
        }

        var data = allUsers.filter(function (Userdata) {
            return Userdata.displayName.includes(Search);
        });
        setSearchdata(data);
    }

    const HandleSelect = async (user) => {
        //setUser(item)
        console.log("HandleSelect");
        const combinedId =
            currentuser.uid > user.uid ?
                (currentuser.uid + user.uid) :
                (user.uid + currentuser.uid);
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            dispatch({ type: "CHANGE_USER", payload: user });

            if (!res.exists()) {
                // create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });
                // update userchats
                // await updateDoc(doc(db, "userChats", currentuser.uid), {
                //     [combinedId + ".userInfo"]: {
                //         uid: user.uid,
                //         displayName: user.displayName,
                //         photoURL: user.photoURL
                //     },
                //     [combinedId + ".date"]: serverTimestamp()
                // });

                // await updateDoc(doc(db, "userChats", user.uid), {
                //     [combinedId + ".userInfo"]: {
                //         uid: currentuser.uid,
                //         displayName: currentuser.displayName,
                //         photoURL: currentuser.photoURL
                //     },
                //     [combinedId + ".date"]: serverTimestamp()
                // })
            }

        } catch (err) {
            setErr(true);
            console.log("Uff! Error")
        }
        setContact(false)
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
                <input type="text" name="userimg" id="userimg" onChange={(e) => HandleSearch(e)} value={search} className="text-sm rounded block w-full p-2.5 bg-[#12172d] text-white placeholder-blue-800 font-medium outline-none" placeholder="Search User" required="" />
            </div>

            <div className='my-4'>
                {
                    searchdata.map((item) => {
                        return (
                            <div key={item.uid} className='flex items-center m-2 p-2 rounded cursor-pointer shadow-sm shadow-[#060415] hover:scale-[1.02] active:scale-100' onClick={() => { HandleSelect(item); }}>
                                <div className='w-12 h-12 rounded-full border border-blue-500'>
                                    <img className='flex flex-shrink-0 object-cover object-center w-12 h-12 rounded-full' src={item.photoURL} />
                                </div>

                                <div className='flex flex-col mx-2'>
                                    <span className='font-bold'>{item.displayName}</span>
                                    <span className='text-sm'>Last Messae in Chatbox</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Search
