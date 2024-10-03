import React, { useEffect, useState } from 'react'
import MyTeams from '../myTeams/MyTeams'
import { Link, useLocation } from 'react-router-dom'
import Roles from '../roles/Roles'
import axios from 'axios'
import config from '../../config'
import MyTeamsTab from '../../components/myTeamsTab/MyTeamsTab'

const MyteamsRole = () => {
  const [roles, setRoles] = useState([])
  const [sNo, setSno] = useState(1)
  const [isFormVisible, setIsFormVisible] = useState(false);

  const showForm = () => {
    setIsFormVisible(true)
  }



  useEffect(() => {
    axios.get(`${config.baseUrl}/rolesPermission`)
      .then((response) => {
        setRoles(response.data);
        console.log(response.data)
      })
      .catch((error) => console.error(error)
      )
  }, [])

  return (
    <div className='myteams-container'>
      <MyTeamsTab />

      <div className="filters">
        <input type="text" placeholder="Search" className="search-box" />
        <button className="filter-btn">Default</button>
        <button className="filter-btn" > Active</button >
      </div >
      <table className="table" >
        <thead>
          <tr>
            <th>S. No</th>
            <th><input type="checkbox" className="checkbox" /></th>
            <th>Roles</th>
            <th>No. of User</th>
            {/* <th>Description</th> */}
            <th>Permissions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {roles && roles.map((role) =>
            <tr>
              {/* {setRoles(sNo + 1)} */}
              <td></td>
              <td><input type="checkbox" className="checkbox" /></td>
              <td>{role.name}</td>
              <td></td>
              {/* <td>{role.description}</td> */}
              <td>{role.permissions.map((permission) => {
                if (Array.isArray(permission.actions) && permission.actions[0] !== undefined)
                  return <p>{permission.module}</p>
              })}</td>
              <td></td>
            </tr>

          )
          }
        </tbody>
      </table >
      <p>Showing 1 to 1 of 1 rows</p>
      <div className='submenu-menu' style={{ right: isFormVisible ? '0' : '-100%' }}>
        <button className='roleClose' onClick={() => setIsFormVisible(false)}>X</button>
        <Roles />
      </div>

    </div >
  )
}

export default MyteamsRole