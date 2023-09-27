import PropTypes from 'prop-types'
import { useContext, createContext } from 'react'

const CreateProvider = createContext()
export const ContextProvider = ({ children }) => {
    const userId = localStorage.getItem("userid")
    const TOKEN = localStorage.getItem("token")

    return (
        <CreateProvider.Provider value={{ userId, TOKEN }}>
            {children}
        </CreateProvider.Provider>
    )
}
ContextProvider.propTypes = {
    children: PropTypes.element.isRequired
}
export const ProviderState = () => {
    return useContext(CreateProvider);
}
