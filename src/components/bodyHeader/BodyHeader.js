import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import config from '../../config'

const BodyHeader = () => {
  const [user, setUser] = useState({})
  const [role, setRole] = useState('')
  const [rolePermission, setRolePermission] = useState([])
  const [permission, setPermission] = useState([])
  const location = useLocation();
  const activeTab = location.pathname;

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
        return axios.get(`${config.baseUrl}/getbytoken`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
          }
        });
      })
      .then(response => {
        setUser(response.data);
        setRole(response.data.roles[0])
        axios.get(`${config.baseUrl}/roles/${response.data.roles[0]}`,
          {
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          }
        )
          .then(response => {
            setRolePermission(response.data);
            setPermission(response.data.permissions)
          })
      })
      .catch(error => console.error('Error fetching protected resource:', error))
  }, [])

  return (
    <div className="body-links">
      <div className='body-home'>
        <button className='header-button' id='header-home'>Home</button>
      </div>
      {/* <div className='body-center'>
        <Link to='/home'>
          <button className='header-button'
            style={{
              borderBottom: activeTab === '/home' ? '4px solid #941010' : 'none',
            }}
          >Quickstart</button></Link>
      </div> */}
      {Array.isArray(rolePermission.permissions) &&
        rolePermission.permissions.map((perm) => {
          if (perm.module === 'Dashboard' && perm.actions[0] != undefined)
            return <div className='body-center'>
              <Link to='/home'
              ><button className='header-button'
                style={{
                  borderBottom: activeTab === '/home' ? '4px solid #941010' : 'none',
                }}
              >Quickstart</button></Link>
              <Link to='/home/dashboard'>
                <button className='header-button'
                  style={{
                    borderBottom: activeTab === '/home/dashboard' ? '4px solid #941010' : 'none',
                  }}
                >Dashboard</button></Link>

            </div>
          else if (perm.module === 'Dashboard' && (perm.actions[0] === undefined || perm.actions[0] === null))
            return <div className='body-center'>
              <Link to='/home'
              ><button className='header-button'
                style={{
                  borderBottom: activeTab === '/home' ? '4px solid #941010' : 'none',
                }}
              >Quickstart</button></Link>
            </div>

        })}
      {/* {Array.isArray(rolePermission.permissions) && (rolePermission.permissions.module === 'Dashboard')
        ?
        <div className='body-center'>
          <Link to='/home'
          ><button className='header-button'
            style={{
              borderBottom: activeTab === '/home' ? '4px solid #941010' : 'none',
            }}
          >Quickstart</button></Link>
          <Link to='/home/dashboard'>
            <button className='header-button'
              style={{
                borderBottom: activeTab === '/home/dashboard' ? '4px solid #941010' : 'none',
              }}
            >Dashboard</button></Link>

        </div> : */}
      {/* <div className='body-center'>
          <Link to='/home'
          ><button className='header-button'
            style={{
              borderBottom: activeTab === '/home' ? '4px solid #941010' : 'none',
            }}
          >Quickstart</button></Link>
        </div> */}
      {/* } */}
      <div><p></p></div>
    </div>
  )
}

export default BodyHeader