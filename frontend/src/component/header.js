import React from 'react'
import { Link } from 'react-router-dom'

const header = () => {
  return (
    <header>
      <div className='bg-yellow-500 text-white py-5 border-b-amber-900 border-b-2'>
        <div className='container flex justify-between'>
          <Link to="/">
          {/* <Link to="https://google.com"> */}
          <h2 className='text-xl font-semibold text-amber-900 hover:text-amber-700 transition'>SUNSTORE</h2>
          </Link>
          <div className='flex space-x-8'>
            <Link to="/cart" className='text-xs'><i className='fas fa-shopping-cart'></i> CART</Link>
            <Link to="/user" className='text-xs'><i className='fas fa-user'></i> SIGN IN</Link>
          </div>
        </div>

      </div>
    </header>
  )
}

export default header