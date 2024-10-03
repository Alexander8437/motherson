import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import triangle from './images/task/triangle.png'
import filter from './images/task/filter.png'
import towerSymbol from './images/task/tower-symbol.png'
import arrows from './images/task/arrows.png'

const BookingDashboardTab = () => {
  const location = useLocation();
  const activeTab = location.pathname;

  return (<>
    <div class="taskHeading">
      <div class="taskHeadingFirst">
        <h2>Booking</h2>
      </div>
      <div class="taskHeadingSecond">
        {/* <button>To-Do List</button> */}
        <Link to='/home/booking/dashboard'>
          <button style={{
            backgroundColor: activeTab === '/home/booking/dashboard' ? 'lightgreen' : 'none',
          }}>Kanban Board</button>
        </Link>
        <Link to='/home/booking/list'>
          <button>List View</button>
        </Link>
      </div>
      <div class="taskHeadingThird">
        <div class="defaultWorkerTask">
          <button>Default Workflow <img src={triangle} /></button>
          <div class="defaultWorkerTask-content">
            <a href="#task1">Default Workflow</a>
            <a href="#task2">+ Create</a>
          </div>
        </div>
        <div class="createTask">
          <button>Create Task</button>
          <div class="createTask-content">
            <a href="#newTask">New Task</a>
            <a href="#editTask">Edit Task</a>
            <a href="#deleteTask">Delete Task</a>
          </div>
        </div>
      </div>
    </div>

    <div class="taskFilter">
      <div class="taskFilterLeft">
        <div class="vbox-search">
          <input type="text" placeholder="Search" />
        </div>
        <div class="filterTask">
          <button><img src={filter} /></button>
          {/* <div class="filterTask-content">
          <a href="#">+ New Filter</a>
        </div> */}
        </div>
        <div class="plusTaskDropdown">
          <button>+</button>
          <div class="plusTaskDropdown-content">
            <a href="#">Name</a>
            <a href="#">End Date</a>
            <a href="#">Start Date</a>
            <a href="#">Owner</a>
            <a href="#">Stage</a>
            <a href="#">Priority</a>
            <a href="#">Collaborators</a>
            <a href="#">Followers</a>
            <a href="#">Created</a>
            <a href="#">Edited Date</a>
            <a href="#">Assignee or Collaborated</a>
            <a href="#">Project</a>
            <a href="#">Group</a>
            <a href="#">Tags</a>
            <a href="#">Assignee</a>
          </div>

        </div>
      </div>
      <div class="taskFilterRight">
        <div class="towerTask">
          <button><img src={towerSymbol} /></button>
          <div class="towerTask-content">
            <a href="#">Sort by</a>
            <a href="#">Status</a>
            <a href="#">Name</a>
            <a href="#">Assignee</a>
            <a href="#">Priority</a>
            <a href="#">Created Date</a>
            <a href="#">Modified Date</a>
          </div>
        </div>
        <div class="arrowsTask">
          <button><img src={arrows} /></button>
          <div class="arrowsTask-content">
            <a href="#">Stage</a>
            <a href="#">Priority</a>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default BookingDashboardTab