
import React from 'react';


export default function Sidebar() {
  return (
    <div
      className="text-white position-fixed top-0 start-0 vh-100 p-4  text-start fw-bold border "
      style={{ width: '260px' }}>
      <div className="d-flex ">
        <i
          className="fa-solid fa-dumbbell me-2 "
          style={{
            fontSize: '23px',
            color: '#000',
            position: 'relative',
            top: "5px",
            // color: 'transparent',
            // WebkitTextStroke: '1.5px white'

          }}></i>
        <div>
          <h3 className="fw-bold  text-dark">GymFlow</h3>
          
          <p className='text-muted'>Admin Portal</p>
        </div>
      </div>
      <hr className='text-muted' />

      <ul className="nav nav-pills  mt-5 flex-column gap-3">
        <li className="nav-item">
          <a className="nav-link active text-muted " href="#">
            <i className="bi bi-house me-3"></i>
            Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-muted" href="#">
            <i className="bi bi-people me-3"></i>
            Members</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-muted" href="#">
            <i className="bi bi-person-check me-3"></i>
            Trainers</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-muted" href="#">
            <i className="bi bi-credit-card me-3"></i>
            Plans</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-muted" href="#">
            <i className="bi bi-calendar me-3"></i>
            Sessions</a>
        </li>
      </ul>
    </div>
  );
}



