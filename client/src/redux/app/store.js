import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../feature/user"
import postReducer from "../feature/post"

export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer
    }
})