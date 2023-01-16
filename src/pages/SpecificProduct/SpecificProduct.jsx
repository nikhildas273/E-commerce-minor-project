import { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar/Navbar';
import { useParams } from 'react-router-dom';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { auth, database } from '../../config/config';
import Slider from '../../components/Slider/Slider';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import cod from '../../asset/cash-on-delivery.png';
import warranty from '../../asset/warranty.png';
import replacement from '../../asset/swap.png';
import './SpecificProduct.css';

const SpecificProduct = () => {
  const { id, type } = useParams();
  const [product, setProduct] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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

  const GetCurrentProduct = () => {
    useEffect(() => {
      const getProduct = async () => {
        const docRef = doc(database, `products-${type.toUpperCase()}`, id);
        const docSnap = await getDoc(docRef);
        setProduct(docSnap.data());
      };
      getProduct();
    }, []);
    return product;
  };

  GetCurrentProduct();

  let overralltax = 10 / 100;
  let overcommission = 10 / 100;
  let extra = 10 / 100;

  let mrp = parseInt(product.price);
  mrp += overralltax * mrp + overcommission * mrp + extra * mrp;
  const salesPrice = mrp - extra * mrp;

  const addtocart = () => {
    if (loggedUser) {
      addDoc(collection(database, `cart-${loggedUser[0].uid}`), {
        product,
        quantity: 1,
      })
        .then(() => {
          setSuccessMsg('Added to cart');
        })
        .catch((error) => {
          setErrorMsg(error.message);
        });
    } else {
      setErrorMsg('Please login first');
    }
  };

  return (
    <div>
      <Navbar />
      {product ? (
        <div className="product-container">
          <div className="prod-img-con">
            <img src={product.productImage} alt={product.productTitle} />
          </div>
          <div className="prod-info">
            <div className="pos-center">
              <div className="prod-head">{product.productTitle}</div>
              <div className="specific-price-container">
                <del className="mrp">MRP: &#8377; {mrp}</del>
                <div className="sale-price">
                  Discount Price: &#8377; {salesPrice}
                </div>
                <div className="you-save">
                  You Save: &#8377; {Math.round(mrp - salesPrice)}
                </div>
              </div>
              <div className="prod-ship-detail">
                <span className="cod">
                  <img src={cod} alt="cod" /> Cash On Delivery
                </span>
                <span className="warranty">
                  <img src={warranty} alt="warranty" /> Warrenty
                </span>
                <span className="replace">
                  <img src={replacement} alt="replacement" /> 10 Days
                  replacement
                </span>
              </div>
            </div>
          </div>
          <div className="prod-desc">
            <h1 className="prod-details-head">Details</h1>
            <div className="prod-description">{product.description}</div>
            <div className="buy-cart">
              <button className="cart-btn" onClick={addtocart}>
                <HiOutlineShoppingCart /> Add To Cart
              </button>
            </div>
            {successMsg && <p className="success-msg">{successMsg}</p>}
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <h1>Similar Items</h1>
      <Slider type={type} />
    </div>
  );
};

export default SpecificProduct;
