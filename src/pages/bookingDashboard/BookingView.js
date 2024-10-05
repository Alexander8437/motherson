import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import config from '../../config';

const BookingView = ({ }) => {
  const location = useLocation();
  const { id } = useParams(); // Get the id from the URL
  const [item, setItem] = useState(null)
  const [customer, setCustomer] = useState([])

  // Access the passed item from location.state
  const booking = location.state?.booking;

  console.log(booking.cust_Id)
  useEffect(() => {
    axios.get(`${config.baseUrl}/customer/getById/${booking.cust_Id}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }).then(response => {
        setCustomer(response.data)
      })
      .catch(error => console.log(error))

  }, []);


  useEffect(() => {
    axios.get(`${config.baseUrl}/booking/getBookingById/${id}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  if (!booking) {
    return <p>Item not found or missing data</p>;
  }

  return (
    <div class="customerProfileMain" style={{ marginLeft: "100px", width: "100%" }}>
      <div class="customerProfileHeading">
        <div class="cutomerProfileHeadingOne">
          <p>Customer Name : {customer.cust_Name}</p>
          <p>User Name : {booking.bookingByUserName}</p>
          <p>Last Remark : </p>
        </div>
        <div class="cutomerProfileHeadingOne">
          <p>Contact No : {customer.cust_Phone}</p>
          <p>CustomerType: B2C</p>
        </div>

        <div class="cutomerProfileHeadingOne">
          <p>Email ID : {customer.cust_Email}</p>
        </div>

        <div class="cutomerProfileHeadingOne">
          <p>Active Since : 02-Aug-17 05:26:00</p>
        </div>
      </div>
      <div class="customerProfileHeading">
        <div class="customerProfileHeadingTwo">
          <button>+ Add Remarks</button>
        </div>
        <div class="customerProfileHeadingTwo">
          <button>+ Facebook</button>
          <button>+ To Do</button>
          <button class="newQueryBtn">+ New Query</button>
        </div>
      </div>


      <div class="customerProfileFirst">
        <button>Profile</button>
        <button>Queries <span>236</span></button>
        <button>Bookings / Accounts</button>
        <button>To Do's / Follow Up's</button>
        <button>Chats</button>
        <button>Contacts</button>
        <button>Feedback</button>
        <button>Remarks</button>
      </div>

      <div class="customerProfileSecond">
        <div class="customerProfileSecondOne">
          <p>Payments: </p>
          <p>Total Billed: {booking.paymentDetails.amount}</p>
          {/* <p>Total Paid: 105,020.00</p>
          <p>Pending: 300,875.66 </p> */}
        </div>
        <div class="customerProfileSecondTwo">
          <button>View</button>
        </div>
      </div>



      <div class="customerProfileThird">
        <div class="customerProfileThirdLeft">
          <div class="CPLRHeading">
            <p>I want to go :</p>
            <button>+ Add</button>
          </div>
          <div class="CPLRBoxMain scrollable-Customer">
            <div class="CPLRBox1">
              <h4>Destination</h4>
              <h4>Action</h4>
            </div>
            <div class="CPLRBox">
              <h5>Goa (India)</h5>
              <span>-</span>
            </div>
            <div class="CPLRBox">
              <h5>(Singapore)</h5>
              <span>-</span>
            </div>
            <div class="CPLRBox">
              <h5>(USA)</h5>
              <span>-</span>
            </div>
            <div class="CPLRBox">
              <h5>Goa (India)</h5>
              <span>-</span>
            </div>
            <div class="CPLRBox">
              <h5>Goa (India)</h5>
              <span>-</span>
            </div>
            <div class="CPLRBox">
              <h5>Goa (India)</h5>
              <span>-</span>
            </div>

          </div>

        </div>
        <div class="customerProfileThirdRight">
          <div class="CPLRHeading">
            <p>Customer Profile / Preferences</p>
          </div>
          <div class="CPLRBoxMain scrollable-Customer">
            <div class="CPLRBox">
              <h5>Food:</h5>
              <p>Veg, Jain/Satwik</p>
            </div>
            <div class="CPLRBox">
              <h5>Hotel:</h5>
              <p>1 Star, 2 Star, 3 Star, 4 Star, 5 Star, Any Star</p>
            </div>
            <div class="CPLRBox">
              <h5>Passport:</h5>
              <p>31155895 (20-Sep-24)</p>
            </div>
            <div class="CPLRBox">
              <h5>Marital Status:</h5>
              <select class="customermaritalDropdown" id="marital-status" name="maritalStatus">
                <option value="" disabled selected>Select your status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>

          </div>
        </div>
      </div>


    </div>
  )
}

export default BookingView