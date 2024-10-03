import React, { useEffect, useState } from 'react'
import logo from '../../images/logo2.jpg'
// import loginImage from '../../images/login-image.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import config from '../../config'


const Login = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  async function generateKey() {
    return await crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
  }



  async function encryptToken(token, key) {
    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      enc.encode(token)
    );

    return {
      iv: iv,
      encryptedToken: new Uint8Array(encrypted)
    };
  }

  async function saveEncryptedToken(token) {
    const key = await generateKey();
    const { iv, encryptedToken } = await encryptToken(token, key);

    // Convert to base64 for storage
    const ivBase64 = btoa(String.fromCharCode(...iv));
    const encryptedTokenBase64 = btoa(String.fromCharCode(...encryptedToken));

    // Save the key, iv, and encrypted token in localStorage
    localStorage.setItem('encryptionKey', JSON.stringify(await crypto.subtle.exportKey('jwk', key)));
    localStorage.setItem('iv', ivBase64);
    localStorage.setItem('encryptedToken', encryptedTokenBase64);
  }

  // console.log(ApiData)

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    axios.post(`${config.baseUrl}/signin`, {
      username,
      password
    })
      .then(async (response) => {
        const token = response.data.accessToken;
        await saveEncryptedToken(token);
        navigate('/home')
      })
      .catch(error => {
        setError('Invalid username and password');
        console.log(error)
      });
  }

  return (
    <div className='login-container'>
      <div className='background-line'>
      </div>

      <div className='background-center-lines'>
        <div className='background-center-line1'></div>
        <div className='background-center-line2'></div>
        <div className='background-center-line3'></div>
      </div>

      <div className='login' >
        <div className='form-div'>
          <div className='logo-div'>
            <img src={logo} />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <div className='form-group'>
              <label>Username</label>
              <input type="username"
                id="username"
                name="username"
                placeholder="Enter Your Username"
                onChange={(e) => setUsername(e.target.value)}
                required />
            </div>

            <div className='form-group'>
              <label>Password</label>
              <input type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>

            <div className="form-group">
              <button type="submit" className='login-btn'>Log In</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login