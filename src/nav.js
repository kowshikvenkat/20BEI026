import React from 'react'
import { Routes, Route, Link, Outlet } from 'react-router-dom';
function Nav() {
  return (
    <div className='w-100 bg-warning d-flex justify-content-evenly
    '>
    <h3 className='text-primary'>IRCTC</h3>
     <Link className='btn btn-primary' to="/">HOME</Link>
     <Link className='btn btn-primary' to="/AllTrain">AllTrain</Link>
          <Link className='btn btn-primary' to="/SingleTrain">SingleTrain</Link>
    </div>
  )
}

export default Nav
