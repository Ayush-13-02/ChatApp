import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from "react-router-dom";
function Register() {
    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.value);
        const displayName = e.target[0].value;
        const file = e.target[1].files[0];
        const email = e.target[2].value;
        const password = e.target[3].value;
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);


            uploadTask.on(
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        try {
                            //Update profile
                            await updateProfile(res.user, {
                                displayName,
                                photoURL: downloadURL,
                            });
                            //create user on firestore
                            await setDoc(doc(db, "users", res.user.uid), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL,
                            });

                            //create empty chats for new user
                            await setDoc(doc(db,"userChats",res.user.uid),{}) 
                            navigate('/')
                        } catch (err) {
                            console.log(err);
                            setErr(true);
                            setLoading(false);
                        }
                    });
                }
            );
        } catch (error) {
            console.log(err);
            setErr(true);
            setLoading(false);
        }

    }
    return (
        <section className="bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    ChatApp
                </a>
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Create your account in ChatApp
                        </h1>
                        <form onSubmit={handlesubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Name</label>
                                <input type="text" name="name" id="name" className="border  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Upload your Image</label>
                                <input type="file" name="userimg" id="userimg" className="border  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                <input type="email" name="email" id="email" className=" border  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className=" border  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
                            </div>
                            {err && <span className='text-[#ff000] text-xs'>Something went wrong</span>}
                            <button type="submit" className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Sign Up</button>
                            <p className="text-sm font-light text-gray-400">
                                Don’t have an account yet? <a href="/Login" className="font-medium hover:underline text-blue-500">Sign in</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
