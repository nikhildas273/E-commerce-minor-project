import { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar/Navbar';
import { auth, database } from '../../config/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Banner from '../../components/Banner/Banner';
import Slider from '../../components/Slider/Slider';

const HomePage = () => {
  const GetCurrentUser = () => {
    const [user, setUser] = useState('');
    const usersCollectionRef = collection(database, 'users');

    useEffect(() => {
      auth.onAuthStateChanged((userLogged) => {
        if (userLogged) {
          const getUser = async () => {
            const q = query(
              usersCollectionRef,
              where('uid', '==', userLogged.uid)
            );
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUser();
        } else {
          setUser(null);
        }
      });
    },[]);
    return user;
  };
  const loggedUser = GetCurrentUser();
  return (
    <div>
      <Navbar />
      <Banner />
      <h1>Deals with Limited price</h1>
      <h1>Mobiles</h1>
      <Slider type={'Mobile'} />
      <h1>Laptops</h1>
      <Slider type={'Laptop'} />
      <h1>Books</h1>
      <Slider type={'Book'} />
      <h1>Fashion</h1>
      <Slider type={'Fashion'} />
      <p>{loggedUser ? loggedUser[0].email : 'no data'}</p>
    </div>
  );
};

export default HomePage;
