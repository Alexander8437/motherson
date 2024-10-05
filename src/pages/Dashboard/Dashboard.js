import React from 'react'
import BodyHeader from '../../components/bodyHeader/BodyHeader'
import destination from '../../images/desktop1/top10-destinations.png'
import evases from '../../images/desktop1/packages.png'
import sales from '../../images/desktop1/weekly.png'
import spherical from '../../images/desktop1/lead.png'
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  PointElement,
  ArcElement,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  PointElement,
  ArcElement
);

const Dashboard = () => {
  const topDestinationsData = {
    labels: [
      "Bali",
      "Maldives",
      "Paris",
      "New York",
      "Tokyo",
      "London",
      "Sydney",
      "Rome",
      "Barcelona",
      "Dubai",
    ],
    datasets: [
      {
        label: "Top 10 Destinations",
        data: [50, 40, 30, 20, 10, 25, 35, 15, 20, 5], // Replace with actual data
        backgroundColor: [
          "#5F67F8",
          "#F8DF5F",
          "#FA9851",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
          "#9966FF",
          "#FF6384",
        ],
      },
    ],
  };

  const topPackagesData = {
    labels: ["Package 1", "Package 2", "Package 3", "Package 4", "Package 5"],
    datasets: [
      {
        label: "Top 5 Packages",
        data: [80, 70, 60, 90, 85],
        borderColor: "#F8DF5F",
        backgroundColor: [
          "#5F67F8",
          "#FA9851",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
        ],
        fill: true,
      },
    ],
  };

  const topPackagesOptions = {
    indexAxis: "y", // Horizontal bar chart
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 5 Packages",
      },
    },
  };

  const weeklySalesData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Weekly Sales",
        data: [300, 400, 350, 450, 500], // Replace with actual data
        borderColor: "#FA9851",
        backgroundColor: "rgba(250, 152, 81, 0.3)",
        fill: true,
      },
    ],
  };

  // Sample data for Leads Source chart
  const leadsSourceData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Leads Source",
        data: [30, 70, 45, 80, 50],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className='body-dashboard' style={{ width: "100%" }}>
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
            <Bar data={topDestinationsData} />
            {/* <img src={destination} /> */}
          </div>
          <div className="chart">
            <h3>Top 5 Packages</h3>
            <Bar data={topPackagesData} options={topPackagesOptions} />
            {/* <img src={evases} /> */}
          </div>

          <div className="chart">
            <h3>Weekly Sales</h3>
            <Line data={weeklySalesData} />
            {/* <img src={sales} /> */}
          </div>
        </div>

        <div className="leads-schedule">
          <div className="leads-source">
            <h3 style={{ marginBottom: "60px" }}>Leads Source</h3>
            <Bar data={leadsSourceData} />
            {/* <img src={spherical} /> */}
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