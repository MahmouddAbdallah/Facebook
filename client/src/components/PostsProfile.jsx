import { useCallback, useEffect, useState } from "react";
import { getDataById } from "../utils/actions"
import Post from './Post'
const PostsProfile = ({ userId }) => {
    const [post, setPost] = useState({})
    const id = localStorage.getItem("userid")
    const getPostsUser = useCallback(async () => {
        const data = await getDataById(`/api/user/${userId}/post`)
        setPost(data)
    }, [userId])
    useEffect(() => {
        getPostsUser()
    }, [getPostsUser])
    return (
        <div>
            <div className="space-y-10">
                {post?.data?.map((items) => (
                    <div key={items._id}>
                        <Post
                            id={items._id}
                            like={items.like}
                            photo={items.photo}
                            title={items.title}
                            picture={items.user.picture}
                            first_name={items.user.first_name}
                            last_name={items.user.last_name}
                            userId={items.user._id}
                            userThatLikedThePost={id}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostsProfile