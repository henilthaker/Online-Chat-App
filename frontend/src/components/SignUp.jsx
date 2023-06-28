import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import { useContext } from 'react';
import AccountContext from '../context/accountContext/AccountDetails';

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
    <div className="signup">
        <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Welcome to Chat App</h1>
            </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
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