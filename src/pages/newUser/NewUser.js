import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import config from '../../config'
import axios from 'axios'
import Select from 'react-select'

const NewUser = ({ sendClose }) => {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [role, setRole] = useState()
  const [error, setError] = useState()
  const [tokens, setTokens] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate()

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  }

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
        setTokens(token);
      })
      .catch(error => console.error('Error fetching protected resource:', error))
  }, [])

  useEffect(() => {
    axios.get(`${config.baseUrl}/rolesPermission`
    )
      .then(response => {
        const formattedOptions = response.data.map(item => ({
          value: item.id, // or any unique identifier
          label: item.name // or any display label you want
        }));
        setRole(formattedOptions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('')

    const postData = {
      username,
      email,
      password,
      role: [selectedOption.label]
    }

    console.log(postData)
    await axios.post(`${config.baseUrl}/signup`, postData, {
      headers: {
        'Authorization': `Bearer ${tokens}`,
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      console.log(response.data);
    })
      .catch(error => console.log(error));
  }


  return (
    <div className="newBasicInfo" >
      <div className="headerNewUser" >
        <h4>
          <button className='roleCloseNewUser' onClick={() => sendClose(false)}>X</button>
          New Members</h4>
      </div >
      <div className="newBasicInfoLeft scrollable" >
        <h6>Basic Information</h6>


        <div className="newUserLeftRight" >
          <div className="newUserInputLeft" >
            <div className="destination-dropdown1" >
              <div className="newUserInputFields" >
                <label for="destination"> Role <span>*</span></label></div >
              < Select
                value={selectedOption}
                onChange={handleChange}
                options={role} />
            </div >
            <div className="newUserInput" >
              <div className="newUserInputFields" >
                <label> Email <span>*</span>
                </label>
              </div >

              <input
                type="email"
                name='email'
                placeholder="Your Team Member Email Id"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div >
          </div >
          <div className="newUserInputRight" >
            <div className="newUserInput" >
              <div className="newUserInputFields" >
                <label>
                  Username <span>*</span>
                </label>
              </div >

              <input
                type="text"
                name='username'
                placeholder="Your Team Member Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div >

            <div className="newUserInput" >
              <div className="newUserInputFields" >
                <label>
                  Password <span>*</span>
                </label></div >
              <input
                type="password"
                placeholder="Type Strong Password For Your Team Member"
                name='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div >
          </div >
        </div >

      </div >
      <div className="countryBtn" >
        <button onClick={handleSignUp} style={{ cursor: "pointer" }}>Submit</button>
        <button >Reset</button>
      </div >
    </div >
  )
}

export default NewUser