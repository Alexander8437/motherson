import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Quickstart from '../../pages/Quickstart/Quickstart'
import Dashboard from '../../pages/Dashboard/Dashboard'
import BodyHeader from '../bodyHeader/BodyHeader';

const Body = () => {
  return (
    <>
      <div className='body-navbar'>
        <BodyHeader />
      </div>
      <Routes>
        <Route path='' element={<Quickstart />} />
        <Route path='dashboard' element={<Dashboard />} />
        {/* <Route path='/myteams/invitation' element={<MyInvitation />} />
        <Route path='myTeams' element={<MyTeams />} /> */}
      </Routes>
    </>
  )
}

export default Body