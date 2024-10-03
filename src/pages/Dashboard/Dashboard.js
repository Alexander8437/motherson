import React from 'react'
import BodyHeader from '../../components/bodyHeader/BodyHeader'
import destination from '../../images/desktop1/top10-destinations.png'
import evases from '../../images/desktop1/packages.png'
import sales from '../../images/desktop1/weekly.png'
import spherical from '../../images/desktop1/lead.png'

const Dashboard = () => {
  return (
    <div className='body-dashboard'>
      <BodyHeader />
      <div className='dashboard'>
        <div className='dashboard-periods'>
          <button>Period</button>
          <div className="dropdown-contentPeriod">
            <div className="destination-dropdown">
              {/* <label for="destination">Destinations</label> */}
              <select id="destination" className="destination-select">
                <option value="" disabled selected>All Time</option>
                <option value="new-york">New York</option>
                <option value="paris">Paris</option>
                <option value="tokyo">Tokyo</option>
                <option value="london">London</option>
                <option value="sydney">Sydney</option>
              </select>
              <button className="periodButton">Done</button>          </div>
          </div >
        </div >
        <div className='dashboard-numbers'>
          <div className="card" style={{ backgroundColor: "#D9DBF6", borderLeft: "5px solid #5F67F8" }}>
            <p className="label">Total Bookings</p>
            <p className="value">65 / 93</p>
          </div>
          <div className="card" style={{ backgroundColor: "#F2F6D9", borderLeft: "5px solid #F8DF5F" }}>
            <p className="label">Total Sales</p>
            <p className="value">65 / 93</p>
          </div>
          <div className="card" style={{ backgroundColor: "#F6E5D9", borderLeft: "5px solid #FA9851" }}>
            <p className="label">Total Leads</p>
            <p className="value">65 / 93</p>
          </div>
          <div className="card" style={{ backgroundColor: "#F2D9F6", borderLeft: "5px solid #C75FF8" }}>
            <p className="label">Total Users</p>
            <p className="value">65 / 93</p>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart">
            <h3>Top 10 Destinations</h3>
            <img src={destination} />
          </div>
          <div className="chart">
            <h3>Top 5 Packages</h3>
            <img src={evases} />
          </div>

          <div className="chart">
            <h3>Weekly Sales</h3>
            <img src={sales} />
          </div>
        </div>

        <div className="leads-schedule">
          <div className="leads-source">
            <h3>Leads Source</h3>
            <img src={spherical} />
          </div>
          <div className="schedule-payments">
            <h3>Scheduled Payments</h3>
            <div className='schedule-payments-data'>
              <div className='entry'>
                <div className="entryInner">
                  <p>Payer: Nitin</p> <p>  #MTS000051 </p><p> 24,870.83</p>
                </div>
                <div className="entryInner1">
                  <p><a href="#">Active</a></p> <p>  15-07-2024 </p><p> INR</p>
                </div>
              </div>
              <div className='entry'>
                <div className="entryInner">
                  <p>Payer: Nitin</p> <p>  #MTS000051 </p><p> 24,870.83</p>
                </div>
                <div className="entryInner1">
                  <p><a href="#">Active</a></p> <p>  15-07-2024 </p><p> INR</p>
                </div>
              </div >
              <div className='entry'>
                <div className="entryInner">
                  <p>Payer: Nitin</p> <p>  #MTS000051 </p><p> 24,870.83</p>
                </div>
                <div className="entryInner1" >
                  <p><a href="#">Active</a></p> <p>  15-07-2024 </p><p> INR</p>
                </div >
              </div >
              <div className='entry'>
                <div className="entryInner">
                  <p>Payer: Nitin</p> <p>  #MTS000051 </p><p> 24,870.83</p>
                </div>
                <div className="entryInner1" >
                  <p><a href="#">Active</a></p> <p>  15-07-2024 </p><p> INR</p>
                </div >
              </div >
              <div className='entry'>
                <div className="entryInner">
                  <p>Payer: Nitin</p> <p>  #MTS000051 </p><p> 24,870.83</p>
                </div>
                <div className="entryInner1" >
                  <p><a href="#">Active</a></p> <p>  15-07-2024 </p><p> INR</p>
                </div >
              </div >
            </div >
          </div >
        </div >

        <div className="table-container" >
          <h3>Tour Master Sheet</h3>
          <table>
            <thead>
              <tr>
                <th>QUERY</th>
                <th>DATE</th>
                <th>FLIGHT</th>
                <th>PICK UP TIME</th>
                <th>RETURN TIME</th>
                <th>TOUR</th>
                <th>GUEST</th>
                <th>PAX</th>
                <th>HOTEL</th>
                <th>TYPE</th>
                <th>DRIVER</th>
                <th>GUIDE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#MTS000039</td>
                <td>14-07-2024</td>
                <td>IG-9231</td>
                <td>14:00Hrs.</td>
                <td>14:00Hrs.</td>
                <td>Dubai Airport to Hotel Radisson Blue</td>
                <td>Rahul</td>
                <td>A-2</td>
                <td>PVT</td>
                <td>Radisson Blue</td>
                <td>Aazim</td>
                <td>NA</td>
              </tr>
              <tr>
                <td>#MTS000039</td>
                <td>14-07-2024</td>
                <td>IG-9231</td>
                <td>14:00Hrs.</td>
                <td>14:00Hrs.</td>
                <td>Dubai Airport to Hotel Radisson Blue</td>
                <td>Rahul</td>
                <td>A-2</td>
                <td>PVT</td>
                <td>Radisson Blue</td>
                <td>Aazim</td>
                <td>NA</td>
              </tr>
              <tr>
                <td>#MTS000039</td>
                <td>14-07-2024</td>
                <td>IG-9231</td>
                <td>14:00Hrs.</td>
                <td>14:00Hrs.</td>
                <td>Dubai Airport to Hotel Radisson Blue</td>
                <td>Rahul</td>
                <td>A-2</td>
                <td>PVT</td>
                <td>Radisson Blue</td>
                <td>Aazim</td>
                <td>NA</td>
              </tr>
              <tr>
                <td>#MTS000039</td>
                <td>14-07-2024</td>
                <td>IG-9231</td>
                <td>14:00Hrs.</td>
                <td>14:00Hrs.</td>
                <td>Dubai Airport to Hotel Radisson Blue</td>
                <td>Rahul</td>
                <td>A-2</td>
                <td>PVT</td>
                <td>Radisson Blue</td>
                <td>Aazim</td>
                <td>NA</td>
              </tr>
              <tr>
                <td>#MTS000039</td>
                <td>14-07-2024</td>
                <td>IG-9231</td>
                <td>14:00Hrs.</td>
                <td>14:00Hrs.</td>
                <td>Dubai Airport to Hotel Radisson Blue</td>
                <td>Rahul</td>
                <td>A-2</td>
                <td>PVT</td>
                <td>Radisson Blue</td>
                <td>Aazim</td>
                <td>NA</td>
              </tr>
              <tr>
                <td>#MTS000039</td>
                <td>14-07-2024</td>
                <td>IG-9231</td>
                <td>14:00Hrs.</td>
                <td>14:00Hrs.</td>
                <td>Dubai Airport to Hotel Radisson Blue</td>
                <td>Rahul</td>
                <td>A-2</td>
                <td>PVT</td>
                <td>Radisson Blue</td>
                <td>Aazim</td>
                <td>NA</td>
              </tr>
              <tr>
                <td>#MTS000039</td>
                <td>14-07-2024</td>
                <td>IG-9231</td>
                <td>14:00Hrs.</td>
                <td>14:00Hrs.</td>
                <td>Dubai Airport to Hotel Radisson Blue</td>
                <td>Rahul</td>
                <td>A-2</td>
                <td>PVT</td>
                <td>Radisson Blue</td>
                <td>Aazim</td>
                <td>NA</td>
              </tr>
              <tr>
                <td>#MTS000039</td>
                <td>14-07-2024</td>
                <td>IG-9231</td>
                <td>14:00Hrs.</td>
                <td>14:00Hrs.</td>
                <td>Dubai Airport to Hotel Radisson Blue</td>
                <td>Rahul</td>
                <td>A-2</td>
                <td>PVT</td>
                <td>Radisson Blue</td>
                <td>Aazim</td>
                <td>NA</td>
              </tr>
            </tbody>
          </table>
        </div >
      </div >

    </div >
  )
}

export default Dashboard