/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AiOutlineLike } from 'react-icons/ai'
import { BiMessageAlt, BiShare } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Post = ({ id, photo, title, picture, first_name, last_name, userId, like, className, userThatLikedThePost }) => {
    const addLike = async () => {
        try {

            const { data } = await axios.patch(`http://localhost:8000/api/post/like/${id}`, { userId: userThatLikedThePost })
        } catch (error) {
            console.error(error);
        }
    }
    console.log();
    return (
        <div className=''>
            <div className={`bg-white w-full ${className}  rounded-md overflow-hidden`}>
                <div className='flex items-center justify-between p-3'>
                    <Link to={`/profile/${userId}`}>
                        <div className="flex gap-2">
                            <div>
                                <img className=' w-9 h-9 rounded-full object-cover group-hover:scale-110 duration-300' src={`http://localhost:8000/${picture}`} alt="" />
                            </div>
                            <div>
                                <h4 className="title">{first_name + " " + last_name}</h4>
                                <p className="text-xs text-gray-500">15h</p>
                            </div>
                        </div>
                    </Link>
                    <div>
                        <button><BiDotsHorizontalRounded size={25} /></button>
                    </div>
                </div>
                <div className=' px-2'>
                    <h6 className='text-sm font-semibold'>{title}</h6>
                </div>
                <div className='w-full flex justify-center bg-black/10'>
                    <div className='w-[500px]'>
                        <img src={`http://localhost:8000/${photo}`}
                            alt=""
                            className=' w-[500px]'
                        />
                    </div>
                </div>
                <div>
                    <div className="flex mt-3 p-2">
                        <button
                            onClick={addLike}
                            className=" hover:bg-black/10 w-full py-2 rounded-lg flex gap-1 items-center justify-center">
                            <span className='text-sm mt-2 font-500'>{like?.length}</span>
                            <AiOutlineLike className={`${like.find(item => item.user._id == userThatLikedThePost) ? 'fill-blue-500' : ""}`} size={25} />
                            <span>Like</span>
                        </button>
                        <button className=" hover:bg-black/10 w-full py-2 rounded-lg flex gap-1 items-center justify-center">
                            <div>
                                <BiMessageAlt size={25} />
                            </div>
                            <span>Comment</span>
                        </button>
                        <button className=" hover:bg-black/10 w-full py-2 rounded-lg flex gap-1 items-center justify-center">
                            <BiShare size={25} />
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post