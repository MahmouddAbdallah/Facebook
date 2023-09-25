import { useDispatch, useSelector } from "react-redux"
import Post from "./Post"
import { useCallback, useEffect } from "react"
import { getPosts } from "../utils/actions"
import { setPosts } from "../redux/feature/post"

const PostsHome = () => {
    const post = useSelector((state) => state.post.posts.data)
    const dispatch = useDispatch()
    const id = localStorage.getItem("userid")

    const posts = useCallback(async () => {
        const data = await getPosts()
        dispatch(setPosts(data))
    }, [dispatch])
    useEffect(() => {
        posts()
    }, [posts])

    return (
        <div className="space-y-10">
            {post?.map((items) => {
                return (
                    <div key={items?._id}>
                        <Post
                            className={'sm:w-[500px] md:w-[550px] lg:w-[600px]'}
                            id={items?._id}
                            like={items?.like}
                            photo={items?.photo}
                            title={items?.title}
                            picture={items?.user.picture}
                            first_name={items?.user.first_name}
                            last_name={items?.user.last_name}
                            userId={items?.user._id}
                            userThatLikedThePost={id}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default PostsHome