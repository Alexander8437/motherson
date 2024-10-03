import React, { useEffect, useState } from 'react'
import BookingDashboardTab from './BookingDashboardTab'
import axios from 'axios';
import config from '../../config';

const BookingDashboard = () => {
  const [bookingList, setBookingList] = useState([])

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

  return (
    <div className='myteams-container'>
      <div class="homepage">
        <BookingDashboardTab />
        <div class="taskToDoSec">
          <div class="taskToDo">
            <h6>Confirmed</h6>
            <p>
              27 Tasks
              0 / 0
            </p>
          </div>
          <div class="taskInProcess">
            <h6>Pending</h6>
            <p>
              5 Tasks
              0 / 0
            </p>
          </div>
          <div class="taskNeedApproval">
            <h6>Lost</h6>
            <p>
              7 Tasks
              0 / 0
            </p>
          </div>
          <div class="taskCompleted">
            <h6>Cancel</h6>
            <p>
              1 Task
              0 / 0
            </p>
          </div>
        </div>
        <div class="taskToDoSec2">
          <div class="taskToDoSecInner scrollable-div">
            {Array.isArray(bookingList) && bookingList.map((booking) => (
              (booking.bookingStatus === 'Confirmed') ?
                <div class="toDo">
                  <p>{booking.travelDetails.packageName}</p>
                  <p>{booking.travelDetails.startDate}</p>
                  <p class="todoGrey"></p>
                  <button>on hold</button>
                  <div class="taskProfile"><a href="#">p</a><p>in 2 weeks</p></div>
                </div> : <></>
            ))}
            {/* <div class="toDo">
              <p>Gather feedback on the design and usability</p>
              <p class="todoGrey">Project: Web Design - Landmark Developments</p>
              <button>on hold</button>
              <div class="taskProfile"><a href="#">p</a><p>in 2 weeks</p></div>
            </div>
            <div class="toDo">
              <p>Gather feedback on the design and usability</p>
              <p class="todoGrey">Project: Web Design - Landmark Developments</p>
              <button>on hold</button>
              <div class="taskProfile"><a href="#">p</a><p>in 2 weeks</p></div>
            </div>
            <div class="toDo">
              <p>Gather feedback on the design and usability</p>
              <p class="todoGrey">Project: Web Design - Landmark Developments</p>
              <button>on hold</button>
              <div class="taskProfile"><a href="#">p</a><p>in 2 weeks</p></div>
            </div>
            <div class="toDo">
              <p>Gather feedback on the design and usability</p>
              <p class="todoGrey">Project: Web Design - Landmark Developments</p>
              <button>on hold</button>
              <div class="taskProfile"><a href="#">p</a><p>in 2 weeks</p></div>
            </div> */}
          </div>
          <div class="taskToDoSecInner scrollable-div">
            {Array.isArray(bookingList) && bookingList.map((booking) => (
              (booking.bookingStatus === 'Pending') ?
                <div class="toDo">
                  <p>{booking.travelDetails.packageName}</p>
                  <p>{booking.travelDetails.startDate}</p>
                  <p class="todoGrey"></p>
                  <button>on hold</button>
                  <div class="taskProfile"><a href="#">p</a><p>in 2 weeks</p></div>
                </div> : <></>
            ))}
          </div>
          <div class="taskToDoSecInner scrollable-div">
            {Array.isArray(bookingList) && bookingList.map((booking) => (
              (booking.bookingStatus === 'Lost') ?
                <div class="toDo">
                  <p>{booking.travelDetails.packageName}</p>
                  <p>{booking.travelDetails.startDate}</p>
                  <p class="todoGrey"></p>
                  <button>on hold</button>
                  <div class="taskProfile"><a href="#">p</a><p>in 2 weeks</p></div>
                </div> : <></>
            ))}
          </div>
          <div class="taskToDoSecInner scrollable-div">
            {Array.isArray(bookingList) && bookingList.map((booking) => (
              (booking.bookingStatus === 'Cancel') ?
                <div class="toDo">
                  <p>{booking.travelDetails.packageName}</p>
                  <p>{booking.travelDetails.startDate}</p>
                  <p class="todoGrey"></p>
                  <button>on hold</button>
                  <div class="taskProfile"><a href="#">p</a><p>in 2 weeks</p></div>
                </div> : <></>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingDashboard