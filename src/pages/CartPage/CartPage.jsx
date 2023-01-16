import Navbar from '../../components/NavBar/Navbar';
import CartCard from '../../components/CartCard/CartCard';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, database } from '../../config/config';
import './CartPage.css';
import Modal from '../../components/Modal/Modal';

const CartPage = () => {
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
    });
    return user;
  };
  const loggedUser = GetCurrentUser();

  const [cartData, setCartData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

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

  const qty = cartData.map((cartItem) => cartItem.quantity);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalQty = qty.reduce(reducer, 0);

  let overralltax = 10 / 100;
  let overcommission = 10 / 100;
  let extra = 10 / 100;

  const price = cartData.map((cartItem) => {
    let mrp = parseInt(cartItem.product.price);
    mrp += overralltax * mrp + overcommission * mrp + extra * mrp;
    const salesPrice = (mrp - extra * mrp) * cartItem.quantity;
    return salesPrice;
  });
  const totalPrice = price.reduce(reducer, 0);
  return (
    <div>
      <Navbar />
      {cartData.length !== 0 ? (
        <div className="cart-page">
          <div className="cart-head">
            <h1>E-SHOP CART</h1>
            <div className="all-cart-items">
              {cartData.map((item) => (
                <div className="cart-item" key={item.id}>
                  <CartCard
                    key={item.id}
                    itemData={item}
                    userid={loggedUser[0].uid}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="summery-box">
            <h4>Cart Summery</h4>
            <div className="summery-list">
              Total No. of Products: <span>{totalQty}</span>
            </div>
            <div className="summery-list">
              Total price to pay: <span> &#8377; {totalPrice}</span>
            </div>
          </div>
          <button onClick={toggleModal} className="buy-btn">
            BUY NOW
          </button>
        </div>
      ) : (
        <h1>Your Cart is Empty</h1>
      )}

      {showModal === true && (
        <Modal TotalPrice={totalPrice} TotalQty={totalQty} hideModal={hideModal} />
      )}
    </div>
  );
};

export default CartPage;
