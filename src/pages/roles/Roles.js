import React, { useState } from 'react'
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';

const Roles = ({ sendClose }) => {
  const [roleName, setRoleName] = useState('');
  const [description, setDescription] = useState('')
  const [permissions, setPermissions] = useState({
    Dashboard: { selected: false, actions: { Dashboard: false } },
    Packages: {
      selected: false,
      actions: {
        View: false,
        Add: false,
        Edit: false,
        Delete: false,
      },
    },
    Bookings: {
      selected: false,
      actions: {
        View: false,
        Add: false,
        Edit: false,
        Delete: false,
      },
    },

    MyTeams: {
      selected: false,
      actions: {
        View: false,
        Add: false,
        Edit: false,
        Delete: false,
      },
    },
    Report: {
      selected: false,
      actions: {
        View: false,
        Add: false,
        Edit: false,
        Delete: false,
      },
    },
    Sales: {
      selected: false,
      actions: {
        View: false,
        Add: false,
        Edit: false,
        Delete: false,
      },
    },
    Master: {
      selected: false,
      actions: {
        View: false,
        Add: false,
        Edit: false,
        Delete: false,
      },
    },
  });

  const navigate = useNavigate()

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
  };

  const handleToggle = (section, action) => {
    setPermissions((prevPermissions) => {
      const newActions = {
        ...prevPermissions[section].actions,
        [action]: !prevPermissions[section].actions[action],
      };
      return {
        ...prevPermissions,
        [section]: {
          ...prevPermissions[section],
          actions: newActions,
        },
      };
    });
  };

  const handleSelectAll = (section) => {
    setPermissions((prevPermissions) => {
      const allSelected = !prevPermissions[section].selected;
      const newActions = Object.fromEntries(
        Object.keys(prevPermissions[section].actions).map((action) => [
          action,
          allSelected,
        ])
      );
      return {
        ...prevPermissions,
        [section]: {
          ...prevPermissions[section],
          selected: allSelected,
          actions: newActions,
        },
      };
    });
  };

  // const handleSubmit = () => {
  //   Object.entries(permissions).map(([module, data]) => ({
  //     module,
  //     actions: Object.entries(data.actions)
  //       .filter(([, selected]) => selected)
  //       .map(([action]) => action),
  //   }))
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: roleName.toUpperCase(),
      description: description,
      permissions: Object.entries(permissions).map(([module, data]) => ({
        module,
        actions: Object.entries(data.actions)
          .filter(([, selected]) => selected)
          .map(([action]) => action),
      })),
    };

    if (roleName) {
      await axios.post(`${config.baseUrl}/all`,
        payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(async (response) => console.log(response.data))
        .catch(error => console.error(error));

      navigate('/home/myteams/roles')
      window.location.reload(true)
    } else {
      alert('Role name cant be empty')
    }
    ;
  }

  return (
    <div className="form-container" style={{ display: 'flex', flexDirection: 'column' }
    }>
      <div className="roleFixedHeader" >
        <h4><button className='roleClose' onClick={() => sendClose(false)}>X</button>
          Manage Roles and Permissions</h4>
      </div >
      <hr />
      <div style={{ display: 'flex' }}>
        <div className="rolesPermissionHead">
          <div className="RPNEWFLEXBOX scrollable2">
            <div className="rpnewroleleft">
              <div className="RPBasicInformation">
                <h6>Basic Information</h6>
                <label>
                  Role Name <span>*</span>
                </label>
                <br />
                <input type="text" placeholder="Type role name" name="name"
                  onChange={(e) => setRoleName(e.target.value)} required />
                <br />
                <label>Description</label>
                <br />
                <textarea placeholder="Type role description" name="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="roleP" >
                <h3>Select all permissions</h3>
                {
                  Object.entries(permissions).map(([section, { actions }]) => (
                    <div key={section} style={{ marginTop: '20px' }}>
                      <h4>Select all of {section}</h4>
                      <button
                        type="button"
                        onClick={() => handleSelectAll(section)}
                        style={{
                          backgroundColor: permissions[section].selected ? 'lightgreen' : 'lightcoral',
                        }}
                      >
                        Select All
                      </button>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {Object.keys(actions).map((action) => (
                          <label key={action}>
                            <input className="checkBox"
                              type="checkbox"
                              checked={actions[action]}
                              onChange={() => handleToggle(section, action)}
                            />
                            {action.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))
                }
              </div >
            </div >
          </div >

        </div >
        <div className="Rprightbox" style={{ paddingRight: '20px' }}>
          <h6>Role Information</h6>
          <div className="rolePoints" >
            <ul className="timeline" >
              <li className="timeline-item" >
                <h3>Basic Information</h3>
              </li >
              <li className="timeline-item" >
                <h3>Role Information</h3>
              </li >
            </ul >
          </div >
        </div >
      </div >
      <div className="countryBtn" >
        <button onClick={handleSubmit} style={{ cursor: "pointer" }}>Submit</button>
        <button>Reset</button>
      </div >
    </div >

  )
}

export default Roles