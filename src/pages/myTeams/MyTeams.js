import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Roles from '../roles/Roles';
import axios from 'axios';
import config from '../../config';
import MyTeamsTab from '../../components/myTeamsTab/MyTeamsTab';
import { IoMdAddCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

const MyTeams = () => {
  const location = useLocation();
  const activeTab = location.pathname;

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [id, setId] = useState(null);


  const editRole = () => {
    console.log(id)
  }


  useEffect(() => {
    axios.get(`${config.baseUrl}/getAllUser`)
      .then((response) => {
        setAllUsers(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div className="myteams-container" >
      <MyTeamsTab />
      <div className="filters" >
        <input type="text" placeholder="Search" className="search-box" />
        <button className="filter-btn" > Default
        </button >
        <button className="filter-btn" > Role</button >
        <button className="filter-btn" > Administrator</button >
        <button className="filter-btn" > Action</button >
      </div >

      < table >
        <thead>
          <tr>
            <th><input type="checkbox" id='teamsListChecked' /></th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Administrator</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='myteam-table'>
          {Array.isArray(allUsers) && allUsers.map((option) => (
            <tr key={option.id}>
              <td><input type="checkbox" /></td>
              <td className='myteams-email'>
                {option.username}</td>
              <td>{option.email}</td>
              <td>{option.roles[0].name}</td>
              <td><input type="checkbox" /></td>
              <td>
                <IoMdAddCircle size="15px" color='green' cursor='pointer' />
                <TiDelete size="16px" color='red' cursor='pointer' /></td>
              {/* <td><input type="checkbox" /></td> */}
            </tr>
          ))}
        </tbody>
      </table >
      {/* </div> */}

      < div className="footer" >
        Showing 1 to 1 of 1 rows
      </div >

      <div className='submenu-menu' style={{ right: isFormVisible ? '0' : '-100%' }}>
        <button className='roleClose' onClick={() => setIsFormVisible(false)}>X</button>
        <Roles />
      </div>
    </div >


  )
}

export default MyTeams