import React, { useEffect, useState } from 'react'
import motherSon from '../../images/motherson_logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import logoutImg from '../../images/profile/logout.png'
import myAccounts from '../../images/profile/my-accounts.png'
import portalSettings from '../../images/profile/portal-settings.png'
import myProfile from '../../images/profile/my-profile.png'
import personalization from '../../images/profile/personalization.png'
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import axios from 'axios'
import config from '../../config'



const Navbar = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem('encryptionKey', null);
    localStorage.setItem('iv', null);
    localStorage.setItem('encryptedToken', null);
    navigate("/login")
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

  const getFirstCharacter = (word) => {
    return word ? word.charAt(0) : '';
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


  return (
    <div className='navbar'>
      <div className='navbarLeft'>
        <Link to='/home'>
          <img src={motherSon} alt='' />
        </Link>
        <button className='add'>+</button>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0", cursor: "pointer" }}>
          <input type='text' className='search' style={{ cursor: "pointer", paddingRight: "24px" }} />
          <IoSearch style={{ marginLeft: "-35px" }} />
        </div>
      </div>
      <div className='navbarRight'>
        <p className='navbar-items'>
          <TfiEmail size="20px" />
          {/* <img src={mail} style={{ fill: "var(--colors-light-secondary)" }} alt='' /> */}

        </p>
        <p className='navbar-items'>
          <FaRegBell size="20px" />
          {/* <img src={notification} alt='' /> */}
        </p>
        <p className='navbar-items'>
          <FiMessageSquare size="20px" />
          {/* <img src={message} alt='' /> */}
        </p>
        <p className='navbar-items'>
          <IoMdHelpCircleOutline size="20px" />
          {/* <img src={help} alt='' /> */}
        </p>
        <div className="dropdownP">
          <button className="dropbtnProfile">{getFirstCharacter(user.username)}</button>
          <div className="dropdownProfile-content">

            <Link to="/home/profile" >
              <div>
                <button className="dropbtnProfile">{getFirstCharacter(user.username)}</button>
              </div>
              <div>
                <p>{user.email}</p>
                <p>{user.roles} </p>

              </div>
            </Link>
            <hr />
            <Link to="/home/profile" >
              <img src={myProfile} alt='' className="ProfileImage" />My Profile
            </Link>
            <a href="/"><img src={personalization} alt='' className="ProfileImage" />Personalization</a>
            <hr />
            <a href="/"><img src={portalSettings} alt='' className="ProfileImage" />Portal Settings</a><hr />
            <a href="/"><img src={myAccounts} alt='' className="ProfileImage" />My Accounts</a><hr />
            <button className='navbar-itemsBtn' id='logout' onClick={logout}>
              <img src={logoutImg} alt='' className="ProfileImage" />Logout
            </button>
          </div >

        </div >

      </div >
    </div >
  )
}

export default Navbar