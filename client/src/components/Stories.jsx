import { AiFillPlusCircle } from 'react-icons/ai'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import Story from './Story'
import { useSelector } from 'react-redux'
const Stories = () => {
    const { picture } = useSelector((state) => state.user.data)

    const arrowLeft = () => {
        document.getElementById("story").scrollLeft -= 200
    }
    const arrowRight = () => {
        document.getElementById("story").scrollLeft += 200
    }
    return (
        <div>
            <div className=' relative'>
                <button onClick={arrowLeft} className=' absolute top-28 left-2 bg-white p-2 rounded-full z-30 opacity-50 hover:opacity-100 duration-300'>
                    <SlArrowLeft size={25} />
                </button>
                <button onClick={arrowRight} className=' absolute top-28 right-2 bg-white p-2 rounded-full z-30 opacity-50 hover:opacity-100 duration-300'>
                    <SlArrowRight size={25} />
                </button>
                <div id='story' className='flex gap-2 overflow-y-scroll stories'>
                    <div>
                        <div className='w-36 rounded-lg overflow-hidden group'>
                            <div className=' w-36 h-52 overflow-hidden'>

                                {
                                    picture
                                        ? <img className=' w-36 h-56 object-cover group-hover:scale-110 duration-300' src={`http://localhost:8000/${picture}`} alt="" />
                                        : <div className='flex justify-center animate-pulse'> <div className='w-36 h-56  bg-slate-200 '></div></div>
                                }
                            </div>
                            <div className='text-center bg-white py-2'>
                                <div className='flex justify-center relative py-2'>
                                    <div className=' absolute bottom-2 bg-white rounded-full'>
                                        <AiFillPlusCircle size={32} className='text-primary' />
                                    </div>
                                </div>
                                <h6 className='text-xs font-[600]'>Create story</h6>
                            </div>
                        </div>
                    </div>
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                </div>
            </div>
        </div>
    )
}

export default Stories