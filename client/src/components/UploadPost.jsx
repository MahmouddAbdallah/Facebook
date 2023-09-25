/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AiOutlineClose, AiOutlineCloudUpload } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { headers } from '../utils/actions'
import { useSelector, useDispatch } from 'react-redux'
import { addPost } from '../redux/feature/post'
const UploadPost = ({ showUpload, setToggle }) => {
    const { picture, first_name, last_name } = useSelector((state) => state.user.data)
    const [selected, setSelected] = useState("")
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const dispatch = useDispatch();
    const id = localStorage.getItem('userid')

    const handelChangeInputFile = (e) => {
        const selecteFile = e.target.files[0]
        const createImageUrl = URL.createObjectURL(selecteFile)
        setImage(createImageUrl);
        setSelected(selecteFile)
    }

    const uploadPost = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData()
            formData.append("photo", selected)
            formData.append("title", title)
            formData.append("user", `${id}`)
            const { data } = await axios.post(`http://localhost:8000/api/post`, formData, { headers })
            console.log(data.data);
            dispatch(addPost(data.data))
            setToggle(false)
        } catch (error) {
            console.error(error);
        }
    }
    const clickFile = (e) => {
        e.preventDefault()
        const inp = document.getElementById("readFile")
        inp.click()
    }
    useEffect(() => {
        const button = document.getElementById("clickReadFile")
        button.addEventListener('click', clickFile)
        return () => {
            button.removeEventListener("click", clickFile)
        }
    }, [])
    return (
        <div>
            <div className=" bg-white  rounded-md w-[420px] sm:w-[500px] md:w-[550px] lg:w-[600px] mt-10 mb-10">
                <div className='border-b'>
                    <div className='flex p-2'>
                        <div className='flex-1'>
                            <h1 className="text-center font-bold">
                                Create post
                            </h1>
                        </div>
                        <button onClick={() => {
                            showUpload()
                            setImage("")
                        }}>
                            <AiOutlineClose />
                        </button>
                    </div>
                </div>
                <div className='p-3'>
                    <div className="flex gap-2">
                        <div>
                            {
                                picture ?
                                    <img className=' w-10 h-10 rounded-full object-cover group-hover:scale-110 duration-300' src={`http://localhost:8000/${picture}`} alt="" />
                                    : <div className='flex justify-center animate-pulse'> <div className=' w-10 h-10  bg-slate-200 rounded-full'></div></div>
                            }
                        </div>
                        <div>
                            {
                                first_name
                                    ? <h4 className=" text-sm font-500">{first_name + " " + last_name}</h4>
                                    : <div className='flex justify-center animate-pulse'> <div className=' w-44 h-3  bg-slate-200 rounded-full'></div></div>
                            }
                        </div>
                    </div>
                    <form>
                        <div>
                            <input
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                                type="text" placeholder={`What's on your mind,${first_name} ?`} className=' w-full placeholder:text-sm focus:outline-none p-2' />
                        </div>
                        <div>
                            {image ? <div>
                                <img src={image} alt="" className='h-96' />
                            </div> :
                                <div className='relative w-full h-[160px] sm:h-[250px] md:h-[290px] lg:h-[300px]   p-2 flex justify-center items-center '>
                                    <input onChange={handelChangeInputFile} id="readFile" accept="image/*,image/heif,image/heic,video/*,video/mp4,video/x-m4v,video/x-matroska,.mkv" type="file" className='hidden' />
                                    <button id="clickReadFile" className='ring-1 ring-black/10 ring-offset-4 rounded-md absolute w-[90%] h-[90%] flex justify-center items-center bg-black/5'>
                                        <AiOutlineCloudUpload size={30} className=' text-blue-500' />
                                    </button>
                                </div>}
                        </div>
                        <div className='mt-2'>
                            <button
                                onClick={uploadPost}
                                className='bg-primary text-white w-full rounded-md py-1'>Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
UploadPost.prototype = {
    showUpload: PropTypes.func.isRequired
}
export default UploadPost