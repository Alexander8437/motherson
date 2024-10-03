import React, { useEffect, useState } from 'react'
import config from '../../config';
import Select from 'react-select'
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Package = ({ sendClose }) => {
  const [destinationDetails, setDestinationDetails] = useState([])
  const [name, setName] = useState('');
  const [noOfDay, setNoOfDay] = useState(0)
  const [noOfNight, setNoOfNight] = useState(0)
  const [ipAddress, setIpAddress] = useState('')
  const [included, setIncluded] = useState()
  const [excluded, setExcluded] = useState()
  const [editorData, setEditorData] = useState("")
  const [price, setPrice] = useState(0)
  const [gst, setGST] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [destinationId, setDestinationId] = useState()
  const [selectedOption, setSelectedOption] = useState(null)
  const [code, setCode] = useState()
  const [percentValue, setPercentValue] = useState()
  const [condition, setCondition] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [user, setUser] = useState()
  const [status, setStatus] = useState(false)
  const [startTravelDate, setStartTravelDate] = useState()
  const [endTravelDate, setEndTravelDate] = useState()
  const [showItineraryDetails, setShowItineraryDetails] = useState([])
  const [selectedItinerary, setSelectedItinerary] = useState([])
  const [packageDetails, setPackageDetails] = useState(0)

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


  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setDestinationId(selectedOption.value)

    axios.get(`${config.baseUrl}/itinerary/getByDestinationId/${selectedOption.value}`)
      .then((response) => {
        const formattedOptions = response.data.map(item => ({
          value: item.id, // or any unique identifier
          label: 'day: ' + item.itineraryMenu.day + '; Title:' + ' ' + item.itineraryMenu.title + '; Activity: ' + item.activity.activityName,
        }));
        setShowItineraryDetails(formattedOptions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  const handleItineraryChange = (selectedItineraryOption) => {
    setSelectedItinerary(selectedItineraryOption || [])
  }


  useEffect(() => {
    axios.get(`${config.baseUrl}/ipAddress`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
      .then((response) => {
        setIpAddress(response.data);
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

  useEffect(() => {
    axios.get(`${config.baseUrl}/package/getAllPkg`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        if (response.data !== undefined) {
          setPackageDetails(response.data.length)
        }
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itinerariesId = [Array.isArray(selectedItinerary) && selectedItinerary.map(i => { return i.value })]

    const payload = {
      "PackageInfo": {
        "id": "PKG_" + (packageDetails + 1),
        name,
        code,
        "description": {
          "en": editorData
        },
        "duration": {
          "days": noOfDay,
          "nights": noOfNight
        },
        "inclusions": included,
        "exclusions": excluded,
        "discount": {
          "type": "percent",
          "value": percentValue,
          conditions: condition,
          "validity": {
            "discount_startDate": startTravelDate,
            "discount_endDate": endTravelDate
          }
        },
        "metadata": {
          "version": 2,
          "createdBy": user.username,
          "createdAt": Date.now(),
          "lastModifiedBy": "editor_data",
          "lastModifiedAt": 34

        },
        "packagePrice": {
          "price": price,
          "gst": gst,
          "total_price": totalPrice
        },

        "travelDates": {
          "id": "PKG_" + (packageDetails + 1),
          "startDte": startDate,
          "endDte": endDate,
          "available": status
        },
        "destination": {
          "id": destinationId
        }
      },
      "itineraryIds": itinerariesId[0]

    }

    console.log(payload)

    await axios.post(`${config.baseUrl}/package/create`, payload,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => alert('package saved Successfully.'))
      .catch(error => console.error(error));

  }

  return (
    <div className="CreatePackagesHead" >
      <div className="countryFixed" >
        <h3>
          <button className='roleClosePackage' onClick={() => sendClose(false)}>X</button>
          New Packages</h3>
      </div >

      <div className="mainPackage Scrollable" >
        <div className="BasicPackage" >
          <h6>Basic Package Details</h6>
        </div >
        <div className="BasicPackagesInner" >
          <div className="BasicPackagesInnerBox" style={{ width: "100%" }}>
            <div className="destination-dropdown" >
              <label for="destination">Destinations</label>
              <Select
                value={selectedOption}
                onChange={handleChange}
                options={destinationDetails} />
            </div >
          </div >
        </div>
        <div className="BasicPackagesInner">
          <div className="packageInput">
            <label>Package Title</label>
            <input
              type="text"
              placeholder=""
              name=""
              onChange={(e) => setName(e.target.value)}
            />
          </div >
          <div className="packageInput" >
            <label>Package Code</label>
            <input
              type="text"
              placeholder=""
              name="code"
              onChange={(e) => setCode(e.target.value)}
            />
          </div >
          <div className="packageInput" style={{ display: 'flex' }}>
            <div className="packageInput" style={{ width: '50%', marginRight: '5px', marginTop: '-1px' }}>
              <label>No. of Days</label>
              <input
                type="number"
                placeholder="Type Days"
                name=""
                onChange={(e) => setNoOfDay(e.target.value)}

              />
            </div >
            <div className="packageInput" style={{ width: '50%', marginLeft: '5px', marginTop: '-1px' }}>
              <label>No. of Nights</label>
              <input
                type="number"
                placeholder="Type Nights"
                name=""
                onChange={(e) => setNoOfNight(e.target.value)}
              />
            </div >
          </div >
        </div >


        <div className="packageDescription" >
          <h4>Description</h4>
          <div className="mb-3" >

            < CKEditor
              editor={ClassicEditor}
              data=""
              placeholder="Start typing..."
              // onReady={editor => {
              //   console.log('Editor is ready to use!', editor);
              // }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditorData(data);
                // console.log({ event, editor, data });/

              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
            />
          </div >
        </div >
        <div className="BasicPackage" >
          <h6>Itinerary</h6>
        </div >
        <div style={{ display: 'flex', gap: '5px' }}>

          {Array.isArray(selectedItinerary) && selectedItinerary.map((itinerary, index) =>
            <div style={{ padding: '5px', border: "1px solid black", marginBottom: "2px" }}>
              <p>day {index + 1}; {itinerary.label.split(" ")[2]} </p>
            </div>
          )}
        </div>
        <Select
          isMulti
          value={selectedItinerary}
          onChange={handleItineraryChange}
          options={showItineraryDetails}
          closeMenuOnSelect={false}
          isSearchable={true}  // Enables search functionality
        />

        <div className="BasicPackage" >
          <h6>Inclusions / Exclusions</h6>
        </div >
        <div className="BasicPackagesInner" >
          <div className="packageInputInclusions" >
            <label>
              What's Included
            </label>
            <input
              type="text"
              placeholder="Meals &nbsp; Tickets &nbsp; Tours"
              name=""
              onChange={(e) => setIncluded(e.target.value)}
            />
          </div >
        </div >
        <div className="BasicPackagesInner" >
          <div className="packageInputInclusions" >
            <label>
              What's Not Included
            </label>
            <input
              type="text"
              placeholder="Personal Expenses &nbsp; Travel Insurance"
              name=""
              onChange={(e) => setExcluded(e.target.value)}
            />
          </div >
        </div >


        <div className="BasicPackage" >
          <h6>Discount</h6>
        </div >
        <div className="BasicPackagesInner" >
          <div className="packageInputInclusions" >
            <label>
              Value
            </label>
            <input
              type="number"
              placeholder="Enter Discount Percent"
              name=""
              onChange={(e) => setPercentValue(e.target.value)}
            />
          </div >
        </div >
        <div className="BasicPackagesInner" >
          <div className="packageInputInclusions" >
            <label>
              Conditions
            </label>
            <input
              type="text"
              placeholder="Enter Conditions"
              name=""
              onChange={(e) => setCondition(e.target.value)}
            />
          </div >
        </div >

        <div className="BasicPackagesInner" style={{ display: 'flex', width: "100%" }}>
          <div className="packageInputInclusions" style={{ width: '50%', marginRight: '5px', marginTop: '-1px' }}>
            <label>Discount Start Date</label>
            <input
              type="date"
              placeholder="Type Number of Days"
              name=""
              onChange={(e) => setStartDate(e.target.value)}

            />
          </div >
          <div className="packageInput" style={{ width: '50%', marginLeft: '5px', marginTop: '-1px' }}>
            <label>Discount End date</label>
            <input
              type="date"
              placeholder="Type Number of Nights"
              name=""
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div >
        </div >
        <div className="BasicPackage" >
          <h6>Travel Details</h6>
        </div >
        <div className="BasicPackagesInner" >
          <div className="packageInput" >
            <label>
              Start date
            </label>
            <input
              type="date"
              placeholder=""
              name=""
              onChange={(e) => setStartTravelDate(e.target.value)}
            />
          </div >
          <div className="packageInput" >
            <label>
              End Date
            </label>
            <input
              type="date"
              placeholder=""
              name=""
              onChange={(e) => setEndTravelDate(e.target.value)}
            />
          </div >
          <div className="packageInput" >
            <label>
              Status
            </label>
            <select onChange={(e) => setStatus(e.target.value)}
              style={{ width: "100%", height: "50%", borderRadius: "5px", marginTop: "3px" }}>
              <option value={true}>Avaliable</option>
              <option value={false}>Not Avaliable</option>
            </select>
          </div >
        </div >



        <div className="BasicPackage" >
          <h6>Package Price</h6>
        </div >
        <div className="BasicPackagesInner" >
          <div className="packageInput" >
            <label>
              Actual price
            </label>
            <input
              type="text"
              placeholder=""
              name=""
              onChange={(e) => setPrice(e.target.value)}
            />
          </div >
          <div className="packageInput" >
            <label>
              GST
            </label>
            <input
              type="text"
              placeholder=""
              name=""
              onChange={(e) => setGST(e.target.value)}
            />
          </div >
          <div className="packageInput" >
            <label>
              Total Price
            </label>
            <input
              type="text"
              placeholder=""
              name=""

              onChange={(e) => setTotalPrice(e.target.value)}
            />
          </div >
        </div >

      </div >
      <div className="countryBtn" >
        <button onClick={handleSubmit}>Submit</button>
        <button>Reset</button>
      </div >
    </div >

  )
}

export default Package