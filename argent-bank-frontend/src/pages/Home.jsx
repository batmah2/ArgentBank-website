import { useEffect } from 'react';
import Features from '../components/Features/Features'
import Hero from '../components/Hero'
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../redux/userSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile()); // Appel à getUserProfile pour récupérer les données utilisateur dès le chargement de la page
  }, [dispatch]);

    return (
        <main className='main'>
            <Hero></Hero>
            <Features></Features>
        </main>
    )
}

export default HomePage;