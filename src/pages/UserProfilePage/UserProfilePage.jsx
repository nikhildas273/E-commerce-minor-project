import { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar/Navbar';
import { auth, database } from '../../config/config';
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import './UserProfilePage.css';

const UserProfilePage = () => {
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
    }, []);
    return user;
  };
  const loggedUser = GetCurrentUser();

  return (
    <>
      <Navbar />
      <div className="user-profile-container">
        {loggedUser ? (
          <div className="user-profile">
            <h1 className="user-paragraph">Your Account Details</h1>
            <div className="data-list">
              <div className="user-data">
                <span className="user-col-1">Your Name :-</span>
                <span className="user-col-2">{loggedUser[0].name}</span>
              </div>
              <div className="user-data">
                <span className="user-col-1">Your Email :-</span>
                <span className="user-col-2">{loggedUser[0].email}</span>
              </div>
              <div className="user-data">
                <span className="user-col-1">Your Address :-</span>
                <span className="user-col-2">{loggedUser[0].address}</span>
              </div>
              <div className="user-data">
                <span className="user-col-1">Your Number :-</span>
                <span className="user-col-2">{loggedUser[0].number}</span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1>You are not logged In</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfilePage;
