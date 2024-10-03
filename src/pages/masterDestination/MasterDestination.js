import React, { useEffect, useState } from 'react'
import MasterTab from '../../components/masterTab/MasterTab'
import axios from 'axios'
import config from '../../config'


const MasterDestination = () => {
  const [destinationDetails, setDestinationDetails] = useState([])



  useEffect(() => {
    axios.get(`${config.baseUrl}/destination/getall`)
      .then((response) => {
        setDestinationDetails(response.data);
        console.log(response.data)
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
            <th>Destination Name</th>
            <th>Country</th>
            {/* <th>Phone</th> */}
            <th>State</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
            {/* <th>Allow Authorization</th> */}
          </tr>
        </thead>
        <tbody className='myteam-table'>
          {Array.isArray(destinationDetails) && destinationDetails.map((option) => (
            <tr key={option.id}>
              <td><input type="checkbox" /></td>
              <td className='myteams-email'>
                {option.destinationName}</td>
              <td>{option.country.countryName}</td>
              <td>{option.state.stateName}</td>
              <td>{option.descripation}</td>
              <td>{(option.status === 'false') ? "inactive" : (option.status === 'inactive') ? "inactive" : "active"}</td>
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

export default MasterDestination