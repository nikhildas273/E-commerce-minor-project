import { useState, useEffect } from 'react';
import Navbar from '../../components/NavBar/Navbar';
import './ProductListPage.css';
import Product from '../../components/Product/Product';
import { database } from '../../config/config';
import { collection, getDocs } from 'firebase/firestore';

const ProductListPage = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      const productsArray = [];
      const path = `products-${props.type.toUpperCase()}`;
      getDocs(collection(database, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
          });
          setProducts(productsArray);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getProducts();
  }, []);

  return (
    <div className="product-list-page">
      <Navbar />
      <div className="header">
        <h1>Results for {props.type}</h1>
      </div>
      <div className="all-products">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
