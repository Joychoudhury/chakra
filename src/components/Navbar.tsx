import React, { useState } from 'react';
import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/router'

import Signin from '@/icon/Signin';
import Order from '@/icon/Order';
import logo from '../../public/logo.png'
import Cart from '@/icon/Cart';
import Admin from '@/icon/Admin';
import Alert from '@/pages/error/Alert';


const Navbar = () => {
    const router = useRouter()
    const { data: session, status } = useSession()


    const [error, setError] = useState({
        type: 'danger',
        message: '',
        visibility: false,
    });

    const { type, message, visibility } = error;

    const showError = (type: string, message: string) => {
        setError({
            type,
            message,
            visibility: true,
        });

        setTimeout(() => {
            setError(prevState => ({
                ...prevState,
                visibility: false,
            }));
        }, 500);
    };


    function NavItem(props: { children: React.ReactNode }) {
        const [open, setOpen] = useState(false);
        return (
            <li className='w-12 flex justify-center items-center'>
                <a
                    href="#"
                    className='rounded-full p-3 m-2 bg-[#F8F6F4] flex justify-center items-center transition duration-300 hover:brightness-75'
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    <svg
                        className='h-5 w-5 '
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        id="caret-down"
                    >
                        <rect width="256" height="256" fill="none"></rect>
                        <path
                            d="M215.39111,92.93848A8.00015,8.00015,0,0,0,208,88H48a8,8,0,0,0-5.65674,13.657l80,79.99976a7.99945,7.99945,0,0,0,11.31348,0l80-79.99976A8.00011,8.00011,0,0,0,215.39111,92.93848Z"
                        ></path>
                    </svg>
                </a>

                {open && props.children}
            </li>
        );
    }


    function DropdownMenu() {
        function DropdownItem(props: {
            children: React.ReactNode;
            icon?: React.ReactNode;
            handleClick?: () => void;
        }) {
            return (
                <a href='#' className='text-sm h-12 flex justify-between rounded-lg transition duration-300 p-3 hover:bg-[#AED2FF] gap-3' onClick={props.handleClick}>

                    {props.icon}
                    {props.children}

                </a>


            );
        }
        return (
            <div className="absolute bg-[#E4F1FF] overflow-hidden p-2 border-2 rounded-lg top-12 right-1 min-w-[60px] translate-x-[-1/2]" style={{ zIndex: 10 }} >


                {
                    (status === "authenticated") ?

                        (
                            <DropdownItem>
                                <span className='text-sm'>
                                    {session?.user?.email}
                                </span>

                            </DropdownItem>
                        )
                        :
                        (<DropdownItem icon={<Signin />} handleClick={() => { router.push('/auth/Login') }}>Log in</DropdownItem>)

                }
                <hr />
                {
                    (session?.user?.role === 'seller') &&
                    (
                        <DropdownItem icon={<Admin />} handleClick={() => { router.push('/Admin') }}>Admin panel</DropdownItem>
                    )
                }
                <DropdownItem handleClick={() => {
                    if (status === "authenticated")
                        router.push('/Cart')
                    else
                        showError('danger', 'Please login first')
                }} icon={<Cart />}>Cart</DropdownItem>
                <DropdownItem handleClick={() => {
                    if (status === "authenticated")
                        router.push('/Order')
                    else
                        showError('danger', 'Please login first')

                }} icon={<Order />}>Orders</DropdownItem>
                <hr />

                {
                    (status === 'authenticated') &&
                    (<DropdownItem handleClick={signOut} icon={<Signin />}>Logout</DropdownItem>)

                }


            </div>
        );
    }

    return (
        <>
            {visibility && <Alert type={type} message={message} />}

            <nav className='min-w-full  h-14 p-2 backdrop-blur-md border-b-4'>
                <ul className='max-w-full h-full flex justify-between items-center'>
                    <div onClick={() => router.push('/')} className="flex items-center h-12 cursor-pointer">
                        <img src={logo.src} className='max-h-full' alt="" />
                        <h1 className='text-2xl font-bold'>Chakra</h1>
                    </div>
                    <div className="flex align-center">
                        <NavItem>
                            <DropdownMenu></DropdownMenu>
                        </NavItem>
                    </div>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
