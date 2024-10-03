import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const MasterTab = () => {
  const location = useLocation();
  const activeTab = location.pathname;

  return (
    <div className="myteams-header" >
      <div className='myteams-top'>
        <h2 className='myteams-heading'>Master List </h2>
      </div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <ul className="myteams-tabs">
          <Link to='/home/masterList' style={{ textDecoration: 'none' }}>
            <li style={{
              borderBottom: activeTab === '/home/masterList' ? '2px solid #941010' : 'none',
            }}
            >Country</li>
          </Link>
          {/* <Link to='/home/myteams/invitation' style={{ textDecoration: 'none' }}>
        <li style={{
          borderBottom: activeTab === '/home/myteams/invitation' ? '2px solid #941010' : 'none',
        }}>Invitations</li>
      </Link> */}
          <Link to='/home/masterList/state' style={{ textDecoration: 'none' }}>
            <li style={{
              borderBottom: activeTab === '/home/masterList/state' ? '2px solid #941010' : 'none',
            }}>State</li>
          </Link>
          <Link to='/home/masterList/destination' style={{ textDecoration: 'none' }}>
            <li style={{
              borderBottom: activeTab === '/home/masterList/destination' ? '2px solid #941010' : 'none',
            }}>Destination</li>
          </Link>
          <Link to='/home/masterList/hotel' style={{ textDecoration: 'none' }}>
            <li style={{
              borderBottom: activeTab === '/home/masterList/hotel' ? '2px solid #941010' : 'none',
            }}>Hotel</li>
          </Link>
        </ul>
      </div >
    </div >

  )
}

export default MasterTab