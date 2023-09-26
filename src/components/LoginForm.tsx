import React from 'react'
import Image from "next/image";
import { useRouter } from "next/router";


import bg from '../../public/bg_login.jpg'
import Eye from '@/icon/Eye';
import EyeSlash from '@/icon/EyeSlash';
import Google from '@/icon/Google';


interface LoginFormProps {
    credentials: {
        email: string;
        password: string;
        showPassword: boolean;
    };
    setCredentials: (credentials: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleLogin: () => void;
    handleShowPassword: () => void;
}


const LoginForm = ({ credentials, setCredentials, handleShowPassword, handleLogin, handleSubmit }: LoginFormProps) => {

    const router = useRouter();
    const { email, password, showPassword } = credentials;

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
                    <p className="text-xs mt-4 text-[#002D74]">
                        Already a member, easily log in
                    </p>

                    <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
                        <input
                            className="p-2 mt-8 rounded-xl border"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        />
                        <div className="relative">
                            <input
                                className="p-2 rounded-xl border w-full"
                                type={showPassword ? "text" : "password"}
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
                                className={`bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer ${showPassword ? 'text-current' : 'text-gray'}`}
                                viewBox="0 0 16 16"
                            >
                                {showPassword ? <EyeSlash /> : <Eye />}
                            </svg>
                        </div>
                        <button
                            type="submit"
                            className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-400" />
                    </div>

                    <button onClick={() => handleLogin()} className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
                        <Google />
                        Login with Google
                    </button>

                    <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                        <a href="#">Forgot your password?</a>
                    </div>

                    <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                        <p>Don't have an account?</p>
                        <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300" onClick={() => router.push("./Signup")}>
                            Register
                        </button>
                    </div>
                </div>

                <div className="md:block hidden w-1/2">
                    <Image className="rounded-2xl" src={bg} alt="Login image" />
                </div>
            </div>
        </section>
    )
}

export default LoginForm