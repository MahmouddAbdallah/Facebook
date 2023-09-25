import facebook from '../assets/facebook.svg'
import warning from '../assets/warning.png'
import Register from './Register'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = () => {
    const [toggle, setToggle] = useState(false)
    const [warnClass, setWarnClass] = useState("")
    const navigate = useNavigate();
    const id = localStorage.getItem("userid")


    const close = (e) => {
        e.preventDefault()
        setToggle(!toggle)
    }
    const errorMessage = (e) => {
        const value = e.target.value
        if (!value.includes("@")) {
            setWarnClass("warn")
        }
        else {
            setToggle("")
        }
    }
    const [data, setData] = useState({ email: "", password: "" })
    const loginAccount = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post("http://localhost:8000/auth/login", {
                email: data.email,
                password: data.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("userid", response.data.user._id)
            toast.success("register successfuly");
            navigate("/home")
        } catch (error) {
            toast.error(error.response.data.errors)
        }
    }
    if (id) {
        return <Navigate to={'/home'} />
    }
    else {
        return (
            <div className=" bg-bg h-screen ">
                <div className="flex flex-wrap justify-center items-center lg:mx-72 lg:h-screen ">
                    <div className='flex justify-center lg:justify-normal lg:w-8/12'>
                        <div className='flex flex-col justify-center lg:justify-normal w-96 lg:w-[90%] lg:mb-32'>
                            <div className='mx-auto lg:mx-0 lg:-ml-8'>
                                <img src={facebook} className=' w-[300px]' alt="facebook logo" />
                            </div>
                            <div className='text-center lg:text-left'>
                                <h4 className='text-[25px] w-auto leading-tight lg:text-[30px]'>
                                    Facebook helps you connect and share with the people in your life.
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center w-full lg:w-4/12 mt-12 lg:mt-0'>
                        <form className='bg-white py-3 px-4 rounded-md w-96 shadow-md'>
                            <div className='space-y-3'>
                                <div className=' relative'>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                                        onBlur={errorMessage}
                                        onFocus={() => {
                                            setWarnClass("")
                                        }}
                                        autoComplete='email'
                                        placeholder='Email address or phone number'
                                        className={`focus:outline-none px-2 py-3 w-full border ${warnClass == "warn" ? 'border-red-500' : 'focus:border-primary'} rounded focus:shadow-input`} />
                                    <div className={`${warnClass == "warn" ? "block mt-1" : "hidden"}`}>
                                        <p className=' text-red-500 text-xs font-500 tracking-tight leading-tight'>Either Email address or phone number is required</p>
                                    </div>
                                    <div className={`absolute top-3 right-2 ${warnClass == "warn" ? "block" : "hidden"}`}>
                                        <img src={warning} alt="warning image" className='w-6' />
                                    </div>
                                </div>
                                <input type="password"
                                    value={data.password}
                                    onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                                    placeholder='Password'
                                    className=' focus:outline-none px-2 py-3 w-full border focus:border-primary rounded focus:shadow-input' />
                            </div>
                            <div className='w-full mt-4 text-center border-b-2'>
                                <button
                                    onClick={loginAccount}
                                    className='text-xl font-semibold text-white bg-primary w-full rounded-md py-2'>Log in</button>
                                <p className=' text-primary text-sm font-500 pt-3 pb-5'>
                                    Forrgotten password?
                                </p>
                            </div>
                            <div className='w-full my-4 flex justify-center'>
                                <button onClick={close} className='text-lg font-500 text-white bg-greenColor hover:bg-greenHover rounded-md py-2 px-4'>Create new account</button>
                            </div>
                        </form>
                        <div className=' mt-10'>
                            <p className='text-sm whitespace-nowrap'><span className='font-semibold tracking-tight '>Create a Page</span> for a celebrity, brand or business.</p>
                        </div>
                    </div>
                </div>
                <div className={`fixed w-screen h-screen top-0 left-0 ${toggle ? 'flex' : "hidden"} justify-center items-center bg-white/60`}>
                    <Register close={close} />
                </div>
            </div>
        )
    }
}

export default Login