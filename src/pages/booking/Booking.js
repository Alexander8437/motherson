import { useEffect, useState } from "react";
import Select from 'react-select'
import config from "../../config";
import axios from "axios";
import PdfFile from "../pdfHtml/PdfFile";

const Booking = ({ sendClose }) => {
  const [allCustomer, setAllCustomer] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [customerDetails, setCustomerDetails] = useState({})
  const [allCustomerDetails, setAllCustomerDetails] = useState([])
  const [allPackageDetails, setAllPackageDetails] = useState([])
  const [destinationDetails, setDestinationDetails] = useState([])
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [custEmail, setCustEmail] = useState('')
  const [customerId, setCustomerId] = useState()
  const [phone, setPhone] = useState('')
  const [packageName, setPackageName] = useState('')
  const [fromDestination, setFromDestination] = useState('')
  const [toDestination, setToDestination] = useState()
  const [noOfPacks, setNoOfPacks] = useState('')
  const [noOfDay, setNoOfDay] = useState('')
  const [noOfNight, setNoOfNight] = useState('')
  const [packs, setPacks] = useState(0);
  const [room, setRoom] = useState(0)
  const [flight, setFlight] = useState(false)
  const [amount, setAmount] = useState(0)
  const [currency, setCurrency] = useState('')
  const [additionalService, setAdditionalService] = useState(false)
  const [travelInsurance, setTravelInsurance] = useState(false)
  // const [bookingStatus, setBookingStatus] = useState('')
  const [bookingByUserId, setBookingByUserId] = useState('')
  const [bookingByUserName, setBookingByUserName] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [selectedHotelType, setSelectedHotelType] = useState(null)
  const [hotelType, setHotelType] = useState([])
  const [completePackageDestails, setCompletePackageDetails] = useState([])
  const [hotelDetails, setHotelDetails] = useState([])
  const [packageDestails, setPackageDetails] = useState([])
  const [hotelStar, setHotelStar] = useState([])
  const [showHotel, setShowHotel] = useState([])
  const [showRoomType, setShowRoomType] = useState([])
  const [selectHotelname, setSelectedHotelName] = useState(null)
  const [selectRoomType, setSelectedRoomType] = useState(null)
  const [noOfRoom, setNoOfRoom] = useState()
  const [roomSize, setRoomSize] = useState()
  const [bedType, setBedType] = useState()
  const [paymentId, setPaymentId] = useState()
  const [paymentMethod, setPaymentmethod] = useState()
  const [selectBookingStatus, setSelectBookingStatus] = useState(null)
  const [user, setUser] = useState({})
  const [completeData, setCompleteData] = useState({})
  const [showPdf, setShowPdf] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // const customStyles = {
  //   control: (provided, state) => ({
  //     ...provided,
  //     fontSize: "12px",
  //     alignItems: "center",
  //     maxHeight: "fit-content",
  //     paddingTop: "none",
  //     borderRadius: "5px",
  //     border: "none",
  //     marginTop: "5px",
  //     boxSizing: 'border-box', // Ensures borders and padding are included in the element’s size

  //     // margin-bottom: 15px !important;
  //   }),
  //   placeholder: (provided) => ({
  //     ...provided,
  //     display: 'flex',
  //     fontStyle: "10px",
  //     alignItems: 'center',  // Vertically center the placeholder
  //     color: 'gray',         // Optional: adjust placeholder color
  //     height: '100%',        // Ensures it takes the full height of the control
  //   }),
  // }
  const customStyles = {
    control: (provided) => ({
      ...provided,
      marginBottom: "15px",
      maxHeight: "30px"
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted lightblue',
      color: 'black',
      backgroundColor: state.isSelected ? 'lightblue' : 'white',
    }),
  };

  const bookingStatus = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Confirmed', label: 'Confirmed' },
    { value: 'Follow Up', label: 'Follow Up' },
    { value: 'Reverted', label: 'Reverted' },
    { value: 'Cancel', label: 'Cancel' },
    { value: 'Lost', label: 'Lost' },
  ]

  const handleBookingStatus = (selectBookingStatus) => {
    setSelectBookingStatus(selectBookingStatus)
  }
  const handleRoomType = (selectRoomType) => {
    setSelectedRoomType(selectRoomType)
  }

  const handleCustomerChange = (selectedOption) => {
    setSelectedOption(selectedOption)
    const cust = allCustomerDetails.filter(item => item.id === selectedOption.value)
    setCustomerDetails(cust)
    setCustomerId(selectedOption.value)
    setCustEmail(cust[0].cust_Email)
    setPhone(cust[0].cust_Phone)
  }

  const handleHotelName = (selectHotelname) => {
    setSelectedHotelName(selectHotelname)
    setShowRoomType(Array.isArray(hotelDetails) && hotelDetails.map(item => ({
      value: item.id,
      label: item.room_type
    }))
    )
  }

  const handleRatingChange = (selectedHotelType) => {
    setSelectedHotelType(selectedHotelType)

  }

  const handleDestinationChange = async (selectedDestination) => {
    setSelectedDestination(selectedDestination)
    setToDestination(selectedDestination.value)
    setSelectedPackage(null)
    setAllPackageDetails([])
    setNoOfDay(0)
    setNoOfNight(0)
    setHotelType(null)
    setSelectedHotelType(null)
    setHotelStar([])

    await axios.get(`${config.baseUrl}/booking/packages/by-destination/${selectedDestination.value}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
      .then(response => {
        const formattedOptions = response.data.map(items => ({
          value: items.id,
          label: items.name
        }))
        setAllPackageDetails(formattedOptions)
        setCompletePackageDetails(response.data)
      })
      .catch((error) => {
        console.error('Error fetching Alex data:', error);
      });

    await axios.get(`${config.baseUrl}/hotel/destination/${selectedDestination.value}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(response => {
        const formattedOptions = response.data.map(items => ({
          value: items.id,
          label: items.rating
        }))
        const setHotel = new Set();
        for (let i = 0; i < formattedOptions.length; i++) {
          setHotel.add(formattedOptions[i].label)
        }
        // setHotelType([setHotel])

        setHotelStar((prev) => [
          ...prev,
          ...Array.from(setHotel).map(i => ({ value: i, label: i }))
        ]);
        setHotelDetails(response.data)
        setShowHotel(response.data.map(item => ({
          value: item.id,
          label: item.hotel_name
        })))
      })
      .catch((error) => {
        console.error('Error fetching Alex data:', error);
      });

  }

  const handlePackageChange = (selectedPackage) => {
    setSelectedPackage(selectedPackage)
    setPackageName(selectedPackage.label)
    const n = completePackageDestails.filter(item => item.id === selectedPackage.value)
    setNoOfDay(n[0].duration.days)
    setNoOfNight(n[0].duration.nights)

  }
  const handleEmail = (e) => {
    console.log(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      "cust_Id": 5,
      "travelDetails": {
        "packageName": packageName || "holiday",
        "startDate": startDate,
        "endDate": endDate,
        "numberOfDays": noOfDay,
        "numberOfNights": noOfNight,
        "numberOfGuests": noOfPacks,
        "numberOfRoom": noOfRoom,
        "flight": true
      },
      "paymentDetails": {
        "amount": amount,
        "currency": currency,
        "paymentId": paymentId,
        "paymentMethod": paymentMethod
      },
      "specialRequest": {
        "additionalService": true,
        "travelInsurance": true
      },
      "bookingByUserId": 5,
      "bookingByUserName": user.username,
      "from_Destination": fromDestination,
      "bookingStatus": selectBookingStatus.label,
      "to_Destination": {
        "id": toDestination
      }
    }

    setCompleteData(data)
    if (toDestination !== undefined && selectBookingStatus !== null) {

      await axios.post(`${config.baseUrl}/booking/create`, data, {
        headers: {
          "Content-Type": "Application/json",
          'Access-Control-Allow-Origin': '*'

        }
      })
        .then((response) => alert('Booking saved Successfully.'))
        .catch(error => console.error(error));

      // setShowModal(true); // Show the modal with PDF data

      setShowPdf(true);
      // console.log(payload)
    } else {
      alert("Please fill details")
    }
  }

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };


  async function decryptToken(encryptedToken, key, iv) {
    const dec = new TextDecoder();

    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encryptedToken
    );

    return dec.decode(new Uint8Array(decrypted));
  }

  // Function to retrieve and decrypt the token
  async function getDecryptedToken() {
    const keyData = JSON.parse(localStorage.getItem('encryptionKey'));
    const ivBase64 = localStorage.getItem('iv');
    const encryptedTokenBase64 = localStorage.getItem('encryptedToken');


    if (!keyData || !ivBase64 || !encryptedTokenBase64) {
      throw new Error('No token found');
    }

    // Convert back from base64
    const key = await crypto.subtle.importKey('jwk', keyData, { name: "AES-GCM" }, true, ['encrypt', 'decrypt']);
    const iv = new Uint8Array(atob(ivBase64).split('').map(char => char.charCodeAt(0)));
    const encryptedToken = new Uint8Array(atob(encryptedTokenBase64).split('').map(char => char.charCodeAt(0)));

    return await decryptToken(encryptedToken, key, iv);
  }

  // Example usage to make an authenticated request
  useEffect(() => {
    getDecryptedToken()
      .then(token => {
        return axios.get(`${config.baseUrl}/getbytoken`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'

          }
        });
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => console.error('Error fetching protected resource:', error))
  }, [])

  useEffect(() => {
    axios.get(`${config.baseUrl}/customer/getAllcust`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(response => {
        const formattedOptions = response.data.map(items => ({
          value: items.id,
          label: items.cust_Name
        }))
        setAllCustomerDetails(response.data)
        setAllCustomer(formattedOptions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${config.baseUrl}/destination/getall`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        const formattedOptions = response.data.map(item => ({
          value: item.id, // or any unique identifier
          label: item.destinationName // or any display label you want
        }));
        setDestinationDetails(formattedOptions);
      });
  }, []);


  return (
    <div className="CreatePackagesHead" >
      <div className="countryFixed" >
        <h3>
          <button className='roleClosePackage' onClick={() => sendClose(false)}>X</button>
          New Bookings</h3>
      </div >

      <div className="mainPackage Scrollable" >
        <div className="BasicPackage" >
          <h6>Customer Details</h6>
        </div >
        <div className="BasicPackagesInner" >
          <div className="packageInput">
            <label>
              Customer Name
            </label>
            <Select
              styles={customStyles}
              value={selectedOption}
              options={allCustomer}
              onChange={handleCustomerChange}
            />

          </div >
          <div className="packageInput" >
            <label>
              Email
            </label>
            <input
              type="email"
              placeholder=""
              name=""
              value={custEmail}
              onChange={handleEmail}
            />
          </div >
          <div className="packageInput" >
            <label>
              Phone no.
            </label>
            <input
              type="text"
              placeholder=""
              name=""
              value={phone}
            />
          </div >
        </div >

        <div className="BasicPackage" >
          <h6>Package Details</h6>
        </div >
        <div className="BasicPackagesInner" style={{ gap: "20px", width: "100%" }}>
          <div className="packageInput" >
            <label>From</label>
            <input
              type="text"
              placeholder="From where to start a journey..."
              name=""
              onChange={(e) => setFromDestination(e.target.value)}
            />
          </div >
          <div className="packageInput" >
            <label>Destination</label>
            {/* <input
              type="text"
              placeholder="Select the Destination..."
              name=""
            /> */}
            <Select
              options={destinationDetails}
              onChange={handleDestinationChange}
              value={selectedDestination}
            />
          </div >
        </div>
        <div className="BasicPackagesInner" style={{ gap: "20px", width: "100%" }}>
          <div className="packageInput" >
            <label>Package Name</label>
            <Select
              options={allPackageDetails}
              value={selectedPackage}
              onChange={handlePackageChange}
            />
          </div >
          <div className="packageInput" >
            <label>Number Of Paxs</label>
            <input
              type="number"
              placeholder="From where to start a journey..."
              name=""
              onChange={(e) => setNoOfPacks(e.target.value)}
            />
          </div >
          <div className="packageInput" >
            <label>No. of Days</label>
            <input
              type="number"
              placeholder="No. of days."
              name=""
              value={noOfDay}
            />
          </div >
          <div className="packageInput" >
            <label>No. of Nights</label>
            <input
              type="text"
              placeholder="No. of Nights"
              name=""
              value={noOfNight}
            // onChange={(e) => setNoOfNight(e.target.value)}
            />
          </div >
        </div>
        <div className="BasicPackagesInner" style={{ gap: "20px", width: "100%" }}>
          {/* <div className="packageInput" style={{ display: 'flex' }}> */}
          <div className="packageInput" >
            <label>Travel Date From</label>
            <input type="date" id="travel-date-from" placeholder="dd-mm-yyyy"
              onChange={(e) => setStartDate(e.target.value)} />
          </div >
          <div className="packageInput" >
            <label>Travel Date To</label>
            <input type="date" id="travel-date-to" placeholder="dd-mm-yyyy"
              onChange={(e) => setEndDate(e.target.value)} />
            {/* </div > */}
          </div >

        </div >



        <div className="BasicPackage" >
          <h6>Accommodation & Transportation Details</h6>
        </div >
        <div className="BasicPackagesInner" >
          <div className="packageInput" >
            <label>
              Hotel Type
            </label>
            <Select
              onChange={handleRatingChange}
              value={selectedHotelType}
              options={hotelStar}
            />
          </div >
          <div className="packageInput" >
            <label>
              Hotel Name
            </label>
            <Select
              onChange={handleHotelName}
              value={selectHotelname}
              options={showHotel}
            />
          </div >
          <div className="packageInput" >
            <label>
              Room Type
            </label>
            <Select
              onChange={handleRoomType}
              value={selectRoomType}
              options={showRoomType}
            />
          </div >
        </div >
        <div className="BasicPackagesInner" >
          <div className="packageInput" >
            <label>
              Number of Rooms
            </label>
            <input
              type="number"
              placeholder=""
              name=""
              onChange={(e) => setNoOfRoom(e.target.value)}
            />
          </div >
          <div className="packageInput" >
            <label>
              Room Size
            </label>
            <input
              type="text"
              placeholder=""
              name=""
              onChange={(e) => setRoomSize(e.target.value)}
            />
          </div >
          <div className="packageInput" >
            <label>
              Bed Type
            </label>
            <input
              type="text"
              placeholder=""
              name=""
              onChange={(e) => setBedType(e.target.value)}
            />
          </div >
        </div >

        {/* <div className="BasicPackage" >
          <h6>Package Price Details</h6>
        </div >
        <div className="BasicPackagesInner" >
          <div className="packageInput" >
            <label>
              Payment ID
            </label>
            <input
              type="text"
              placeholder=""
              name=""
              onChange={(e) => setPaymentId(e.target.value)}
            />
          </div >
          <div className="packageInput" >
            <label>
              Payment Method
            </label>
            <input
              type="text"
              placeholder=""
              name=""
              onChange={(e) => setPaymentmethod(e.target.value)}
            />
          </div >
          <div className="packageInput" >
            <label>
              Amount
            </label>
            <input
              type="text"
              placeholder=""
              name=""
              onChange={(e) => setAmount(e.target.value)}
            />
          </div >
        </div >
        <div className="packageInput" >
          <label>
            Currency
          </label>
          <input
            type="text"
            placeholder=""
            name=""
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div > */}
        <div className="BasicPackage" >
          <h6>Booking Details</h6>
        </div >
        <div className="BasicPackagesInner" >
          <div className="packageInput" >
            <label>
              Status
            </label>
            <Select
              value={selectBookingStatus}
              options={bookingStatus}
              onChange={handleBookingStatus}
            />
          </div >
          {/* <div className="packageInput" >
            <label>
              Hotel Name
            </label>
            <Select
              onChange={handleHotelName}
              value={selectHotelname}
              options={showHotel}
            />
          </div >
          <div className="packageInput" >
            <label>
              Room Type
            </label>
            <Select
              onChange={handleRoomType}
              value={selectRoomType}
              options={showRoomType}
            />
          </div > */}
        </div >

        <form id="checkboxForm">
          <label>
            <input type="checkbox" name="option" value="Option 1" />
            Include Terms and Conditions
          </label><br />
          <label>
            <input type="checkbox" name="option" value="Option 2" />
            Include Booking policy
          </label><br />
          <label>
            <input type="checkbox" name="option" value="Option 3" />
            Include Cancellation & Refund policy
          </label><br />
          <label>
            <input type="checkbox" name="option" value="Option 4" />
            Include Date Change Policy
          </label><br />
          <label>
            <input type="checkbox" name="option" value="Option 5" />
            Include Booking Person Details
          </label>
          <br />
          {/* <button type="button" onclick="generatePDF()" className="generateBtn">Generate PDF</button> */}
        </form>
        {showPdf &&
          // <div className="modal">

          <PdfFile data={completeData} />
          // </div>
        }
        {/* Show the template when button is clicked */}

      </div >
      <div className="countryBtn" >
        <button onClick={handleSubmit}>Generate Booking</button>
        <button>Reset</button>
      </div >
    </div >
  )
}







export default Booking;

