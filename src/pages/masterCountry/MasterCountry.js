import React, { useEffect, useState } from 'react'
import MasterTab from '../../components/masterTab/MasterTab'
import axios from 'axios';
import config from '../../config';

const MasterCountry = () => {
  const [countryDetails, setCountryDetails] = useState([])

  useEffect(() => {
    axios.get(`${config.baseUrl}/country/get`
    )
      .then(response => {
        setCountryDetails(response.data);
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
            <th>Country</th>
            <th>Code</th>
            {/* <th>Phone</th> */}
            {/* <th>IP Address</th> */}
            <th>Staus</th>
            <th>Image</th>
            <th>Actions</th>
            {/* <th>Allow Authorization</th> */}
          </tr>
        </thead>
        <tbody className='myteam-table'>
          {Array.isArray(countryDetails) && countryDetails.map((option) => (
            <tr>
              <td><input type="checkbox" /></td>
              <td className='myteams-email'>
                {option.countryName}</td>
              <td>{option.code}</td>
              {/* <td>{option.ipAddress}</td> */}
              <td>{option.status}</td>
              {/* <td><img src='D:\New folder (3)\Motherson\controller-module\src\main\resources\static\Banner_3.jpg' /></td> */}
              <td><img src='' /></td>

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

export default MasterCountry