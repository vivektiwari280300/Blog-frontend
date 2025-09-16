import React from 'react'
import { Outlet } from 'react-router-dom'
import { assets } from '../../assets/assets'
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';


const Layout = () => {

  const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate('/');
  }

  return (
    <>
      {/* Admin Navbar */}
      <div className=' flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img onClick={() => navigate('/')} src={assets.diyalogo} alt="Logo"
          className=' w-32 sm:w-40 cursor-pointer' />
        <button onClick={logout}
          className=' text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>
          LogOut
        </button>
      </div>
      {/* SideBar */}
      <div className=' flex h-[calc(100vh-70px)]'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default Layout