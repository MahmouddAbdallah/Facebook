/* eslint-disable react/prop-types */
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { IoMdPhotos } from 'react-icons/io'
import { BiHappyAlt } from 'react-icons/bi'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const CreatePost = ({ showUpload }) => {
    const { _id, picture, first_name } = useSelector((state) => state.user.data)

    return (
        <div>
            <div className="p-3  bg-white">
                <div className="flex flex-col justify-center gap-3 w-full">
                    <div className="flex items-center gap-3">
                        <div>
                            <div className='w-9 h-9 rounded-full overflow-hidden'>
                                <Link to={`/profile/${_id}`}>

                                    {picture ? <img className=' w-9 h-9  object-cover group-hover:scale-110 duration-300' src={`http://localhost:8000/${picture}`} alt="" />
                                        : <div className='flex justify-center animate-pulse'> <div className=' w-9 h-9  bg-slate-200 rounded-full'></div></div>
                                    }
                                </Link>
                            </div>
                        </div>
                        <form className="w-full">
                            <input type="text" placeholder={`What's on your mind, ${first_name} ?`} className=" rounded-full bg-gray-200 w-full py-2 px-3 focus:outline-none  placeholder:text-sm placeholder:font-500 placeholder:text-black/40" />
                        </form>
                    </div>
                    <div className=" w-full h-[1px] rounded-full bg-black/10"></div>
                </div>
                <div className="flex mt-3">
                    <button onClick={showUpload} className=" hover:bg-black/10 w-full py-2 rounded-lg flex gap-1 items-center justify-center">
                        <BsFillCameraVideoFill size={25} className=' text-videosColor' />
                        <span className=' text-sm font-500 md:text-md whitespace-nowrap'>Live video</span>
                    </button>
                    <button onClick={showUpload} className=" hover:bg-black/10 w-full py-2 rounded-lg flex gap-1 items-center justify-center">
                        <IoMdPhotos size={25} className=' text-photosColor' />
                        <span className=' text-sm font-500 md:text-md whitespace-nowrap'> photo/video</span>
                    </button>
                    <button onClick={showUpload} className=" hover:bg-black/10 w-full py-2 rounded-lg flex gap-1 items-center justify-center">
                        <BiHappyAlt size={25} className='text-happyColor' />
                        <span className=' text-sm font-500 md:text-md whitespace-nowrap'>Feeling/activity</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
CreatePost.prototype = {
    showUpload: PropTypes.func.isRequired
}
export default CreatePost