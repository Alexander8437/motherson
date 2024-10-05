import React, { useEffect, useState } from 'react'
import PackageDashboardTab from './PackageDashboardTab'
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';



// const Modal = ({ isOpen, onClose, item }) => {
//   if (!isOpen) return null; // Don't render if modal is not open

//   return (
//     <div style={styles.modalOverlay}>
//       <div style={styles.modalContent}>
//         <h2>{item.name}</h2>
//         <div dangerouslySetInnerHTML={{ __html: item.htmlContent }} />
//         <button onClick={onClose} style={styles.closeButton}>Close</button>
//       </div>
//     </div>
//   );
// };

const PackageDashboardList = () => {
  const [packageList, setPackageList] = useState([])
  const [selectedItem, setSelectedItem] = useState(null); // To hold the selected item's details
  const [isModalOpen, setIsModalOpen] = useState(false);  // To control modal visibility
  const navigate = useNavigate();

  // Function to open the modal with item details
  // const handleViewClick = (option) => {
  //   setSelectedItem(option);
  //   setIsModalOpen(true);
  // };

  const handlePackageView = (option) => {
    navigate(`/home/package/List/${option.id}`, { state: { option } });
  }

  // Function to close the modal
  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedItem(null);
  // };


  useEffect(() => {
    axios.get(`${config.baseUrl}/package/getAllPkg`)
      .then((response) => {
        setPackageList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);



  return (
    <div className='myteams-container'>
      <div class="homepage">
        <PackageDashboardTab />
        <div class="startTaskTable">
          <table class="listTaskTable">
            <thead>
              <tr>
                <th>
                  <input type="checkbox"></input>
                </th>
                <th>Date</th>
                <th>Name/Mobile</th>
                <th>Description</th>
                <th>Start Date/End Date</th>
                <th>Destinations</th>
                <th>Price</th>
                <th>Owner</th>
                <th>Lead Stage</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "14px" }}>
              {Array.isArray(packageList) && packageList.map((option) => (

                <tr>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                  <td></td>
                  <td>{option.name}</td>
                  <td dangerouslySetInnerHTML={{ __html: option.description.en }}></td>
                  <td>{option.travelDates.startDte} - {option.travelDates.endDte}</td>
                  <td>{option.destination.destinationName}</td>
                  <td>{option.packagePrice.price}</td>
                  <td>{option.metadata.createdBy}</td>
                  <td><button onClick={() => handlePackageView(option)}>View</button></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal} item={selectedItem} /> */}

        </div>
      </div>
    </div>
  )
}

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    width: '400px',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  viewButton: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#008CBA',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default PackageDashboardList