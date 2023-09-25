import { GrLogout } from 'react-icons/gr'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../redux/feature/user'

const LogoutCard = () => {
    const { _id, picture, first_name, last_name } = useSelector((state) => state.user.data)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    return (
        <div className=' bg-white  w-80  shadow-xl border rounded-md'>
            <Link to={`/profile/${_id}`}>
                <div className='p-1 m-2 shadow-lg border rounded-md'>
                    <div className='flex gap-2 items-center hover:bg-black/10 p-1 rounded-md duration-300 mb-4  '>
                        <div className=' w-10 h-10 rounded-full overflow-hidden'>
                            {
                                picture
                                    ? <img className='w-10 h-10' src={`http://localhost:8000/${picture}`} alt="" />
                                    : <div className='flex justify-center animate-pulse'> <div className=' w-10 h-10  bg-slate-200 rounded-full'></div></div>
                            }
                        </div>
                        <div className='flex justify-center'>
                            {
                                first_name
                                    ? <h4>{first_name + " " + last_name}</h4>
                                    : <div className='flex justify-center animate-pulse'> <div className=' w-44 h-3  bg-slate-200 rounded-full'></div></div>
                            }
                        </div>
                    </div>
                </div>
            </Link>
            <div className='px-3 py-2 '>
                <button
                    onClick={() => {
                        dispatch(logOut())
                        navigate("/")
                    }}
                    className='w-full hover:bg-black/10 py-2 rounded-md duration-300 flex items-center gap-2 px-2'>
                    <GrLogout size={20} />
                    <span className='font-500'>
                        log out
                    </span>
                </button>
            </div>
        </div>
    )
}

export default LogoutCard