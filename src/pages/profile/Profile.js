import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../../config';
import edit from './images/profile/edit.png'
import facebook from './images/profile/facebook.png'
import linkedIn from './images/profile/linkedin.png'
import twitter from './images/profile/twitter.png'

const Profile = () => {
  const [user, setUser] = useState({})


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

  const getFirstCharacter = (word) => {
    return word ? word.charAt(0) : '';
  }
  // Example usage to make an authenticated request
  useEffect(() => {
    getDecryptedToken()
      .then(token => {
        return axios.get(`${config.baseUrl}/getbytoken`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => console.error('Error fetching protected resource:', error))
  }, [])

  return (<div className='profileBody'>
    <div class="profileMain">
      <div class="profileMainLeft">
        <h2>Profile</h2>
      </div>
      <div class="profileMainRight">
        <p>{getFirstCharacter(user.username)}</p>
      </div>
    </div>
    <div class="profileSecond">
      <div class="profileSecondLeft">
        <div class="profileBigTask">
          <p>{getFirstCharacter(user.username)}</p>
          <h6>
            <span>{user.username}</span>
            <br />
            {user.email} | {user.phone} |
          </h6>
        </div>
      </div>
      <div class="profileSecondRight">
        <button><img src={edit} /> Edit Profile</button>
      </div>
    </div>
    <div class="profileSecurity">
      <button class="profileSecurityBtn">Profile</button>
      <button class="profileSecurityBtn">Security</button>
      <hr />
      <div class="section-header">Work Information</div>
      <div class="info-grid">
        <div>
          <label>First Name <span>*</span></label>
          {user.username}
        </div>
        <div>
          <label>Middle Name</label>
          -
        </div>
        <div>
          <label>Last Name <span>*</span></label>

        </div>
        <div>
          <label>Work Number</label>
          8899889988
        </div>
        <div>
          <label>Mobile Number</label>
          -
        </div>
        <div>
          <label></label>
        </div>

        <div>
          <label>Company Name</label>
          Tourbom
        </div>
        <div>
          <label>Job Title</label>
          -
        </div>
      </div>
      <hr />
      <div class="section-header">Other Information</div>
      <div class="info-grid">
        <div>
          <label>Language</label>
          English
        </div>
        <div>
          <label>Time Zone</label>
          (GMT-04:00) Eastern Time (US & Canada)
        </div>
        <div>
          <label></label>
          <div class="social-icons"></div>
        </div>
        <div>
          <label>Facebook URL</label>
          <div class="social-icons">
            <a href="#">
              <img src={facebook} />
            </a>
          </div>
        </div>
        <div>
          <label>LinkedIn URL</label>
          <div class="social-icons">
            <a href="#">
              <img src={linkedIn} />
            </a>
          </div>
        </div>
        <div>
          <label>Twitter URL</label>
          <div class="social-icons">
            <a href="#">
              <img src={twitter} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Profile