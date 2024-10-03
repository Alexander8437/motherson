import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

function App() {



  // const isAuthenticated = () => {
  //   return localStorage.getItem('encryptedToken') !== null;
  // };

  // // Protected Route Component
  // const ProtectedRoute = ({ children }) => {
  //   return isAuthenticated() ? children : <Navigate to="/login" />;
  // };




  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home/*'
            element={
              // <ProtectedRoute>
              <Home />
              // </ProtectedRoute>
            }
          />

          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
