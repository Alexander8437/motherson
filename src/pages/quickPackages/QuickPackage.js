import React, { useState } from 'react'
import './quickPackage.css'

const QuickPackage = ({ sendClose }) => {

  const [keyAttractions, setKeyAttractions] = useState([]);
  const [inputValue, setInputValue] = useState('');


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
    setKeyAttractions(keyAttractions.filter((_, index) => index !== indexToRemove));
  };

  // Open the modal for source code editing
  function openModal() {
    // Get the editor's content and populate the modal textarea
    document.getElementById('sourceCode').value = document.getElementById('editor').value;
    document.getElementById('sourceCodeModal').style.display = 'flex';
  }

  // Update the editor content from the modal
  function updateEditorContent() {
    var sourceCode = document.getElementById('sourceCode').value;
    document.getElementById('editor').value = sourceCode;  // Set the textarea content with the new HTML
    closeModal(); // Close the modal after saving
  }

  // Close the modal
  function closeModal() {
    document.getElementById('sourceCodeModal').style.display = 'none';
  }




  return (
    <div className="CreatePackagesHead" >
      <div className="countryFixed" >
        <h3>
          <button className='roleClosePackage' onClick={() => sendClose(false)}>X</button>
          Quick Packages</h3>
      </div >

      <div className="mainPackage Scrollable" >
        <div className="BasicPackage" >
          <h6>Basic Package Details</h6>
        </div >
        <div className="BasicPackagesInner" >
          <div className="BasicPackagesInnerBox" >
            <div className="destination-dropdown" >
              <label for="destination">Destinations</label>
              <select id="destination" className="destination-select" >
                <option value="" disabled selected>Select Destinations</option>
                <option value="new-york">New York</option>
                <option value="paris">Paris</option>
                <option value="tokyo">Tokyo</option>
                <option value="london">London</option>
                <option value="sydney">Sydney</option>
              </select >
            </div >
          </div >
          <div className="packageInput" >
            <label>Package Name</label>
            <input
              type="text"
              placeholder=""
              name=""
            />
          </div >
          <div className="packageInput" >
            <label>Package Title</label>
            <input
              type="text"
              placeholder=""
              name=""
            />
          </div >
          <div className="packageInput" style={{ display: 'flex' }}>
            <div className="packageInput" style={{ width: '50%', marginRight: '5px', marginTop: '-1px' }}>
              <label>No. of Days</label>
              <input
                type="text"
                placeholder="Type Days"
                name=""
              />
            </div >
            <div className="packageInput" style={{ width: '50%', marginLeft: '5px', marginTop: '-1px' }}>
              <label>No. of Nights</label>
              <input
                type="text"
                placeholder="Type Nights"
                name=""
              />
            </div >
          </div >
        </div >


        <div className="packageDescription" >
          <h4>Description</h4>
          <form>
            <div className="mb-3">
              <textarea id="editor" name="content" className="form-control"></textarea>
            </div >
            <button type="submit" className="btn btn-primary" > Save</button >
          </form >
        </div >

        <div id="sourceCodeModal" className="modal" >
          <div className="modal-content" >
            <div className="modal-header" >
              <h5>Edit Source Code</h5>
              <button className="close-btn" onclick="closeModal()" > X</button >
            </div >
            <div className="modal-body" >
              <textarea id="sourceCode" className="form-control" rows="10" ></textarea >
            </div >
            <div className="modal-footer" >
              <button className="save-btn" onclick="updateEditorContent()" > Save changes</button >
              <button className="close-btn" onclick="closeModal()" > Close</button >
            </div >
          </div >
        </div >

        <button className="source-code-btn" onclick="openModal()" > Edit Source Code</button >

        <div className="BasicPackage" >
          <h6>Itinerary</h6>
        </div >
        {
          keyAttractions.map((keyAttractions, index) => (
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
              {keyAttractions}
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
          ))
        }
        < input className="itinerary"
          type="text"
          id="key_attractions"
          name="key_attractions"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder=""

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
            />
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
            />
          </div >
        </div >

      </div >
      <div className="countryBtn" >
        <button>Submit</button>
        <button>Reset</button>
      </div >
    </div >

  )
}

export default QuickPackage