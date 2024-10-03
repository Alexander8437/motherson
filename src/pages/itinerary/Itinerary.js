import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios';
import config from '../../config.js';

const Itinerary = ({ sendClose }) => {

  const [destinationDetails, setDestinationDetails] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinationId, setDestinationId] = useState(null);
  const [itineraries, setItineraries] = useState([
    {
      itineraryMenu: {
        startCity: "",
        destinationCity: "",
        day: 1,
        title: "",
        description: ""
      },
      activity: {
        activityName: ""
      },
      mealPlan: {
        breakfast: false,
        bunch: false,
        dinner: false
      },
      transport: {
        trsnportType: "",
        details: ""
      },
      image: null
    }
  ]);


  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    const updatedItinerary = [...itineraries];
    updatedItinerary[index].image = file;
    setItineraries(updatedItinerary);
  };


  // Handle input change for itineraries
  const handleInputChange = (index, section, field, value) => {
    const newItineraries = [...itineraries];
    newItineraries[index][section][field] = value;
    setItineraries(newItineraries);
  };

  const handleDestinationChange = (selectedDestination) => {
    setSelectedDestination(selectedDestination);
    setDestinationId(selectedDestination.value)
  }
  useEffect(() => {
    axios.get(`${config.baseUrl}/destination/getall`
    )
      .then(response => {
        const formattedOptions = response.data.map(item => ({
          value: item.id, // or any unique identifier
          label: item.destinationName // or any display label you want
        }));
        setDestinationDetails(formattedOptions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleAddForm = (index) => {
    const newItinerary = {
      itineraryMenu: {
        startCity: "",
        destinationCity: "",
        day: itineraries.length + 1,
        title: "",
        description: ""
      },
      activity: {
        activityName: ""
      },
      mealPlan: {
        breakfast: false,
        bunch: false,
        dinner: false
      },
      transport: {
        transportType: "",
        details: ""
      },
      image: null
    };



    const newItineraries = [...itineraries];
    newItineraries.splice(index + 1, 0, newItinerary);

    // Reorder days to keep them in serial order
    const reorderedItineraries = newItineraries.map((itinerary, i) => ({
      ...itinerary,
      itineraryMenu: { ...itinerary.itineraryMenu, day: i + 1 }
    }));

    setItineraries(reorderedItineraries);
  };

  // Handle deleting a form
  const handleDeleteForm = (index) => {
    if (itineraries.length > 1) {
      const newItineraries = itineraries.filter((_, i) => i !== index);

      // Reorder days to keep them in serial order
      const reorderedItineraries = newItineraries.map((itinerary, i) => ({
        ...itinerary,
        itineraryMenu: { ...itinerary.itineraryMenu, day: i + 1 }
      }));

      setItineraries(reorderedItineraries);
    } else {
      alert("You must have at least one itinerary.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    for (let i = 0; i < itineraries.length; i++) {
      // var text = itineraries[i];

      const data = new FormData();
      data.append("itineraryMenu.title", itineraries[i].itineraryMenu.title);
      data.append("itineraryMenu.startCity", itineraries[i].itineraryMenu.startCity);
      data.append("itineraryMenu.destinationCity", itineraries[i].itineraryMenu.destinationCity);
      data.append("itineraryMenu.description", itineraries[i].itineraryMenu.description);
      data.append("itineraryMenu.day", itineraries[i].itineraryMenu.day);
      data.append("activity.activityName", itineraries[i].activity.activityName);
      data.append("transport.trsnportType", itineraries[i].transport.trsnportType);
      data.append("transport.details", itineraries[i].transport.details);
      data.append("mealPlan.breakfast", itineraries[i].mealPlan.breakfast);
      data.append("mealPlan.bunch", itineraries[i].mealPlan.bunch);
      data.append("mealPlan.dinner", itineraries[i].mealPlan.dinner);
      data.append('destination', destinationId);
      data.append('image', itineraries[i].image);

      await axios.post(`${config.baseUrl}/itinerary/create`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(async (response) => {
          console.log(response)
        })
        .catch(error => console.log(error));


    }
    alert('Itinerary saved Successfully.')
  }

  return (


    <div class="countryStart">
      <div class="countryFixed">
        <h3>
          <button className='roleCloseCountry' onClick={sendClose}>X</button>
          New Itinerary</h3>
      </div>

      <div class="country scrollable2">

        <h6>List of Itinerary</h6>

        <div class="CountryInput">
          <label>Destination Name</label>
          <br />
          <Select
            value={selectedDestination}
            onChange={handleDestinationChange}
            options={destinationDetails} />
          {/* <input
            type="text"
            placeholder="Destination Name"
            name="destinationName"
            onChange={handleChange}

          /> */}
        </div>
        {/* <div class="CountryInput">
          <label>Title</label>
          <br />
          <input
            type="text"
            placeholder=""
            name="name"
            // onChange={handleInputChange}
            value={itineraries.}
            onChange={(e) =>
              handleInputChange(1, "itineraryMenu", "title", e.target.value)
            }
          />
        </div> */}

        {/* <div className="fCountryInput" >
          <label for="image">Image</label>
          <br />
          <input
            type="file"
            id="image"
            name="image"
            style={{ marginBottom: "15px" }}
            multiple
            onChange={handleImageChange}
          /> */}
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
        {/* </div > */}

        {Array.isArray(itineraries) && itineraries.map((itinerary, index) => (
          <div class="accordion" key={index}>
            <details>
              <summary>Day {index + 1}</summary>
              <div class="accordion-content">
                <div class="itineraryInputInner" style={{ width: "100%" }}>
                  <label>Title</label>
                  <input type="text" placeholder="" name="title"
                    value={itinerary.itineraryMenu.title}
                    onChange={(e) =>
                      handleInputChange(index, "itineraryMenu", "title", e.target.value)
                    }
                  />
                </div>
                {/* </div> */}
                <div class="itineraryCity" style={{ width: "100%", display: "flex", gap: "20px" }}>
                  <div class="itineraryInputInner">
                    <label>Start City</label>
                    <br />
                    <input
                      type="text"
                      placeholder=""
                      name="name"
                      value={itinerary.itineraryMenu.startCity}
                      onChange={(e) =>
                        handleInputChange(index, "itineraryMenu", "startCity", e.target.value)
                      }

                    />

                  </div>
                  <div class="itineraryInputInner">
                    <label>End City</label>
                    <br />
                    <input
                      type="text"
                      placeholder=""
                      name="name"
                      value={itinerary.itineraryMenu.destinationCity}
                      onChange={(e) =>
                        handleInputChange(index, "itineraryMenu", "destinationCity", e.target.value)
                      }
                    />
                  </div>
                </div>


                <div class="itineraryDescription">
                  <label for="description">Description</label>
                  <br />
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    placeholder=""
                    value={itinerary.itineraryMenu.description}
                    onChange={(e) => handleInputChange(index, "itineraryMenu", "description", e.target.value)}

                  ></textarea>

                  <label for="description">Activities</label>
                  <br />
                  <textarea
                    id="activityName"
                    name="activityName"
                    rows="4"
                    placeholder=""
                    value={itinerary.activity.activityName}
                    onChange={(e) =>
                      handleInputChange(index, "activity", "activityName", e.target.value)
                    }
                  ></textarea>
                </div>
                <div class="CountryInput">
                  <label>Transportation</label>
                  <br />
                  <input
                    type="text"
                    placeholder=""
                    name=""
                    value={itinerary.transport.trsnportType}
                    onChange={(e) => handleInputChange(index, "transport", "trsnportType", e.target.value)}

                  />
                </div>
                <div class="itineraryDescription">
                  <label for="details">Transportation Details</label>
                  <br />
                  <textarea
                    id="details"
                    name="details"
                    rows="4"
                    placeholder=""
                    value={itinerary.transport.details}
                    onChange={(e) =>
                      handleInputChange(index, 'transport', 'details', e.target.value)
                    }
                  ></textarea>
                </div>

                <div class="itineraryMeals">
                  <label>Meals</label>
                  <div class="mealsInput">
                    <div class="IMInput">
                      <input type="checkbox" placeholder="" name="meals"
                        value={itinerary.mealPlan.breakfast}
                        onChange={(e) =>
                          handleInputChange(index, 'mealPlan', 'breakfast', e.target.checked)}
                      />
                      <label>Breakfast</label>
                    </div>
                    <div class="IMInput">
                      <input type="checkbox" placeholder="" name="meals"
                        value={itinerary.mealPlan.bunch}
                        onChange={(e) =>
                          handleInputChange(index, 'mealPlan', 'bunch', e.target.checked)}
                      />
                      <label>Lunch</label>
                    </div>
                    <div class="IMInput">
                      <input type="checkbox" placeholder="" name="meals"
                        value={itinerary.mealPlan.dinner}
                        onChange={(e) =>
                          handleInputChange(index, 'mealPlan', 'dinner', e.target.checked)}
                      />
                      <label>Dinner</label>
                    </div>
                  </div>
                </div>

                <div className="fCountryInput" >
                  <label for="image">Image</label>
                  <br />
                  <input
                    type="file"
                    id="image"
                    name="image"
                    style={{ marginBottom: "15px" }}
                    multiple
                    onChange={(event) => handleImageChange(index, event)}
                  />
                </div >
              </div>
            </details>
            <div class="itineraryButtons">
              <button
                onClick={() => handleAddForm(index)}
              >+</button>
              <button onClick={() => handleDeleteForm(index)}>-</button>
            </div>
          </div>
        ))}
      </div>
      <div class="countryBtn">
        <button onClick={handleSubmit}>Submit</button>
        <button >Reset</button>
      </div>
    </div>


  )
}

export default Itinerary