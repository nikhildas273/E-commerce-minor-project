import { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar/Navbar';
import { auth, database, storage } from '../../config/config';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import './AddProductPage.css';
import { Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const [productTitle, setProductTitle] = useState('');
  const [productType, setProductType] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [productImage, setProductImage] = useState('');

  const [imageError, setImageError] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [uploadError, setUploadError] = useState();

  const navigate = useNavigate();

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

  const type = ['image/jpeg', 'image/png', 'image/jpg', 'image/PNG'];
  const handleProductImg = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && type.includes(selectedFile.type)) {
        setProductImage(selectedFile);
        setImageError('');
      } else {
        setProductImage(null);
        setImageError('please select a valid image file type(png or jpg');
      }
    } else {
      setImageError('please select your image file');
    }
  };
  const handleAddProduct = (e) => {
    e.preventDefault();
    const storageRef = ref(
      storage,
      `product-images${productType.toUpperCase()}/${Date.now()}`
    );

    uploadBytes(storageRef, productImage)
      .then(() => {
        getDownloadURL(storageRef).then((url) => {
          addDoc(
            collection(database, `products-${productType.toUpperCase()}`),
            {
              productTitle,
              productType,
              description,
              brand,
              price,
              productImage: url,
            }
          );
        });
        setSuccessMsg('Product added successfully');
        setTimeout(() => {
          setSuccessMsg('');
          navigate('/login');
        }, 2000);
      })
      .catch((err) => {
        setUploadError(err.message);
      });
  };
  return (
    <div>
      <Navbar />
      {loggedUser && loggedUser[0].email === 'admin@admin.com' ? (
        <div className="Add-product-container">
          <form className="add-product-form" onSubmit={handleAddProduct}>
            <h1>Add Product</h1>
            {successMsg && <Toast className="success-msg">{successMsg}</Toast>}
            {uploadError && <Toast className="error-msg">{uploadError}</Toast>}
            <input
              type="text"
              onChange={(e) => setProductTitle(e.target.value)}
              placeholder="Product Title"
            />
            <input
              type="text"
              onChange={(e) => setProductType(e.target.value)}
              placeholder="Product Type"
            />
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <input
              type="text"
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Product Brand"
            />
            <input
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Product price"
            />
            <input type="file" onChange={handleProductImg} />
            {imageError && <p className="error-msg">{imageError}</p>}

            <button type="submit" className="add-btn">
              ADD
            </button>
          </form>
        </div>
      ) : (
        <div>You don't have access to this page</div>
      )}
    </div>
  );
};

export default AddProductPage;
