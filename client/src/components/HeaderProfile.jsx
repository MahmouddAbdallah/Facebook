import PropTypes from 'prop-types'
import { SlArrowDown } from 'react-icons/sl'
import { AiFillCamera } from 'react-icons/ai'
import { useEffect, useState, useRef, useCallback } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import { ProviderState } from '../context/ProviderContext'


const HeaderProfile = ({ profileUserId, picture, cover, first_name, last_name, loading }) => {
    const [selectFile, setSelecteFile] = useState("")
    const [image, setImage] = useState("")
    const btn = useRef()
    const { userId } = ProviderState()


    const changePicture = (e) => {
        const File = e.target.files[0];
        const imageURL = URL.createObjectURL(File)
        setImage(imageURL)
        setSelecteFile(File);
    }

    const uploadPicture = useCallback(async () => {
        try {
            const formData = new FormData()
            formData.append("picture", selectFile)
            await axios.put(`http://localhost:8000/api/user/${userId}`, formData)
            setImage("")
        } catch (error) {
            console.error(error);
        }
    }, [userId, selectFile])

    const handelClickInput = () => {
        document.getElementById("changePicture").click();
    }

    useEffect(() => {
        const button = btn.current
        button.addEventListener('click', handelClickInput)
        return () => {
            button.removeEventListener("click", handelClickInput)
        }
    }, [])

    return (
        <div className=" bg-black/5">
            <div className=" bg-white ">
                <div className="w-full h-44 sm:h-52 md:h-72 lg:h-96 ">
                    <img src={cover} alt="" className=" object-cover w-full rounded-b-lg" />
                </div>
                <div className='w-full md:my-5 flex flex-col items-center gap-3 md:flex-row md:justify-between md:h-28'>
                    <div className=' relative w-full'>
                        <div className='h-20 md:h-0 flex justify-center md:justify-start md:ml-8 '>
                            <button ref={btn} className=" absolute  -top-20 md:-top-28  border-white border-[4px] rounded-full">
                                {loading ? <img className=' w-36 h-36 md:w-40 md:h-40 rounded-full object-cover group-hover:scale-110 duration-300' src={`http://localhost:8000/${picture}`} alt="" /> :
                                    <div className='flex justify-center animate-pulse'> <div className='  w-36 h-36 bg-slate-200 rounded-full'></div></div>}
                                {
                                    profileUserId == userId &&
                                    <div className=' absolute -right-1 bottom-2 bg-black/70 p-2 rounded-full'>
                                        <AiFillCamera size={25} className='text-white' />
                                    </div>
                                }
                            </button>
                            <input onChange={changePicture} id='changePicture' type="file" className='hidden' />
                        </div>
                        <div className='md:w-fit md:ml-52 '>
                            <div className='text-center md:text-start'>
                                <h1 className={`font-500 text-2xl `}>{loading ? first_name + " " + last_name : ""}{!loading && <div className='flex justify-center animate-pulse'> <div className=' h-3 w-44 bg-slate-200 rounded-full'></div></div>}</h1>
                                <p className="text-gray-500  text-sm tracking-tight font-500">1.1 friends</p>
                            </div>
                        </div>
                    </div>
                    {
                        profileUserId == userId
                            ?
                            <div className='flex gap-3 h-fit'>
                                <button className='w-full whitespace-nowrap  py-[6px] px-3 rounded-md font-500 text-sm bg-primary text-white'>+ Add to stroy</button>
                                <button className='w-full whitespace-nowrap  py-[6px] px-3 rounded-md font-500 text-sm bg-black/10'>Edit profile</button>
                                <button className='w-[50%] whitespace-nowrap py-[6px] px-3 rounded-md bg-black/10 flex justify-center items-center'><SlArrowDown /></button>
                            </div>
                            :
                            <div className='flex gap-3 h-fit'>
                                <button className='w-full whitespace-nowrap  py-[6px] px-3 rounded-md font-500 text-sm bg-primary text-white'>Add friend</button>
                                <button className='w-full whitespace-nowrap  py-[6px] px-3 rounded-md font-500 text-sm bg-black/10'>Message</button>
                                <button className='w-[50%] whitespace-nowrap py-[6px] px-3 rounded-md bg-black/10 flex justify-center items-center'><SlArrowDown /></button>
                            </div>
                    }
                </div>
                <div className='flex justify-between mx-3'>
                    <ul className=' flex w-full lg:w-[40%] '>
                        <li className='w-full text-center border-b-[3px] py-2 font-500 text-sm text-primary border-primary'>Posts</li>
                        {
                            [
                                {
                                    id: "1",
                                    name: "About",
                                    href: "/about"
                                },
                                {
                                    id: '2',
                                    name: "Friends",
                                    href: "/about"
                                },
                                {
                                    id: "3",
                                    name: "Photots",
                                    href: "/about"
                                },
                                {
                                    id: "4",
                                    name: "More",
                                    href: "/about"
                                }
                            ].map((items) => {
                                return (
                                    <div className='w-full' key={items.id}>
                                        <li className='w-full text-center py-2 font-500 text-sm text-black/50'>{items.name}</li>
                                    </div>
                                )
                            })
                        }
                    </ul>
                    <div  >
                        ...
                    </div>
                </div>
            </div>
            {image &&
                <div className='fixed h-full w-full top-0 left-0 bg-white/80 flex justify-center items-center'>
                    <div className='bg-white py-5 px-8 rounded-md shadow-lg'>
                        <div>
                            <div className='border-b mb-5'>
                                <div className='flex p-2'>
                                    <div className='flex-1'>
                                        <h1 className="text-center font-bold">
                                            Upload Image
                                        </h1>
                                    </div>
                                    <button onClick={() => {
                                        setImage("")
                                    }} >
                                        <AiOutlineClose />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='w-96 h-96 rounded-full overflow-hidden'>
                            <img src={image} className='shadow-lg object-cover w-96 h-96' alt="" />
                        </div>
                        <button onClick={uploadPicture} className=' w-full bg-primary py-1 font-500 text-white rounded-md mt-5'>
                            Upload
                        </button>
                    </div>
                </div>
            }
        </div >
    )
}

HeaderProfile.propTypes = {
    profileUserId: PropTypes.string,
    picture: PropTypes.string,
    cover: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    loading: PropTypes.bool
}

export default HeaderProfile
