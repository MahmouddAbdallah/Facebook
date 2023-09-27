import { useCallback, useEffect, useState } from "react"
import CreatePost from "../components/CreatePost"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Stories from "../components/Stories"
import UploadPost from "../components/UploadPost"
import { Navigate } from "react-router-dom"
import PostsHome from "../components/PostsHome"
import { getUser } from "../utils/actions"
import { setUser } from "../redux/feature/user"
import { useDispatch } from "react-redux"
import Messanger from "../messanger/messanger"
const Home = () => {
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(false)
    const toggleUploadImage = () => {
        setToggle(!toggle)
    }
    const id = localStorage.getItem("userid")

    const user = useCallback(async () => {
        const user = await getUser(id)
        dispatch(setUser(user.data))
    }, [dispatch, id])
    useEffect(() => {
        user()
    }, [user])

    if (!id) {
        return <Navigate to="/" />
    } else {
        return (
            <div>
                <Navbar />
                <div className=" flex justify-center lg:justify-between">
                    <Sidebar />
                    <div className=" w-full sm:w-[500px] md:w-[550px] lg:w-[600px] space-y-3 ">
                        <Stories />
                        <CreatePost showUpload={toggleUploadImage} />
                        <PostsHome />
                    </div>
                    <Messanger />

                </div>
                <div
                    className={`${toggle ? "flex" : "hidden"} fixed top-0 left-0 w-full h-full bg-white/50  justify-center items-center z-50`}>
                    <UploadPost showUpload={toggleUploadImage} setToggle={setToggle} />
                </div>
            </div>
        )
    }
}

export default Home