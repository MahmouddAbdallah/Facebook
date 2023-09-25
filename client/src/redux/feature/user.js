import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: []
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.data = action.payload
        },
        logOut(state) {
            state.data = "";
            localStorage.clear()
        }
    }
})
export const { setUser, logOut } = userSlice.actions
export default userSlice.reducer