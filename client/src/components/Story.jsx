
const Story = () => {
    return (
        <div>
            <div className='w-36 rounded-lg overflow-hidden relative group'>
                <div className=' w-36 h-64 overflow-hidden relative'>
                    <div className=" absolute z-10 top-2 left-2 rounded-full overflow-hidden border-primary border-4">
                        <img className="w-9 h-9 object-cover " src="https://images2.minutemediacdn.com/image/fetch/https%3A%2F%2Ftherealchamps.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2017%2F07%2F947096288.jpeg" alt="" />
                    </div>
                    <img className=' w-36 h-64 object-cover group-hover:scale-110 duration-300' src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRnXB0Z-Z_IfdLilDUsP2H3m_Ce68gZS1uU3Xdr-dlCYUxz6dVVGVq47uXLr8BFdHg3du51HppF15uCFis" alt="" />
                </div>
                <div className=" absolute bottom-1 left-2">
                    <h6 className='text-xs font-[600] text-white'>Create story</h6>
                </div>
            </div>
        </div>
    )
}

export default Story