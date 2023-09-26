import React from 'react'
import Image from "next/image";
import { useRouter } from "next/router";


import bg from '../../public/bg_signup.jpg';

import Google from '@/icon/Google';
import Eye from '@/icon/Eye';
import EyeSlash from '@/icon/EyeSlash';

interface SignupFormProps {
    credentials: {
        name: string;
        email: string;
        password: string;
        showPassword: boolean;
        role: string;
    };
    setCredentials: (credentials: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleGoogleSubmit: () => void;
    handleShowPassword: () => void;
}

const SignupForm = ({ credentials, setCredentials, handleSubmit, handleShowPassword, handleGoogleSubmit }: SignupFormProps) => {

    const router = useRouter();
    const { name, email, password, role, showPassword } = credentials;

    return (
        <section className=" bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="mt-1 bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="md:block hidden w-1/2 ">
                    <Image className="rounded-2xl object-cover" src={bg} alt="Login image" />
                </div>
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-[#002D74]">Sign up</h2>
                    <p className="text-xs mt-4 text-[#002D74]">
                        Browse various Rudraksh, Sphatik
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            className="p-2 mt-4 rounded-xl border"
                            type="name"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                        />
                        <select
                            className="p-2 pr-9 block w-full border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                            value={role}
                            onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
                        >
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>
                        <input
                            className="p-2 rounded-xl border"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        />
                        <div className="relative">
                            <input
                                className="p-2 rounded-xl border w-full"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            />

                            <svg
                                onClick={handleShowPassword}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="gray"
                                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                                viewBox="0 0 16 16"
                            >
                                {showPassword ? <EyeSlash />:<Eye /> }
                            </svg>
                        </div>

                        <button
                            type="submit"
                            className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                        >
                            Sign up
                        </button>
                    </form>

                    <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-400" />
                    </div>

                    <button onClick={() => handleGoogleSubmit()} className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
                        <Google />
                        Login with Google
                    </button>

                    <div className="mt-3 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                        <a href="#">Forgot your password?</a>
                    </div>

                    <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                        <p>ALready have an account?</p>
                        <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                            onClick={() => { router.push('./Login') }}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default SignupForm