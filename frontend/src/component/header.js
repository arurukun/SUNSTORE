import React from 'react'
import { Link } from 'react-router-dom'
import DropdownMenu from './Dropdown'

import {useDispatch,useSelector} from "react-redux"
import { logout } from '../action/userAction'



const Header = () => {
  const dispatch=useDispatch()
  const {userInfo}=useSelector((s)=>s.userLogin)
  // const list=["profile", "logout"]
  const logoutHandler=()=>{
    dispatch(logout())
  }
  // const handleSelectChange = (event) => {
  //   const selectedOption = event.target.value;
  //   if (selectedOption === "Logout") {
  //     logoutHandler();
  //   }
  // }
  return (
    <header>
      <div className='bg-yellow-500 text-white py-5 border-b-amber-900 border-b-2'>
        <div className='container flex justify-between'>
          <Link to="/">
          <h2 className='text-xl font-semibold text-amber-900 hover:text-amber-700 transition'>SUNSTORE</h2>
          </Link>
          <div className='flex space-x-8'>
            <Link to="/cart" className='text-xs flex self-center'><i className='fas fa-shopping-cart'></i> CART</Link>
            {userInfo ? 
            // <DropdownMenu header={userInfo.name} list={["Profile", "Logout"]} onChange={logoutHandler}/>
            // <select onChange={(e)=>e.target.value==="Logout" && logoutHandler()  } title={userInfo.name} className='bg-yellow-500'>
            <select onChange={(e)=>{if(e.target.value=="Profile"){window.location.href = "/profile"}else if(e.target.value=="Logout"){logoutHandler()}}  } title={userInfo.name} className='bg-yellow-500'>
              <option disable>{userInfo.name}</option>
              <option>Profile</option>
              <option>Logout</option>
            </select>            
            :
            <Link to="/login" className='text-xs flex self-center'><i className='fas fa-user'></i> SIGN IN</Link>
             }
             {userInfo && userInfo.isAdmin && (
              <select onChange={(e)=>{if(e.target.value=="Users"){window.location.href = "/admin/userlist"}else if(e.target.value=="Products"){window.location.href = "/admin/productlist"}else if(e.target.value=="Orders"){window.location.href = "/admin/orderlist"}}  } title="Admin" className='bg-yellow-500'>
                <option disable>Admin</option>
                <option>Users</option>
                <option>Products</option>
                <option>Orders</option>
              </select>
             )}
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header