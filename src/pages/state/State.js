import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import Select from 'react-select'


const State = ({ sendClose }) => {
  const [stateName, setStateName] = useState();
  const [code, setCode] = useState();
  const [ipAddress, setIpAddress] = useState();
  const [status, setStatus] = useState('inactive');
  const [countryDetails, setCountryDetails] = useState([])
  const [countryId, setCountryId] = useState(null)
  const [country, setCountry] = useState()
  const [selectedOption, setSelectedOption] = useState(null);

  const [formData, setFormData] = useState({
    stateName, code, ipAddress: "", status, country,
    image: null,
  });

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

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
  };


  // const navigate = useNavigate()

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setCountryId(selectedOption.value)
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios.get(`${config.baseUrl}/country/get`
    )
      .then(response => {
        const formattedOptions = response.data.map(item => ({
          value: item.id, // or any unique identifier
          label: item.countryName // or any display label you want
        }));
        setCountryDetails(formattedOptions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${config.baseUrl}/ipAddress`)
      .then((response) => {
        setFormData({
          ...formData, "ipAddress": response.data
        })
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(countryId)
    const formDataToSend = new FormData();
    formDataToSend.append('stateName', formData.stateName);
    formDataToSend.append('code', formData.code);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('ipAddress', formData.ipAddress);
    formDataToSend.append('country', countryId);
    formDataToSend.append('image', formData.image); // Attach image file
    console.log(formDataToSend)


    await axios.post(`${config.baseUrl}/state/createstate`, formDataToSend,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => console.log('State saved Successfully.'))
      .catch(error => console.error(error));

    // navigate("/home")
  }


  return (
    <div className="countryStart" >
      <div className="countryFixed" >
        <h3><button className='roleCloseCountry' onClick={() => sendClose(false)}>X</button>New States</h3>
      </div >
      <div className="country scrollable2" >
        <h6>Basic Information</h6>

        <div className="CountryInput" style={{ width: '100%', marginRight: '5px' }}>
          <label>
            Country
          </label>
          <br />
          <Select
            styles={customStyles}
            value={selectedOption}
            onChange={handleChange}
            options={countryDetails} />
        </div >
        <div className="stateFlexBox" >
          <div className="CountryInput" style={{ width: '50%', marginRight: '5px' }}>
            <label>
              State Name
            </label>
            <br />
            <input
              type="text"
              placeholder="State Name"
              name="stateName"
              value={formData.stateName}
              onChange={handleInputChange}
            />
          </div >

          <div className="CountryInput" style={{ width: '50%', marginRight: '5px' }}>
            <label>
              State Code
            </label>
            <br />
            <input
              type="text"
              placeholder="State Name"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
            />
          </div >
        </div >
        <div className="CountryInput" >
          <label for="status">Status</label>
          <br />
          <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div >
        <div className="CountryInput" >
          <label for="image">Image</label>
          <br />
          <input
            type="file"
            id="image"
            name="image"
            multiple
            onChange={handleFileChange}
          />
        </div >

      </div >
      <div className="countryBtn" >
        <button onClick={handleSubmit}>Submit</button>
        <button>Reset</button>
      </div >
    </div >

  )
}

export default State