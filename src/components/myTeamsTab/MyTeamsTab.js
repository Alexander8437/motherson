import React, { useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Roles from '../../pages/roles/Roles';
import NewUser from '../../pages/newUser/NewUser';

const MyTeamsTab = () => {
  const location = useLocation();
  const activeTab = location.pathname;

  const [isOpen, setIsOpen] = useState(false);
  const [isRoleVisible, setIsRoleVisible] = useState(false);
  const [isUserVisible, setIsUserVisible] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const showRole = () => {
    setIsRoleVisible(true)
  }

  const showUser = () => {
    setIsUserVisible(true)
  }

  return (
    <>
      <div className="myteams-header">
        <div className='myteams-top'>
          <h2 className='myteams-heading'>My Team </h2>
          <div style={{ position: "relative", display: "inline-block" }}>
            <button className='add-btn' onClick={toggleDropdown}>
              Add
            </button>

            {isOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: "18px",
                  backgroundColor: "#f9f9f9f9",
                  boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.2)",
                  zIndex: 1,
                  minWidth: "132px",
                }}

              >
                <button className='myTeamsShow-btn'
                  style={{
                    padding: "8px 16px", display: "block", width: "100%", height: "100%", cursor: "pointer",
                    border: 'none', textAlign: 'left'
                  }}
                  onClick={showRole}>New Role</button>
                <button className='myTeamsShow-btn'
                  style={{
                    padding: "8px 16px", display: "block", width: "100%", height: "100%", cursor: "pointer",
                    border: 'none', textAlign: 'left'
                  }}
                  onClick={showUser}>New Member</button>
              </div>
            )}
          </div>

        </div>
        <ul className="myteams-tabs">
          <Link to='/home/myteams' style={{ textDecoration: 'none' }}>
            <li style={{
              borderBottom: activeTab === '/home/myteams' ? '2px solid #941010' : 'none',
            }}
            >List</li>
          </Link>
          {/* <Link to='/home/myteams/invitation' style={{ textDecoration: 'none' }}>
            <li style={{
              borderBottom: activeTab === '/home/myteams/invitation' ? '2px solid #941010' : 'none',
            }}>Invitations</li>
          </Link> */}
          <Link to='/home/myteams/roles' style={{ textDecoration: 'none' }}>
            <li style={{
              borderBottom: activeTab === '/home/myteams/roles' ? '2px solid #941010' : 'none',
            }}>Roles</li>
          </Link>
        </ul >
      </div >

      <div className='submenu-menu' style={{ right: isRoleVisible ? '0' : '-100%' }}>
        <button className='roleClose' onClick={() => setIsRoleVisible(false)}>X</button>
        <Roles sendClose={() => setIsRoleVisible(false)} />
      </div>
      <div className='submenu-menu' style={{ right: isUserVisible ? '0' : '-100%' }}>
        <button className='roleClose' onClick={() => setIsUserVisible(false)}>X</button>
        <NewUser sendClose={() => setIsUserVisible(false)} />
      </div>
    </>
  )
}

export default MyTeamsTab