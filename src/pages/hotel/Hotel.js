import React, { useEffect, useState } from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from 'react-select'
import config from '../../config';
import axios from 'axios';


const Hotel = ({ sendClose }) => {
  const [editorData, setEditorData] = useState("");
  // const [name, setName] = useState('')
  // const [address, setAddress] = useState('')
  const [rating, setRating] = useState(null)
  // const [number, setNumber] = useState('')
  // const [email, setEmail] = useState('')
  // const [countryId, setCountryId] = useState()
  // const [stateId, setStateId] = useState()
  // const [countryDetails, setCountryDetails] = useState([])
  // const [amenities, setAmenities] = useState('')
  const [status, setStatus] = useState(false)
  const [destination, setDestination] = useState([])
  const [ipAddress, setIpAddress] = useState('');
  // const [countrySelected, setCountrySelected] = useState(null);
  // const [stateSelected, setStateSlected] = useState(null);
  // const [stateDetails, setStateDetails] = useState([])
  const [destinationDetails, setDestinationDetails] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  // const [selectedFiles, setSelectedFiles] = useState([]);
  // const [imageLinks, setImageLinks] = useState([]);



  const [formData, setFormData] = useState({
    hotel_name: '',
    city_name: '',
    room_type: '',
    room_size: '',
    bed_type: '',
    hotel_address: '',
    pin_code: '',
    // rating: '',
    contact_number: null,
    email: '',
    // description: '',
    amenities: '',
    ip_address: '',
    // destination: '',
    // created_by: 'Narendra',
    image: null,  // for file upload
  });

  // const handleFileChange = (event) => {
  //   // Convert FileList to an array and store in state
  //   setSelectedFiles(event.target.files[0]);
  // };

  // const handleDelete = (indexToRemove) => {
  //   // Filter out the selected file by its index
  //   setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove));
  // };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      marginBottom: "15px",
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted lightblue',
      color: 'black',
      backgroundColor: state.isSelected ? 'lightblue' : 'white',
    }),
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };



  const ratings = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 }]

  // const handleCountryChange = (countrySelected) => {
  //   setCountrySelected(countrySelected);
  //   setCountryId(countrySelected.value)

  //   axios.get(`${config.baseUrl}/state/getbycountryid/${countrySelected.value}`)
  //     .then((response) => {
  //       const formattedOptions = response.data.map(item => ({
  //         value: item.id, // or any unique identifier
  //         label: item.stateName // or any display label you want
  //       }));
  //       setStateDetails(formattedOptions);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // };

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  const handleRatingChange = (selectedOption) => {
    setRating(selectedOption.value)
    setSelectedOption(selectedOption)
  };
  const handleDestinationChange = (selectedDestination) => {
    setSelectedDestination(selectedDestination);
    setDestination(selectedDestination)
  }

  // const handleStateChange = (stateSelected) => {
  //   setStateSlected(stateSelected);
  //   setStateId(stateSelected.value)
  // }

  // useEffect(() => {
  //   axios.get(`${config.baseUrl}/country/get`)
  //     .then((response) => {
  //       const formattedCountryOptions = response.data.map(item => ({
  //         value: item.id, // or any unique identifier
  //         label: item.countryName // or any display label you want
  //       }));
  //       setCountryDetails(formattedCountryOptions);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  useEffect(() => {
    axios.get(`${config.baseUrl}/ipAddress`)
      .then((response) => {
        setFormData({
          ...formData, "ip_address": response.data
        })
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${config.baseUrl}/destination/getall`
    )
      .then(response => {
        const formattedOptions = response.data.map(item => ({
          value: item.id, // or any unique identifier
          label: item.destinationName // or any display label you want
        }));
        setDestinationDetails(formattedOptions);
        // setFilteredData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${config.baseUrl}/ipAddress`)
      .then((response) => {
        setIpAddress(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();


    const data = new FormData();

    data.append('destination', destination.value)
    data.append('rating', rating)
    data.append('status', status)
    data.append('description', editorData)

    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value); // Log each key-value pair
    }



    await axios.post(`${config.baseUrl}/hotel/create`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(async (response) => {
        alert('Hotel saved Successfully.')
        console.log(response)
      })
      .catch(error => console.log(error));

    // console.log(payload)
  }

  return (
    <div className="hotelMain" >
      <div className="countryFixed" >
        <h3>
          <button className='roleCloseHotels' onClick={() => sendClose(false)}>X</button>
          New Hotels</h3>
      </div >
      <div className="hotelForm scrollable2" >
        <h6>Basic Information</h6>
        {/* <div className="form-group" > */}
        {/* <label for="country_name">Country Name</label>
          <br />
          <Select
            styles={customStyles}
            value={countrySelected}
            onChange={handleCountryChange}
            options={countryDetails} /> */}
        {/* <select id="destination" className="destination-select" value={countryId} onChange={handleCountryChange}>
            <option value="" disabled selected>Select</option>
            {Array.isArray(countryDetails) && countryDetails.map((option) => (
              <option key={option.id} value={option.id}>
                {option.countryName}
              </option>
            ))}
          </select> */}
        {/* </div >
        <div className="form-group" >
          <label for="state_name">State Name</label>
          <br /> */}
        {/* <select id="destination" className="destination-select" value={countryId} onChange={handleStateChange}>
            <option value="" disabled selected>Select</option>
            {Array.isArray(stateDetails) && stateDetails.map((option) => (
              <option key={option.id} value={option.id}>
                {option.stateName}
              </option>
            ))}
          </select> */}
        {/* <Select
            styles={customStyles}
            value={stateSelected}
            onChange={handleStateChange}
            options={stateDetails} /> */}
        {/* </div > */}
        <div className="form-group" >
          <label for="destination_id">Destination Name</label>
          <br />
          <Select
            styles={customStyles}
            value={selectedDestination}
            onChange={handleDestinationChange}
            options={destinationDetails} />
        </div >


        <div className="form-group" >
          <label for="hotel_name">Hotel Name</label>
          <br />
          <input
            type="text"
            id="hotel_name"
            name="hotel_name"
            value={formData.hotel_name}
            placeholder="Enter Hotel Name"
            onChange={handleChange}
          />
        </div >

        <div className="form-group" >
          <label for="city_name">City Name</label>
          <br />
          <input
            type="text"
            id="city_name"
            name="city_name"
            value={formData.city_name}
            placeholder="Enter City Name"
            onChange={handleChange}
          />
        </div >
        <div className="form-group" >
          <label for="room_type">Room Type</label>
          <br />
          <input
            type="text"
            id="room_type"
            name="room_type"
            value={formData.room_type}
            placeholder="Enter Room Type"
            onChange={handleChange}
          />
        </div >
        <div className="form-group" >
          <label for="room_size">Room Size</label>
          <br />
          <input
            type="text"
            id="room_size"
            name="room_size"
            value={formData.room_size}
            placeholder="Enter Room Size"
            onChange={handleChange}
          />
        </div >
        <div className="form-group" >
          <label for="bed_type">Bed Type</label>
          <br />
          <input
            type="text"
            id="bed_type"
            name="bed_type"
            value={formData.bed_type}
            placeholder="Enter Bed Type"
            onChange={handleChange}
          />
        </div >
        <div className="form-group" >
          <label for="hotel_address">Hotel Address</label>
          <br />
          <input
            type="text"
            id="hotel_address"
            name="hotel_address"
            placeholder="Enter Hotel Address"
            value={formData.hotel_address}
            onChange={handleChange}
          />
        </div >
        <div className="form-group" >
          <label for="pin_code">Pin Code</label>
          <br />
          <input
            type="number"
            id="pin_code"
            name="pin_code"
            placeholder="Enter Pin Code"
            value={formData.pin_code}
            onChange={handleChange}
          />
        </div >
        <div className="form-group" >
          <label for="rating">Rating</label>
          <br />
          {/* <input
            type="text"
            id="rating"
            name="rating"
            placeholder="Enter Rating"
          // onChange={}
          /> */}
          <Select
            value={selectedOption}
            onChange={handleRatingChange}
            options={ratings} />
        </div >
        <div className="form-group" >
          <label for="contact_number">Contact Number</label>
          <br />
          <input
            type="number"
            id="contact_number"
            name="contact_number"
            placeholder="Enter Contact Number"
            value={formData.contact_number}
            onChange={handleChange}
          />
        </div >
        <div className="form-group" >
          <label for="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div >
        <div className="form-group" >
          <label for="description">Description</label>
          <br />
          {/* <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Enter Description"
          ></textarea> */}
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            config={{
              // Customizing toolbar
              toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],

              // Set custom height via CSS
              minHeight: '200px !important',

              // Customizing editor behavior (optional)
              placeholder: "Start typing here...",
            }}
            // onReady={(editor) => {
            // Handle editor initialization
            //   console.log("Editor is ready to use!", editor);
            // }}
            onChange={(event, editor) => {
              // Handle editor content changes
              const data = editor.getData();
              setEditorData(data);
              // console.log("Editor content changed:", { event, data });
            }}
            onBlur={(event, editor) => {
              // Handle editor blur event
              // console.log("Editor lost focus:", editor);
            }}
            onFocus={(event, editor) => {
              // Handle editor focus event
              // console.log("Editor is focused:", editor);
            }}
          />
        </div >
        <div className="form-group" >
          <label for="amenities">Amenities</label>
          <br />
          <input
            type="text"
            id="amenities"
            name="amenities"
            placeholder="Enter Amenities"
            value={formData.amenities}
            onChange={handleChange}
          />
        </div >
        {/* <div className="form-group">
          <label for="image_url">Image URL</label>
          <br />
          <input
            type="text"
            id="image_url"
            name="image_url"
            placeholder="Enter Image URL"
          />
        </div> */}

        < div className="form-group" >
          <label for="status">Status</label>
          <br />
          <select id="status" name="status" value={status} onChange={handleStatusChange}>
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div >
        <div className="form-group" >
          <label for="image">Image</label>
          <br />
          <input
            type="file"
            id="image"
            name="image"
            multiple
            onChange={handleChange}
          />
          {/* {selectedFiles.length > 0 && (
            <div>
              <h3>Selected Images:</h3>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name}{" "}
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          )} */}
        </div >

      </div >
      <div className="countryBtn" >
        <button onClick={handleSubmit}>Submit</button>
        <button>Reset</button>
      </div >
    </div >


  )
}

export default Hotel