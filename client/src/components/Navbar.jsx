import { AiOutlineSearch, AiFillHome } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { IoMdNotifications } from 'react-icons/io'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { BiSolidMessageRoundedMinus } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import LogoutCard from './LogoutCard'
import { useCallback, useEffect, useState } from 'react'
import { getData } from '../utils/actions'
import { useSelector } from 'react-redux'
const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const [keyword, setKeyword] = useState("");
    const [searchUser, setSearchUser] = useState([]);
    const [showSearchInput, setShowSearchInput] = useState(true)
    const { picture } = useSelector((state) => state.user.data)

    const search = useCallback(async () => {
        try {

            const { data } = await getData(`/api/user?keyword=${keyword}&fields=picture first_name last_name _id`)
            setSearchUser(data);
            if (keyword == "") {
                setSearchUser([])
            }
        } catch (error) {
            console.log(error);
        }
    }, [keyword])
    useEffect(() => {
        search()
    }, [keyword, search])

    return (
        <nav className={`flex py-2 justify-between w-full bg-white shadow-md sticky top-0 z-40 lg:px-4 ${showSearchInput ? "px-4" : "pr-4"}`}>
            <div className={`flex items-center  ${showSearchInput ? "gap-5" : "gap-0"}`}>
                <div><Link to="/home" ><BsFacebook size={35} className={`text-primary lg:block ${showSearchInput ? "block" : "hidden"}`} /></Link></div>
                <div className='flex'>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setShowSearchInput(!showSearchInput)
                        }}
                        className={`
                        bg-black/10 p-2 rounded-full
                        hover:bg-black/20 duration-300 
                        block lg:hidden ${showSearchInput ? "block" : "hidden"}`}
                    >
                        <AiOutlineSearch size={20} />
                    </button>

                    <form >

                        <div className={`${showSearchInput ? "hidden" : "flex gap-3 px-2 bg-white"}`}>
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    setShowSearchInput(!showSearchInput)
                                }}
                                className=' lg:hidden'
                            >

                                <HiOutlineArrowNarrowLeft size={15} />
                            </button>
                            <div className='relative'>
                                <div className={`absolute lg:flex ${showSearchInput ? "hidden" : "flex"} items-center h-full left-2`}>
                                    <AiOutlineSearch size={18} className='text-black/60' />
                                </div>
                                <input
                                    value={keyword}
                                    onChange={(e) => { setKeyword(e.target.value) }}
                                    type="text"
                                    placeholder='Search Facebook'
                                    className={
                                        `w-56 peer border pl-7 py-1 rounded-full 
                                            focus:outline-none placeholder:text-sm 
                                            placeholder:text-black/60 lg:block `
                                    }
                                />
                                <div className=' absolute top-11 px-2 py-1  w-full bg-white hidden peer-focus:block hover:block rounded-b-md'>
                                    {
                                        !keyword &&
                                        < div className=' text-center'>
                                            <h6 className='text-sm text-black/50'>No recent searches</h6>
                                        </div>
                                    }
                                    <div>
                                        <ul className='space-y-3'>
                                            {searchUser?.map((items) => {
                                                return (
                                                    <li key={items._id}>
                                                        <Link to={`/profile/${items._id}`}>
                                                            <div className='flex items-center gap-2'>
                                                                <div >
                                                                    <img
                                                                        className=' h-8 w-8 rounded-full object-cover'
                                                                        src={`http://localhost:8000/${items.picture}`}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h5>
                                                                        {items.first_name + " " + items.last_name}
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>
            </div >
            <div className='md:flex items-center gap-5 hidden'>
                <button className=''><AiFillHome size={25} className='text-primary' /></button>
            </div>
            <div className='flex items-center gap-5'>
                <button className=' bg-black/10 p-1 rounded-full hover:bg-black/20 duration-300'><IoMdNotifications size={25} /></button>
                <button className=' bg-black/10 p-1 rounded-full hover:bg-black/20 duration-300'><BiSolidMessageRoundedMinus size={25} /></button>
                <button
                    onClick={() => {
                        setToggle(!toggle)
                    }}
                    className='w-10 h-10 rounded-full overflow-hidden'>
                    {picture ? <img className='w-10 h-10 object-cover' src={`http://localhost:8000/${picture}`} alt="" />
                        : <div className='flex justify-center animate-pulse'> <div className=' w-10 h-10  bg-slate-200 rounded-full'></div></div>
                    }
                </button>
            </div>
            {
                toggle &&
                <div className='absolute top-12 right-0'>
                    <LogoutCard />
                </div>
            }
        </nav >
    )
}

export default Navbar