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
            // console.log(state.posts.data[0].like);
        },
        addPost: (state, action) => {
            const posts = state.posts.data
            posts.unshift(action.payload)
        },
        addlike: {
            // reducer: (state, action) => {

            //     console.log(action.payload.id, action.payload.like);
            //     state.posts.data.map((item) => {

            //         item.like.push(...action.payload.like)
            //     })
            // },
            // prepare: (like, postId) => {
            //     return {
            //         payload: {
            //             like,
            //             postId
            //         }
            //     }
            // }
        },
    }
})
export const { setPosts, addPost, addlike } = post.actions
export default post.reducer