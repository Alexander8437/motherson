import React, { useState } from 'react'
import MyTeams from '../myTeams/MyTeams'
import { Link, useLocation } from 'react-router-dom'
import Roles from '../roles/Roles';
import MyTeamsTab from '../../components/myTeamsTab/MyTeamsTab';

const MyInvitation = () => {


  const location = useLocation();
  const activeTab = location.pathname;

  const [isFormVisible, setIsFormVisible] = useState(false);


  const showForm = () => {
    setIsFormVisible(true)
  }
  return (

    <>
      <div className="myteams-container">
        {/* <div className="myteams-header">
          <div className='myteams-top'>
            <h2 className='myteams-heading'>My Team</h2>
            <button className="add-btn" onClick={showForm}>Add</button>
          </div>
          <ul className="myteams-tabs">
            <Link to='/home/myteams' style={{ textDecoration: 'none' }}>
              <li style={{
                borderBottom: activeTab === '/home/myteams' ? '2px solid #941010' : 'none',
              }}>List</li>
            </Link>
            <Link to='/home/myteams/invitation' style={{ textDecoration: 'none' }}>
              <li style={{
                borderBottom: activeTab === '/home/myteams/invitation' ? '2px solid #941010' : 'none',
              }}>Invitations</li>
            </Link>
            <Link to='/home/myteams/roles' style={{ textDecoration: 'none' }}>
              <li style={{
                borderBottom: activeTab === '/home/myteams/roles' ? '2px solid #941010' : 'none',
              }}>Roles</li>
            </Link>
          </ul>
        </div> */}

        <MyTeamsTab />
        <div className="filters">
          <input type="text" placeholder="Search" className="search-box" />
          <button className="filter-btn">Default</button >
          <button className="filter-btn" > Active</button >
        </div >
        {/* <div className="container"> */}
        < table className="table" >
          <thead>
            <tr>
              <th>Email</th>
              <th>Status</th>
              <th>Date</th>
              <th>Invited by</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>priyasinha@gmail.com</td>
              <td><span className="status-sent">Sent</span></td>
              <td>09.06.2024 03:15 am</td>
              <td>
                <span className="avatar">A</span>
                Alexander Dung Dung
              </td>
              <td>
                <a href="#" className="action-button">Resend</a>
              </td >
              <td>
                <a href="#" className="action-button cancel">Cancel</a>
              </td >
            </tr >
          </tbody >
        </table >
        <p>Showing 1 to 1 of 1 rows</p>
        {/* </div> */}

        <div className='submenu-menu' style={{ right: isFormVisible ? '0' : '-100%' }}>
          <button className='roleClose' onClick={() => setIsFormVisible(false)}>X</button>
          <Roles />
        </div>
      </div >

    </>
  )
}

export default MyInvitation