import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import { Toaster } from "react-hot-toast"
import Home from './page/Home'
import Profile from './page/Profile'
function App() {
  return (
    <>
      <div className='w-ful bg-bg'>
        <Router>
          <Toaster
            position='bottom-right' />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profile?/:id' element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
