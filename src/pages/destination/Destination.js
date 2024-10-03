import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import config from '../../config';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';

const Destination = ({ sendClose }) => {
  // const [inputValue, setInputValue] = useState("");
  const [countryId, setCountryId] = useState()
  const [country, setCountry] = useState()
  const [stateId, setStateId] = useState()
  const [state, setState] = useState()
  const [countryDetails, setCountryDetails] = useState([])
  const [stateDetails, setStateDetails] = useState([])
  const [countrySelected, setCountrySelected] = useState(null);
  const [stateSelected, setStateSlected] = useState(null);
  const [editorData, setEditorData] = useState("");

  const [newImage, setNewImage] = useState('')

  const [formData, setFormData] = useState({
    destinationName: "",
    descripation: "",
    ipAddress: "",
    status: "",
    // { keyAttractionName: "" }
    // ], // Array of attractions
    country,  // Example country ID
    state,    // Example state ID
    // image: null, // Image file
  });

  const [inputKeyValue, setInputKeyValue] = useState('');
  const [tags, setTags] = useState([]);

  // Handle input change
  const handleInputKeyChange = (e) => {
    setInputKeyValue(e.target.value);
  };

  // Handle input on key down (Enter or Comma)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputKeyValue.trim()) {
        const newTags = inputKeyValue.split(',').map((tag) => tag.trim()).filter(tag => tag !== '');
        setTags([...tags, ...newTags]);
        setInputKeyValue('');
      }
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };


  const navigate = useNavigate()


  const handleCountryChange = (countrySelected) => {
    setCountrySelected(countrySelected);
    setCountryId(countrySelected.value)

    axios.get(`${config.baseUrl}/state/getbycountryid/${countrySelected.value}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        const formattedOptions = response.data.map(item => ({
          value: item.id, // or any unique identifier
          label: item.stateName // or any display label you want
        }));
        setStateDetails(formattedOptions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Remove a specific keyAttraction
  // const removeTag = (indexToRemove) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     keyAttraction: prevState.keyAttraction.filter((_, index) => index !== indexToRemove),
  //   }));
  // };


  const handleStateChange = (stateSelected) => {
    setStateSlected(stateSelected);
    setStateId(stateSelected.value)
  }
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

  useEffect(() => {
    axios.get(`${config.baseUrl}/country/get`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        const formattedCountryOptions = response.data.map(item => ({
          value: item.id, // or any unique identifier
          label: item.countryName // or any display label you want
        }));
        setCountryDetails(formattedCountryOptions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // useEffect(() => {
  //   axios.get(`${config.baseUrl}/keyattraction/get`)
  //     .then((response) => {
  //       const formattedCountryOptions = response.data.map(item => ({
  //         value: item.id, // or any unique identifier
  //         label: item.keyAttractionName // or any display label you want
  //       }));
  //       setKeyAttractions(formattedCountryOptions);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleKeyAttractionsChange = (selectedOptions) => {
  //   setSelectedKeyAttractionIds(selectedOptions.map(option => option.value));
  // };


  // Handle image change
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0])
    // setFormData((prevState) => ({
    //   ...prevState,
    //   image: e.target.files[0],
    //   // Save selected image file
    // }));
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsString = tags.join(', ');


    const formDataToSend = new FormData()


    formDataToSend.append("destinationName", formData.destinationName)
    formDataToSend.append("ipAddress", formData.ipAddress)
    formDataToSend.append("description", editorData)
    formDataToSend.append("status", formData.status)
    formDataToSend.append("country", countryId)
    formDataToSend.append("state", stateId)
    formDataToSend.append("keyAttractions", tagsString);
    formDataToSend.append("image", newImage)

    // for (let [key, value] of formDataToSend.entries()) {
    //   console.log(`${key}:`, value); // Log each key-value pair
    // }


    await axios.post(`${config.baseUrl}/destination/create`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(async (response) => alert('Destination saved Successfully.'))
      .catch(error => console.error(error));

    // navigate("/home")
    // console.log(payload)
  }




  return (
    <div className="destinationMain" >
      <div className="countryFixed" >
        <h3>
          <button className='roleCloseDestination' onClick={() => sendClose(false)}>X</button>
          New Destinations</h3>
      </div >
      <div className="destinationForm scrollable2" >
        <h6>Basic Information</h6>
        <div className="form-group" >
          <label for="country_name">Country Name</label>
          <br />
          <Select
            styles={customStyles}
            value={countrySelected}
            onChange={handleCountryChange}
            options={countryDetails} />
        </div >
        <div className="form-group" >
          <label for="state_name">State Name</label>
          <br />
          <Select
            styles={customStyles}
            value={stateSelected}
            onChange={handleStateChange}
            options={stateDetails} />
        </div >
        <div className="form-group" >
          <label for="destinationName">Destination Name</label>
          <br />
          <input
            type="text"
            id="destination_name"
            name="destinationName"
            placeholder="Enter Destination Name"
            onChange={handleInputChange}
          />
        </div >

        <div className="form-group" >
          <label for="description">Description</label>
          <br />

          <CKEditor
            editor={ClassicEditor}
            data=""
            placeholder="Start typing..."
            onReady={editor => {
              console.log('Editor is ready to use!', editor);
            }}
            value={formData.descripation}
            onChange={
              (event, editor) => {
                const data = editor.getData();
                setEditorData(data)
                // console.log(event.target.data)
                // setFormData((prevState) => ({
                //   ...prevState,
                //   [description]: data,
                // }));
                // handleInputChange;
              }}
          // onBlur={(event, editor) => {console.log('Blur.', editor);}}
          // onFocus={(event, editor) => {console.log('Focus.', editor);}}
          />

        </div >
        <div className="form-group" >
          <label for="key_attractions">Key Attractions</label>
          <br />

          {/* <input
            type="text"
            id="destination_name"
            name="keyAttractions"
            placeholder=""
            onChange={handleInputChange}
          /> */}
          {/* {keyAttraction.map((keyAttraction, index) => (
            <div
              key={index}
              style={{
                display: "inline-block",
                padding: "5px",
                margin: "5px",
                backgroundColor: "#007bff",
                color: "#fff",
                borderRadius: "3px",
              }}
            >
              {keyAttraction.label}
              <span
                onClick={() => removeTag(index)}
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              >
                &times;
              </span>
            </div>
          ))} */}

          {tags.map((tag, index) => (
            <div key={index} style={{
              display: "inline-block",
              padding: "2px",
              margin: "5px",
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: "3px",
            }}>
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  padding: "0"
                }}              >
                &times;
              </button>
            </div>
          ))}

          <input
            type="text"
            value={inputKeyValue}
            onChange={handleInputKeyChange}
            onKeyDown={handleKeyDown}
            placeholder="Add attractions..."
          // style={styles.inputField}
          />



          {/* <input
            type="text"
            id="key_attractions"
            name="key_attraction"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter Key Attractions"
          /> */}

          {/* <Select
            isMulti
            isSearchable
            options={keyAttractions}
            onChange={handleKeyAttractionsChange}
          /> */}

        </div >
        <div className="form-group" >
          <label for="status">Status</label>
          <br />
          <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
            <option value='' disabled>select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div >
        <div className="form-group" >
          <label for="image">Image</label>
          <br />
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          // multiple
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

export default Destination