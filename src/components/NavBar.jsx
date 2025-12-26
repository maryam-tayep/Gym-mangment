import React from 'react'

export default function NavBar() {
  return (
    <>
      <nav
        className="navbar bg-white  position-fixed top-0 end-0"
        style={{ left: '260px', height: '70px' }}>
        <div className="container-fluid">
          <ul className='d-flex align-items-center justify-content-between w-100 list-unstyled mb-0'>
            
            <li className='mt-2'>
              <h3 className='mb-0' >Admin Dashboard</h3>
              <p className='text-muted mb-0  '>Welcome back! Here's an overview of your gym.</p>
            </li>


            <div className='d-flex align-items-center justify-content-between '>
              <li>
                <img style={{
                  width: "40px", height: "40px", borderRadius: "50%"
                }} src='../public/image/Starter pfp.jpg' />
              </li>
              <div >
                <h6 className='mb-0 mt-4 '>Admin User</h6>
                <p className='text-muted fs-6'>admin@gmail.com</p>
              </div>
            </div>
          </ul>
          <hr className='w-100' />
        </div>

      </nav>

    </>
  )
}
