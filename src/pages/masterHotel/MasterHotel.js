import React, { useEffect, useState } from 'react'
import config from '../../config';
import MasterTab from '../../components/masterTab/MasterTab';
import axios from 'axios';

const MasterHotel = () => {
  const [hotelDetails, setHotelDetails] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.baseUrl}/hotel/getAll`)
      const result = await response.data;
      console.log(result)
      const updatedData = await Promise.all(result.map(async item => {
        const destinationName = await fetchNameFromId(item.destination_id);
        return { ...item, destinationName };  // Add name to the item
      }));

      setHotelDetails(updatedData);  // Update the state with the modified data

    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  const hotelDestinationName = (destination_id) => {
    console.log(destination_id)


    // try {
    //   const response = await axios.get(`${config.baseUrl}/destination/getbyid/${destination_id}`);
    //   const result = await response.data;
    //   return result.destinationName; // Assuming the API returns { name: "some name" }
    // } catch (error) {
    //   console.error("Error fetching name: ", error);
    //   return "Unknown";  // Fallback name in case of error
    // }

  }

  const fetchNameFromId = async (id) => {

    try {
      const response = await axios.get(`${config.baseUrl}/destination/getbyid/${id}`);
      const result = await response.data;
      return result.destinationName; // Assuming the API returns { name: "some name" }
    } catch (error) {
      console.error("Error fetching name: ", error);
      return "Unknown";  // Fallback name in case of error
    }
  }
  useEffect(() => {
    fetchData();  // Fetch data on component mount
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
            <th>Hotel Name</th>
            <th>Email</th>
            {/* <th>Phone</th> */}
            <th>Address</th>
            <th>Phone</th>
            <th>Destination Name</th>
            <th>Status</th>
            <th>Actions</th>
            {/* <th>Allow Authorization</th> */}
          </tr>
        </thead>
        <tbody className='myteam-table'>
          {Array.isArray(hotelDetails) && hotelDetails.map((option) => (
            <tr>
              <td><input type="checkbox" /></td>
              <td className='myteams-email'>
                {option.hotel_name}</td>
              <td>{option.email}</td>
              <td>{option.hotel_address}</td>
              <td>{option.contact_number}</td>
              <td>{option.destination.destinationName}</td>
              <td>{option.status ? 'active' : 'inactive'}</td>
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

export default MasterHotel