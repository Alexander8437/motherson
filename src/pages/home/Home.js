import Navbar from '../../components/navbar/Navbar'
import Hero from '../../components/hero/Hero'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import Tokens from '../../apiData/Tokens'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {

    const keyData = JSON.parse(localStorage.getItem('encryptionKey'));
    const ivBase64 = localStorage.getItem('iv');
    const encryptedTokenBase64 = localStorage.getItem('encryptedToken');

    if (!keyData || !ivBase64 || !encryptedTokenBase64) {
      navigate('/login')
    }
  }, [])




  return (
    <div className='dash'>
      <Navbar />
      <Hero />
    </div>
  )
}

export default Home