import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaHome } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { TbChecklist } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FcSalesPerformance } from "react-icons/fc";
import { PiCrownSimpleBold } from "react-icons/pi";
import Roles from '../../pages/roles/Roles';
import Package from '../packages/Package';
import NewUser from '../../pages/newUser/NewUser';
import Country from '../../pages/country/Country';
import State from '../../pages/state/State';
import Hotel from '../../pages/hotel/Hotel';
import Destination from '../../pages/destination/Destination';
import Booking from '../../pages/booking/Booking'
import QuickPackage from '../../pages/quickPackages/QuickPackage'
import members from '../../images/profile/members.png'
import { Link } from 'react-router-dom';
import config from '../../config';
import Itinerary from '../../pages/itinerary/Itinerary';



const Sidebar = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isPackageFormVisible, setIsPackageFormVisible] = useState(false)
  const [newUser, SetNewUser] = useState(false)
  const [addCountry, setAddCountry] = useState(false)
  const [addState, setAddState] = useState(false)
  const [addHotel, setAddHotel] = useState(false)
  const [addBooking, setAddBooking] = useState(false)
  const [quickPackage, setQuickPackage] = useState(false)
  const [addDestination, setAddDestination] = useState(false)
  const [showItineraryForm, setShowItineraryForm] = useState(false)
  const [user, setUser] = useState({})
  const [role, setRole] = useState('')
  const [rolePermission, setRolePermission] = useState([])
  const [permission, setPermission] = useState()



  const showForm = () => {
    setIsFormVisible(true);
    setIsPackageFormVisible(false)
    SetNewUser(false);
    setAddCountry(false);
    setAddState(false)
    setAddDestination(false)
    setAddHotel(false)
  };

  const packageForm = () => {
    setIsFormVisible(false);
    SetNewUser(false);
    setAddCountry(false);
    setAddState(false)
    setAddDestination(false)
    setAddHotel(false)
    setIsPackageFormVisible(true)
  }

  const newUserAdded = () => {
    setIsFormVisible(false);
    setIsPackageFormVisible(false)
    setAddCountry(false);
    setAddState(false)
    setAddDestination(false)
    setAddHotel(false)
    SetNewUser(true);
  }

  const showCountry = () => {
    setIsFormVisible(false);
    setIsPackageFormVisible(false)
    SetNewUser(false);
    setAddState(false)
    setAddDestination(false)
    setAddHotel(false)
    setAddCountry(true);
  }

  const showState = () => {
    setIsFormVisible(false);
    setIsPackageFormVisible(false)
    SetNewUser(false);
    setAddCountry(false);
    setAddDestination(false)
    setAddHotel(false)
    setAddState(true)
  }

  const showHotel = () => {
    setIsFormVisible(false);
    setIsPackageFormVisible(false)
    SetNewUser(false);
    setAddCountry(false);
    setAddState(false)
    setAddDestination(false)
    setAddHotel(true)
  }

  const showDestination = () => {
    setIsFormVisible(false);
    setIsPackageFormVisible(false)
    SetNewUser(false);
    setAddCountry(false);
    setAddState(false)
    setAddHotel(false)
    setAddDestination(true)
  }

  const showBooking = () => {
    setAddBooking(true)
  }

  const showItinerary = () => {
    setShowItineraryForm(true)
  }

  const showQuickPackage = () => {
    setQuickPackage(true)
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

  // useEffect(() => {
  //   axios.get(`${config.baseUrl}/roles/${role}`)
  //     .then(response => {
  //       setRolePermission(response.data);
  //       setPermission(response.data.permissions)
  //       // console.log(response.data.permissions[3].module.actions)
  //     })
  //     .catch(error => console.error(error))
  // }, [])


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
          })
          .then(response => {
            setRolePermission(response.data);
            setPermission(response.data.permissions)
          })
      })
      .then()
      .catch(error => console.error('Error fetching protected resource:', error))
  }, [])

  return (
    <>
      <div className="sidebar">

        <div className="sidebar-item" id='home'>
          <div className='sidebar-icons'>
            <FaHome className='sidebar-icon' size="25px" />
            <p className='menu-name'>Home</p>
          </div>
          <div className="submenu">
            <div className="menuH">
              <p>Home</p>
              {/* <p>+</p> */}
            </div>
            <div className='submenu-btn'>
              <div className="submenu-btn-Buttons">
                <Link to='/home'>
                  <button><p>Quickstart</p></button>
                </Link>
                {Array.isArray(rolePermission.permissions) && rolePermission.permissions.map((perm) => {
                  if (perm.module === 'Dashboard' && perm.actions[0] != undefined)
                    return <Link to='/home/dashboard'>
                      <button><p>Dashboard</p></button></Link>
                })}
              </div>
            </div>
          </div>
        </div>
        {Array.isArray(rolePermission.permissions) && rolePermission.permissions.map((perm) => {
          if (perm.module === 'Packages' && perm.actions[0] !== undefined) {
            return <div className="sidebar-item" id='packages'>
              <div className='sidebar-icons'>
                <FiPackage className='' size="25px" />
                <p className='menu-name'>Packages</p>
              </div>
              <div className="submenu">
                <div className="menuP">
                  <p>Packages</p>
                </div>
                <div className="memberOrganization">
                  <Link to='/home/package' style={{ textDecoration: "none" }}>
                    <div className="teamMember">
                      <img src={members} className="ProfileImage" /> <h6>All Package List</h6>
                    </div>
                  </Link>
                </div>

                <div className='submenu-btn'>
                  <div className="submenu-btn-Buttons">
                    {/* {perm.actions[0].filter((pack) => pack.action === 'Add' ? */}
                    <button onClick={packageForm} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p>New Packages</p>
                      <p>+</p>
                    </button>

                    <button onClick={showQuickPackage}><p>Quick Package</p></button>
                    <Link to='/home/packageDashboard' >
                      <button><p>Packages Dashboard</p></button>
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          }
        })}
        {Array.isArray(rolePermission.permissions) && rolePermission.permissions.map((perm) => {
          if (perm.module === 'Packages' && perm.actions[0] !== undefined) {
            return <div className="sidebar-item" id='booking'>
              <div className='sidebar-icons'>
                <TbChecklist className='sidebar-icon' size="25px" />
                <p className='menu-name'>Bookings</p>
              </div>
              <div className="submenu"><div className="menuB">
                <p>Bookings</p>
              </div>
                <div className='submenu-btn'>
                  <div className="submenu-btn-Buttons">
                    <button style={{ display: 'flex', justifyContent: 'space-between' }}
                      onClick={showBooking}><p>New Bookings</p><p>+</p></button>
                    <Link to='booking/dashboard'>
                      <button><p>Bookings Dashboard</p></button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          }
        })}
        {Array.isArray(rolePermission.permissions) && rolePermission.permissions.map((perm) => {
          if (perm.module === 'MyTeams' && perm.actions[0] !== undefined)
            return <div className="sidebar-item" id='myTeams'>
              <div className='sidebar-icons'>
                <IoIosPeople className='sidebar-icon' size="25px" />
                <p className='menu-name' style={{ minWidth: "max-content" }}>My Teams</p>
              </div>
              <div className='submenu' id="myTeamsId"><div className="teamHeading"><p>My Teams</p>
              </div>
                <div className="memberOrganization">
                  <Link to='/home/myteams' style={{ textDecoration: "none" }}>
                    <div className="teamMember">
                      <img src={members} className="ProfileImage" /> <h6>Members</h6>
                    </div>
                  </Link>
                </div>

                <div className="teamsEmail">
                  <a href="abc@gmail.com" className="EmailSymbol">{user.username[0]} </a>
                  <a href="abc@gmail.com" className="teamsEmail2">{user.email}<p>{user.username}</p></a>
                </div>

                <div className="allUsersLink">
                  <div className="allUsers">
                    <a href="#">All Members</a>
                  </div>
                </div>
                <div className='submenu-btn'>
                  <div className="submenu-btn-Buttons ">
                    <button onClick={showForm} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p>Roles & Permission</p><p>+</p></button>
                    <button onClick={newUserAdded} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p>New Member</p> <p>+</p></button>
                    <button><p>Member Board</p></button>
                  </div>
                </div>
              </div >
            </div>
        })}

        {Array.isArray(rolePermission.permissions) && rolePermission.permissions.map((perm) => {
          if (perm.module === 'Report' && perm.actions[0] !== undefined)
            return <div className="sidebar-item" id='reports'>

              <div className='sidebar-icons'>
                <HiOutlineDocumentReport className='sidebar-icon' size="25px" />
                <p className='menu-name'>Reports</p>
              </div>
              <div className="submenu"> <div className="menuR">
                <p>
                  Reports
                </p>
              </div>
              </div>
            </div>
        })}
        {Array.isArray(rolePermission.permissions) && rolePermission.permissions.map((perm) => {
          if (perm.module === 'Sales' && perm.actions[0] !== undefined)
            return <div className="sidebar-item" id='sales'>

              <div className='sidebar-icons'>
                <FcSalesPerformance className='sidebar-icon' size="25px" />
                <p className='menu-name'>Sales</p>
              </div>
              <div className='submenu'><div className="menuS">
                <p>Sales</p>
              </div>
                <div className='submenu-btn'>
                  <div className="submenu-btn-Buttons">
                    <button onClick={showForm} style={{ display: 'flex', justifyContent: 'space-between' }}><p>Sales Board</p></button>
                  </div>
                </div>
              </div >
            </div>
        })}
        {Array.isArray(rolePermission.permissions) && rolePermission.permissions.map((perm) => {
          if (perm.module === 'Sales' && perm.actions[0] !== undefined)
            return <div className="sidebar-item" id='master'>

              <div className='sidebar-icons'>
                <PiCrownSimpleBold className='sidebar-icon' size="25px" />
                <p className='menu-name'>Masters</p>
              </div>
              <div className="submenu">
                <div className="masterM">
                  <p>Masters</p>
                </div>
                <div className="memberOrganization">
                  <Link to='/home/masterList' style={{ textDecoration: "none" }}>
                    <div className="teamMember">
                      <img src={members} className="ProfileImage" /><h6>Master List</h6>
                    </div>
                  </Link>
                  {/* <Link to='/home/masterList' style={{ textDecoration: "none" }}>
                    <div className="teamMember">

                    </div>
                  </Link> */}
                </div>
                <div className='submenu-btn1'>
                  <div className="masterMenu">
                    <div className="masterMenu1">
                      <button onClick={showCountry}>Country</button>
                    </div>
                    <div className="masterMenu1">
                      <button onClick={showState}>State</button>
                    </div>
                  </div>
                  <div className="masterMenu">
                    <div className="masterMenu1">
                      <button onClick={showDestination}>Destinations</button>
                    </div>
                    <div className="masterMenu1">
                      <button onClick={showHotel}>Hotels</button>
                    </div>
                  </div>

                  <div className="masterMenu">
                    <div className="masterMenu1">
                      <button >Transportation</button>
                    </div>
                    <div className="masterMenu1">
                      <button >Policies</button>
                    </div>
                  </div>
                  <div className="masterMenu">
                    <div className="masterMenu1">
                      <button >Vendors</button>
                    </div>
                    <div className="masterMenu1">
                      <button onClick={showItinerary}>Itinerary</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
        })}
      </div >
      <div className='submenu-menu' style={{ right: isPackageFormVisible ? '0' : '-100%' }}>
        <button className='roleClose'>X</button>
        <Package sendClose={() => setIsPackageFormVisible(false)} />
      </div>
      <div className='submenu-menu' style={{ right: isFormVisible ? '0' : '-100%' }}>
        <button className='roleClose' >X</button>
        <Roles sendClose={() => setIsFormVisible(false)} />
      </div>
      <div className='submenu-menu' style={{ right: newUser ? '0' : '-100%' }}>
        <button className='roleClose'>X</button>
        <NewUser sendClose={() => SetNewUser(false)} />
      </div>
      <div className='submenu-menu' style={{ right: addCountry ? '0' : '-100%' }}>
        <button className='roleClose'>X</button>
        <Country sendClose={() => setAddCountry(false)} />
      </div>
      <div className='submenu-menu' style={{ right: addState ? '0' : '-100%' }}>
        <button className='roleClose'>X</button>
        <State sendClose={() => setAddState(false)} />
      </div>
      <div className='submenu-menu' style={{ right: addHotel ? '0' : '-100%' }}>
        <button className='roleClose'>X</button>
        <Hotel sendClose={() => setAddHotel(false)} />
      </div>
      <div className='submenu-menu' style={{ right: addDestination ? '0' : '-100%' }}>
        <button className='roleClose'>X</button>
        <Destination sendClose={() => setAddDestination(false)} />
      </div>
      <div className='submenu-menu' style={{ right: addBooking ? '0' : '-100%' }}>
        <button className='roleClose'>X</button>
        <Booking sendClose={() => setAddBooking(false)} />
      </div>
      <div className='submenu-menu' style={{ right: quickPackage ? '0' : '-100%' }}>
        <button className='roleClose'>X</button>
        <QuickPackage sendClose={() => setQuickPackage(false)} />
      </div>
      <div className='submenu-menu' style={{ right: showItineraryForm ? '0' : '-100%' }}>
        <button className='roleClose'>X</button>
        <Itinerary sendClose={() => setShowItineraryForm(false)} />
      </div>
    </>

  )
}

export default Sidebar