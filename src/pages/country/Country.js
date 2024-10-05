import React, { useEffect, useState } from 'react'
import axios from 'axios';
import config from '../../config.js';


const Country = ({ sendClose, fetchData }) => {
  const [countryName, setCountryName] = useState();
  const [code, setCode] = useState();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [status, setStatus] = useState('inactive')

  const [formData, setFormData] = useState({
    countryName, code, ipAddress: "", status,
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleFileChange = (event) => {
  //   const formData = new FormData();
  //   const f = event.target.files[0];
  //   formData.append('image', f)
  //   setSelectedFiles(f);
  //   console.log(URL.createObjectURL(f))
  //   console.log(f)
  //   console.log(formData.file)

  // };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDatasend = new FormData();
    formDatasend.append('countryName', formData.countryName)
    formDatasend.append('code', formData.code)
    formDatasend.append('ipAddress', formData.ipAddress)
    formDatasend.append('status', formData.status)
    formDatasend.append('image', formData.image)

    if (formData.countryName && formData.code) {

      await axios.post(`${config.baseUrl}/country/createcountry`, formDatasend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
        .then(async (response) => fetchData())
        .catch(error => console.log(error));
    }
    else {
      alert("enter data")
    }
  };

  useEffect(() => {
    axios.get(`${config.baseUrl}/ipAddress`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        setFormData({
          ...formData, "ipAddress": response.data
        })
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (


    <div className="countryStart" >
      <div className="countryFixed" >
        <h3>
          <button className='roleCloseCountry' onClick={() => sendClose(false)}>X</button>
          New Country</h3>
      </div >
      <div className="country scrollable2" >
        <h6>Basic Information</h6>
        <div className="stateFlexBox" >
          <div className="CountryInput" style={{ width: '50%', marginRight: '5px' }}>
            <label>Country Name</label>
            <br />
            <input
              type="text"
              placeholder="Country Name"
              name="countryName"
              value={formData.countryName}
              onChange={handleInputChange
                // (e) => setCountryName(e.target.value)
              }

            />
          </div >
          <div className="CountryInput" style={{ width: '50%', marginRight: '5px' }}>
            <label>
              Code
            </label>
            <br />
            <input
              type="text"
              placeholder="Code"
              name="code"
              value={formData.code}
              onChange={handleInputChange
                // (e) => setCode(e.target.value)
              }
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
            onChange={handleFileChange}
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

export default Country