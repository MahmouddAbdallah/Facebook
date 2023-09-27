import HeaderProfile from "../components/HeaderProfile"
import Navbar from "../components/Navbar"
import { useParams } from "react-router-dom"
import { getUser } from "../utils/actions"
import { useCallback, useEffect, useState } from "react"
import IntroProfile from "../components/IntroProfile"
import PostsProfile from "../components/PostsProfile"
const Profile = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    const user = useCallback(async () => {
        const { data } = await getUser(id)
        setData(data)
        setLoading(true)
    }, [id])

    useEffect(() => {
        user()
    }, [user])

    return (
        <div className="">
            <div>
                <Navbar />
                <div className=" bg-white">
                    <div className="container mx-auto">
                        <div className=" mx-0 lg:mx-32">
                            <HeaderProfile
                                profileUserId={data._id}
                                loading={loading}
                                cover={data?.cover}
                                picture={data?.picture}
                                first_name={data?.first_name}
                                last_name={data?.last_name}
                            />
                        </div>
                    </div>
                </div>
                <div className=" mx-0 lg:mx-56 md:flex">
                    <IntroProfile />
                    <div className=" w-[90%] mx-auto mt-5">
                        <PostsProfile userId={id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile