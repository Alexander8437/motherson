import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../pages/Dashboard/Dashboard'
import Body from '../body/Body'
import MyTeamsTab from '../myTeamsTab/MyTeamsTab'
import MyTeams from '../../pages/myTeams/MyTeams'
import MyInvitation from '../../pages/myInvitation/MyInvitation'
import MyteamsRole from '../../pages/myTeamsRole/MyteamsRole'
import MasterCountry from '../../pages/masterCountry/MasterCountry'
import MasterState from '../../pages/masterState/MasterState'
import MasterDestination from '../../pages/masterDestination/MasterDestination'
import MasterHotel from '../../pages/masterHotel/MasterHotel'
import PackageList from '../../pages/packageList/PackageList'
import PackageDashboard from '../../pages/packageDashboard/PackageDashboard'
import PackageDashboardList from '../../pages/packageDashboard/PackageDashboardList'
import BookingDashboard from '../../pages/bookingDashboard/BookingDashboard'
import BookingDashboardList from '../../pages/bookingDashboard/BookingDashboardList'
import Profile from '../../pages/profile/Profile'
import BookingView from '../../pages/bookingDashboard/BookingView'
import SinglePackage from '../../pages/packageDashboard/SinglePackage'

const Hero = () => {
  return (
    <>
      <div className='hero'>
        <Sidebar />
        <Routes>
          <Route path={''} element={<Body />} />
          <Route path={'dashboard'} element={<Dashboard />} />
          <Route path={'myteams'} element={<MyTeams />} />
          <Route path={'package'} element={<PackageList />} />
          <Route path={'package/List/:id'} element={<SinglePackage />} />
          <Route path={'packageDashboard'} element={<PackageDashboard />} />
          <Route path={'packageDashboardList'} element={<PackageDashboardList />} />
          <Route path='myteams/invitation' element={<MyInvitation />} />
          <Route path='myteams/roles' element={<MyteamsRole />} />
          <Route path='masterList' element={<MasterCountry />} />
          <Route path='masterList/state' element={<MasterState />} />
          <Route path='masterList/destination' element={<MasterDestination />} />
          <Route path='masterList/hotel' element={<MasterHotel />} />
          <Route path='booking/dashboard' element={<BookingDashboard />} />
          <Route path='booking/list' element={<BookingDashboardList />} />
          <Route path='booking/list/:id' element={<BookingView />} />
          <Route path='profile' element={<Profile />} />

        </Routes>
      </div>
    </>
  )
}

export default Hero