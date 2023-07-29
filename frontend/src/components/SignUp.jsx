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
            console.log('Something went wrong' + error.message);
        }
    }

    return (
        <div className="signup">
            <section className="text-gray-600 body-font relative">
                <div className="w-fit mx-auto mt-8 border-t border-gray-200 text-center">
                    <GoogleLogin
                        onSuccess={(data) => {
                            handleSuccess(data);
                        }}
                        onError={() => {
                            toast.error('Login Failed');
                        }}
                    />
                </div>
            </section>
        </div>
    )
}

export default SignUp