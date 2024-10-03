import React, { useEffect, useState } from 'react'
import BookingDashboardTab from './BookingDashboardTab'
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';

const BookingDashboardList = () => {
  const [bookingList, setBookingList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${config.baseUrl}/booking/getAllbookingList`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        setBookingList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleBookingView = (booking) => {
    navigate(`/home/booking/list/${booking.id}`, { state: { booking } });

  }



  return (
    <div className='myteams-container'>
      <div class="homepage">
        <BookingDashboardTab />
        <div class="startTaskTable">
          <table class="listTaskTable">
            <thead>
              <tr>
                <th>
                  <input type="checkbox"></input>
                </th>
                <th>From</th>
                <th>To</th>
                <th>Number of guest</th>
                <th>Package Name</th>
                <th>Booking By User</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(bookingList) && bookingList.map((booking) => (
                <tr>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                  <td>{booking.from_Destination}</td>
                  <td>{booking.to_Destination}</td>
                  <td>{booking.travelDetails.numberOfGuests}</td>
                  <td>{booking.travelDetails.packageName}</td>
                  <td>{booking.bookingByUserName}</td>
                  <td>{booking.bookingStatus}</td>
                  <td><button onClick={() => handleBookingView(booking)}>View</button></td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default BookingDashboardList