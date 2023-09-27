import { createSlice } from "@reduxjs/toolkit";

const post = createSlice({
    name: "post",
    initialState: {
        posts: [],
        like: [],
        comments: [],
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
            // console.log(state.posts.data[0]);
        },
        addPost: (state, action) => {
            const posts = state.posts.data
            posts.unshift(action.payload)
        },
        addlike: {
            reducer: (state, action) => {
                state.posts.data.map((post) => {
                    if (post._id == action.payload.postId) {
                        post.like = action.payload.like
                    }
                })

            },
            prepare: (postId, like) => {
                return {
                    payload: {
                        like,
                        postId
                    }
                }
            }
        },
    }
})
export const { setPosts, addPost, addlike } = post.actions
export default post.reducer