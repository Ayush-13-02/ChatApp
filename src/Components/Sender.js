import { uuidv4 } from '@firebase/util';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import { db, storage } from '../Firebase';
import Img from '../Img/img.png'
function Sender() {
    const { data } = useContext(ChatContext)
    const { currentuser } = useContext(AuthContext)
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const handleSubmit = async () => {
        console.log("Hi Sender")
        try {
            if (img) {
                console.log("Doc")
                const storageRef = ref(storage, uuidv4());
                const uploadTask = uploadBytesResumable(storageRef, img);
                uploadTask.then(

                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateDoc(doc(db, "chats", data.chatID), {
                                messages: arrayUnion({
                                    id: uuidv4(),
                                    text,
                                    senderId: currentuser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL,
                                }),
                            });
                        });
                    }
                );
            } else {
                await updateDoc(doc(db, "chats", data.chatID), {
                    messages: arrayUnion({
                        id: uuidv4(),
                        text,
                        senderId: currentuser.uid,
                        date: Timestamp.now(),
                    }),
                });
            }
            await updateDoc(doc(db, "userChats", currentuser.uid), {
                [data.chatID + ".userInfo"]: {
                    uid: data.user.uid,
                    displayName: data.user.displayName,
                    photoURL: data.user.photoURL
                },
                [data.chatID + ".lastMessages"]: {
                    text: text ? text : "Photo",
                },
                [data.chatID + ".date"]: serverTimestamp()
            });

            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatID + ".userInfo"]: {
                    uid: currentuser.uid,
                    displayName: currentuser.displayName,
                    photoURL: currentuser.photoURL
                },
                [data.chatID + ".lastMessages"]: {
                    text: text ? text : "Photo",
                },
                [data.chatID + ".date"]: serverTimestamp()
            })
            setText("");
            setImg(null);
        } catch (error) {
            console.log("Not update Something Wrong")
        }
    }
    return (
        <div className="flex flex-1 justify-between items-center shadow mt-auto rounded-md p-2 bg-[#060415]">
            <div className="flex justify-between items-center p-1 w-full">
                <div className="relative w-full">
                    <i className="absolute top-3 left-2 text-gray-400 text-lg font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-smile" viewBox="0 0 24 24">
                            <defs></defs>
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"></path>
                        </svg>
                    </i>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded-full pl-8 pr-12 py-3 focus:outline-none  h-auto placeholder-gray-100 bg-gray-900 text-white text-sm" placeholder="Type a message..." id="typemsg" />
                    <label>
                        <input type='file' accept="image/png,image/jpeg,image/gif" onChange={(e) => setImg(e.target.files[0])} className="hidden" />
                        <img className='absolute right-5 top-2 w-6 cursor-pointer' src={Img} alt="" />
                    </label>
                </div>
                <div className="w-7 h-7 rounded-full bg-blue-300 text-center items-center flex justify-center hover:bg-gray-900 hover:text-white p-1 mx-1">
                    <i className="fa-sharp fa-solid fa-microphone"></i>
                </div>
                <div className="w-7 h-7 rounded-full bg-blue-300 text-center items-center flex justify-center mx-1">
                    <button onClick={() => handleSubmit()} className="w-7 h-7 rounded-full text-center items-center flex justify-center focus:outline-none hover:bg-gray-900 hover:text-white p-1">
                        <i className="fa-solid fa-paper-plane transform rotate-45"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sender
