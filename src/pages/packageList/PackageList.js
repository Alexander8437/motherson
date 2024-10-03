import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../../config';

const PackageList = () => {

  const [packageDetails, setPackageDetails] = useState([])

  useEffect(() => {
    axios.get(`${config.baseUrl}/package/getAllPkg`)
      .then(response => {
        setPackageDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="myteams-container" >
      {/* <MyTeamsTab /> */}
      < h1 > Packages</h1 >
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
            <th>Name</th>
            <th>Code</th>
            {/* <th>Phone</th> */}
            <th>Role</th>
            <th>Administrator</th>
            {/* <th>Allow Authorization</th> */}
          </tr>
        </thead>
        <tbody className='myteam-table'>
          {Array.isArray(packageDetails) && packageDetails.map((option) => (
            <tr>
              <td><input type="checkbox" /></td>
              <td className='myteams-email'>
                {/* <span className="avatar">A</span> */}
                {option.name}</td>
              <td>{option.code}</td>
              {/* {Array.isArray(option.roles.permissions) && option.roles.permissions.map((perm) => {
                console.log(perm)
                if (Array.isArray(perm.actions) && perm.actions[0] !== undefined)
                  return <td key={perm.id}>{perm.module}</td>
              })} */}
              {/* <td></td> */}
              {/* <td>{option.roles[0].name}</td> */}
              <td><input type="checkbox" /></td>
              {/* <td><input type="checkbox" /></td> */}
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

export default PackageList