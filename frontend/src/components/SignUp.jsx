import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import { useContext } from 'react';
import AccountContext from '../context/AccountDetails';

const SignUp = () => {

  const { setAccount } = useContext(AccountContext);

  const handleSuccess = async (data) => {
    const decodeData = jwtDecode(data.credential);
    setAccount(decodeData);
    toast.success('Login Success');
    try {
        await fetch('http://localhost:4000/api/user/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'cors': 'no-cors'
            },
            body: JSON.stringify(decodeData)
        })
    } catch (error) {
        console.log('Something went wrong'+error.message);
    }
  }

  return (
    <div>
        <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Sign Up</h1>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
            <div className="relative">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            </div>
            <div className="p-2 w-1/2">
            <div className="relative">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            </div>
            <div className="p-2 w-full">
            <div className="relative">
                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Password</label>
                <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            </div>
            <div className="p-2 w-full">
            <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Sign Up</button>
            </div>
            <div className="p-2 w-fit mx-auto pt-8 mt-8 border-t border-gray-200 text-center">
                <GoogleLogin
                    onSuccess={(data) => {
                        handleSuccess(data);
                    }}
                    onError={() => {
                        toast.error('Login Failed');
                    }}
                />
            </div>
        </div>
        </div>
    </div>
    </section>
    </div>
  )
}

export default SignUp