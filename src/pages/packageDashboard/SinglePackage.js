import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import config from '../../config';

const SinglePackage = () => {
  const location = useLocation(); // Unix timestamp in milliseconds
  const option = location.state?.option;

  const date = new Date(option.metadata.createdAt); // Convert timestamp to Date object

  console.log(option.itineraryIdList[1])

  // useEffect(()=>{
  //   axios.get(`${config.baseUrl}/itinerary/getById/${id}`)
  // })



  return (
    <div class="customerProfileMain" style={{ marginLeft: "100px", width: "100%" }}>
      <div class="customerProfileHeading">
        <div class="cutomerProfileHeadingOne">
          <p>Package Name : {option.name}</p>
          <p>Destination: {option.destination.destinationName}</p>
        </div>
        <div class="cutomerProfileHeadingOne">
          <p>Package Code : {option.code}</p>
          <p>Created By: {option.metadata.createdBy}</p>
        </div>

        <div class="cutomerProfileHeadingOne">
          <p>Days/Nights : {option.duration.days}/{option.duration.nights}</p>
        </div>

        <div class="cutomerProfileHeadingOne">
          <p>Created At: {date.toLocaleString()}</p>
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


      {/* <div class="customerProfileFirst">
        <button>Profile</button>
        <button>Queries <span>236</span></button>
        <button>Bookings / Accounts</button>
        <button>To Do's / Follow Up's</button>
        <button>Chats</button>
        <button>Contacts</button>
        <button>Feedback</button>
        <button>Remarks</button>
      </div> */}

      <div class="customerProfileSecond">
        <div class="customerProfileSecondOne">
          <p>Payments: </p>
          <p>Package Price: {option.packagePrice.price}</p>
          <p>GST: {option.packagePrice.gst}</p>
          <p>Total Price: {option.packagePrice.total_price}</p>
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

export default SinglePackage