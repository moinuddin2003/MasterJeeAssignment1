import React, { useState } from 'react'
import { DragPreviewImage } from 'react-dnd';

function OtpInput() {

    const [otp, setOtp] = useState(['', '', '', ''])
    const [status, setStatus] = useState('empty')
    const [message, setMessage] = useState('')

    const handleChange = (value, index) => {
        if (/^[0-9]$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value !== '' && index < 3) {
                document.getElementById(`otp - ${index + 1}`).focus()
            }

            setStatus('filling');
        }   
    };
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                document.getElementById(`otp - ${index - 1}`).focus();
                const newOtp = [...otp];
                newOtp[index - 1] = '';
                setOtp(newOtp);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const correctOtp = '1234'

        if (otp.join('') === correctOtp)
        {
            setStatus('success')
            setMessage('Account Verified')
        }
        else 
        {
            setStatus('error')
            setMessage('Invalid OTP')
        }
    };

    return (
        <>
            
            <h1 className='flex justify-center items-center text-5xl text-white  m-6'>Chai Aur Code</h1>
            <div className='flex items-center justify-center'>
                <div className='bg-white p-8 rounded-lg shadow-5xl w-full max-w-md text-center'>
                    <h2 className=" bg-white text-xl font-bold mb-4">Mobile Phone Verification</h2>
                    <p className=' bg-white mb-6 text-gray-600'>Enter the 4-digit verification code that was sent to your phone number.</p>
                    <form onSubmit={handleSubmit} className=" bg-white flex flex-col items-center space-y-4">
                        <div className=" bg-white flex space-x-5 mb-6">
                            {otp.map((digit, index) =>
                            (
                                <input
                                    key={index}
                                    id={`otp - ${index}`}
                                    type='text'
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="bg-slate-300 w-12 h-12 text-center text-2xl border  rounded-md focus:outline-none focus:ring-2"
                                    />
                            ))}
                        </div>
                        <button
                            type='submit'
                            className={`px-20 py-2 rounded-md focus:outline-none focus:ring-2 ${status === 'success' ? 'bg-green-500 text-white' : status === 'error' ? 'bg-red-500 text-white' : 'bg-slate-600 text-white hover:bg-slate-700'}`}
                        >
                            {status === 'success' ? 'Verified' : status === 'error' ? 'Incorrect OTP' : 'Verify Account'}
                        </button>

                        <p className='mt-4 bg-white text-gray-600'>
                            Didn't receive code? <a href="#" className="text-blue-500 bg-white hover:underline">Resend</a>
                        </p>

                    </form>


                    {/* {status === 'error' && <p className="mt-4 text-red-600 bg-white">{message}</p>}
                    {status === 'success' && <p className="mt-4 text-green-500 bg-white">{message}</p>}
                    {status === 'filling' && <p className="mt-4 text-green-500 bg-white">{status}</p>} */}
                </div>
            </div>
            <img className="ml-auto" src="./src/assets/chai.png" alt="logo" />
        </>
    );
}
export default OtpInput;