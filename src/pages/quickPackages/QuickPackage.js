import React, { useEffect, useState } from "react";
import Select from 'react-select';
import "./quickPackage.css"; // Ensure you have the CSS file for styling
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import config from "../../config";

const QuickPackage = ({ sendClose }) => {
  const [keyAttractions, setKeyAttractions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedPackageNames, setSelectedPackageNames] = useState([]);
  const [destinationDetails, setDestinationDetails] = useState([])
  const [packageDetails, setPackageDetails] = useState(0)

  // Sample data for package name dropdown
  const packageOptions = [
    { value: "pkg1", label: "Package 1 - New York" },
    { value: "pkg2", label: "Package 2 - Paris" },
    { value: "pkg3", label: "Package 3 - Tokyo" },
    { value: "pkg4", label: "Package 4 - London" },
    { value: "pkg5", label: "Package 5 - Sydney" },
  ];

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ";") {
      if (inputValue.trim() !== "") {
        setKeyAttractions([...keyAttractions, inputValue.trim()]);
        setInputValue("");
      }
      e.preventDefault();
    }
  };

  const removeTag = (indexToRemove) => {
    setKeyAttractions(
      keyAttractions.filter((_, index) => index !== indexToRemove)
    );
  };

  const handlePackageChange = (selectedOptions) => {
    setSelectedPackageNames(selectedOptions || []);
  };

  // Open the modal for source code editing
  function openModal() {
    document.getElementById("sourceCode").value =
      document.getElementById("editor").value;
    document.getElementById("sourceCodeModal").style.display = "flex";
  }

  // Update the editor content from the modal
  function updateEditorContent() {
    var sourceCode = document.getElementById("sourceCode").value;
    document.getElementById("editor").value = sourceCode;
    closeModal();
  }

  // Close the modal
  function closeModal() {
    document.getElementById("sourceCodeModal").style.display = "none";
  }

  return (
    <div className="CreatePackagesHead">
      <div className="countryFixed">
        <h3>
          <button className="roleClosePackage" onClick={() => sendClose(false)}>
            X
          </button>
          Quick Packages
        </h3>
      </div>

      <div className="mainPackage Scrollable">
        <div className="BasicPackage">
          <h6>Basic Package Details</h6>
        </div>
        <div className="BasicPackagesInner">
          <div className="BasicPackagesInnerBox">
            <div className="destination-dropdown">
              <label htmlFor="destination">Destinations</label>
              <select id="destination" className="destination-select">
                <option value="" disabled selected>
                  Select Destinations
                </option>
                <option value="new-york">New York</option>
                <option value="paris">Paris</option>
                <option value="tokyo">Tokyo</option>
                <option value="london">London</option>
                <option value="sydney">Sydney</option>
              </select>
            </div>
          </div>
          <div className="packageInput">
            <label>Package Name</label>
            <Select
              options={packageOptions}
              isMulti
              value={selectedPackageNames}
              onChange={handlePackageChange}
              placeholder="Select Packages"
              isClearable={false}
              closeMenuOnSelect={false}
              classNamePrefix="select"
            />
          </div>
          <div className="packageInput">
            <label>Package Title</label>
            <input type="text" placeholder="" name="" />
          </div>
          <div className="packageInput" style={{ display: "flex" }}>
            <div
              className="packageInput"
              style={{ width: "50%", marginRight: "5px", marginTop: "-1px" }}
            >
              <label>No. of Days</label>
              <input type="text" placeholder="Type Days" name="" />
            </div>
            <div
              className="packageInput"
              style={{ width: "50%", marginLeft: "5px", marginTop: "-1px" }}
            >
              <label>No. of Nights</label>
              <input type="text" placeholder="Type Nights" name="" />
            </div>
          </div>
        </div>

        <div className="packageDescription">
          <h4>Description</h4>
          <form>
            <div className="mb-3">
              <CKEditor
                editor={ClassicEditor}
                data=""
                placeholder="Start typing..."
                // style={{ height: "400px" }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                }}
                onBlur={(event, editor) => {
                  // console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  // console.log("Focus.", editor);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>

        <div id="sourceCodeModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Edit Source Code</h5>
              <button className="close-btn" onClick={closeModal}>
                X
              </button>
            </div>
            <div className="modal-body">
              <textarea
                id="sourceCode"
                className="form-control"
                rows="10"
              ></textarea>
            </div>
            <div className="modal-footer">
              <button className="save-btn" onClick={updateEditorContent}>
                Save changes
              </button>
              <button className="close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>

        <button className="source-code-btn" onClick={openModal}>
          Edit Source Code
        </button>

        <div className="BasicPackage">
          <h6>Itinerary</h6>
        </div>
        {keyAttractions.map((attraction, index) => (
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
            {attraction}
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
        ))}
        <input
          className="itinerary"
          type="text"
          id="key_attractions"
          name="key_attractions"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add key attractions..."
        />

        <div className="BasicPackage">
          <h6>Inclusions / Exclusions</h6>
        </div>
        <div className="BasicPackagesInner">
          <div className="packageInputInclusions">
            <label>What's Included</label>
            <input
              type="text"
              placeholder="Meals, Tickets, Tours"
              name=""
            />
          </div>
        </div>
        <div className="BasicPackagesInner">
          <div className="packageInputInclusions">
            <label>What's Not Included</label>
            <input
              type="text"
              placeholder="Personal Expenses, Travel Insurance"
              name=""
            />
          </div>
        </div>

        <div className="BasicPackage">
          <h6>Package Price</h6>
        </div>
        <div className="BasicPackagesInner">
          <div className="packageInput">
            <label>Actual Price</label>
            <input type="text" placeholder="" name="" />
          </div>
          <div className="packageInput">
            <label>GST</label>
            <input type="text" placeholder="" name="" />
          </div>
          <div className="packageInput">
            <label>Total Price</label>
            <input type="text" placeholder="" name="" />
          </div>
        </div>
      </div>
      <div className="countryBtn">
        <button>Submit</button>
        <button>Reset</button>
      </div>
    </div>
  );
};

export default QuickPackage;
