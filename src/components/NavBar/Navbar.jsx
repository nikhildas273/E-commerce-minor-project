import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { auth, database } from '../../config/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Navbar = () => {
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
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    });
  };

  const [cartData, setCartData] = useState([]);

  if (loggedUser) {
    const getCartData = async () => {
      const cartArray = [];
      const path = `cart-${loggedUser[0].uid}`;
      getDocs(collection(database, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            cartArray.push({ ...doc.data(), id: doc.id });
          });
          setCartData(cartArray);
        })
        .catch('Error');
    };
    getCartData();
  }

  return (
    <div className='nav-container'>
      <div className="nav-bar">
        <div className="left-container">
          <span>E-Shop</span>
        </div>
        <div className="right-container">
          {loggedUser && (
            <nav>
              <Link className="link" to="/">
                <button className="nav-btn"> HOME </button>
              </Link>
              <Link className="link" to="/addproduct">
                <button className="nav-btn"> ADD PRODUCT</button>
              </Link>

              <Link className="link" to="/cart">
                <span className="cart-btn nav-btn nav-icon-btn">
                  <FaShoppingCart />
                  <span className="cart-quantiy-no">{cartData.length}</span>
                </span>
              </Link>
              <Link className="link" to="/userprofile">
                <span className="user-profile nav-btn nav-icon-btn">
                  <FaUserCircle />
                </span>
              </Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </nav>
          )}
          {!loggedUser && (
            <nav>
              <Link className="link" to="/">
                <button className="nav-btn"> HOME </button>
              </Link>
              <Link className="link" to="/login">
                <button className="nav-btn"> LOGIN </button>
              </Link>
              <Link className="link" to="/register">
                <button className="nav-btn"> REGISTER </button>
              </Link>
              <Link className="link" to="/cart">
                <span className="cart-btn nav-btn nav-icon-btn">
                  <FaShoppingCart />
                  <span className="cart-quantiy-no">0</span>
                </span>
              </Link>
              <Link className="link" to="/userprofile">
                <span className="user-profile nav-btn nav-icon-btn">
                  <FaUserCircle />
                </span>
              </Link>
            </nav>
          )}
        </div>
      </div>
      <div className="product-type">
        <a href="/product-type/mobiles">
          <button className="product-type-btn">Mobiles</button>
        </a>
        <a href="/product-type/laptops">
          <button className="product-type-btn">Laptops</button>
        </a>
        <a href="/product-type/books">
          <button className="product-type-btn">Books</button>
        </a>
        <a href="/product-type/fashion">
          <button className="product-type-btn">Fashion</button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
