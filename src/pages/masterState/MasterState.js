import React, { useEffect, useState } from 'react'
import MasterTab from '../../components/masterTab/MasterTab';
import axios from 'axios';
import config from '../../config';

const MasterState = () => {
  const [stateDetails, setStateDetails] = useState([])

  useEffect(() => {
    axios.get(`${config.baseUrl}/state/get`)
      .then((response) => {
        setStateDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="myteams-container" >
      <MasterTab />
      {/* <MyTeamsTab /> */}
      <div className="filters" >
        <input type="text" placeholder="Search" className="search-box" />
        <button className="filter-btn" > Default
        </button >
        <button className="filter-btn" > Role</button >
        <button className="filter-btn" > Administrator</button >
        {/* <button className="filter-btn">Allow Authorization</button> */}
      </div >

      {/* <div className="table-container"> */}
      < table >
        <thead>
          <tr>
            <th><input type="checkbox" id='teamsListChecked' /></th>
            <th>State</th>
            <th>Code</th>
            {/* <th>Phone</th> */}
            {/* <th>IP Address</th> */}
            <th>Staus</th>
            <th>Actions</th>
            {/* <th>Allow Authorization</th> */}
          </tr>
        </thead>
        <tbody className='myteam-table'>
          {Array.isArray(stateDetails) && stateDetails.map((option) => (
            <tr>
              <td><input type="checkbox" /></td>
              <td className='myteams-email'>
                {option.stateName}</td>
              <td>{option.code}</td>
              {/* <td>{option.ipAddress}</td> */}
              <td>{option.status}</td>
              <td><button>edit</button> <button>delete</button></td>
            </tr>
          ))}
        </tbody>
      </table >
      {/* </div> */}

      < div className="footer" >
        Showing 1 to 1 of 1 rows
      </div >
    </div >
  )
}

export default MasterState