/* eslint-disable react/prop-types */
import { useContext, createContext, useEffect, useCallback } from 'react'
import { getUser } from '../utils/actions'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/feature/user'
const CreateProvider = createContext()

export const Provider = ({ children }) => {
    const dispatch = useDispatch()
    const id = localStorage.getItem("userid")

    const user = useCallback(async () => {
        const user = await getUser(id)
        dispatch(setUser(user.data))
    }, [dispatch, id])
    useEffect(() => {
        user()
    }, [user])

    return (
        <CreateProvider.Provider value={{ id }}>
            {children}
        </CreateProvider.Provider>
    )
}
export function ContextProvider() {
    return useContext(CreateProvider);
}
