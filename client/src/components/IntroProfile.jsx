const IntroProfile = () => {
    return (
        <div>
            <div className=" w-[90%] mx-auto">
                <div className=" mt-5 p-3 rounded-md bg-white">
                    <div>
                        <h3 className="text-lg font-bold">Intro</h3>
                    </div>
                    <div className="text-center">
                        <p className="text-xs font-500">Hi, I&#39;m a full stack developer with experience in building web applications using ReactJS and NodeJS ❤💚.</p>
                    </div>
                    <form>
                        <input type="text" className="hidden" />
                        <button className="text-black font-500 w-full py-2 bg-black/10 rounded-md mt-5" >Edit Bio</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default IntroProfile