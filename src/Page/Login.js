import React,{useState} from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth } from "../Firebase";
import { useNavigate } from 'react-router-dom';
import Applogo from '../Img/logo.png'
function Login() {
    const navigate = useNavigate();
    const [err, setErr] = useState(false);

    const handlesubmit = async(e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (error) {
            setErr(true)
        }
        
    }
    return (
        <section className="bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-white">
                    <img className="mr-2" src={Applogo} alt="logo" />
                </div>
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handlesubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                <input type="email" name="email" id="email" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
                            </div>
                            {err && <span className='text-[#ff000] text-xs'>Something went wrong</span>}
                            <button type="submit" className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Sign in</button>
                            <p className="text-sm font-light text-gray-400">
                                Don’t have an account yet? <a href="/Register" className="font-medium hover:underline text-blue-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
