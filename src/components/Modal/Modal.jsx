import { useState } from 'react';
import { Toast } from 'react-bootstrap';
import { auth, database } from '../../config/config';
import './Modal.css';
const Modal = ({ TotalPrice, TotalQty, hideModal }) => {
  const [PhoneNo, setPhoneNo] = useState(null);
  const [address, setaddress] = useState('');
  const [cartPrice] = useState(TotalPrice);
  const [cartQty] = useState(TotalQty);

  const handleCloseModal = () => {
    hideModal();
  };

  const handleCashOnDelivery = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const userData = await database.collection('users').doc(uid).get();
    await database.collection('Buyer-Personal-Info').add({
      Name: userData.data().FullName,
      Email: userData.data().Email,
      PhoneNo: PhoneNo,
      Address: address,
      CartPrice: cartPrice,
      CartQty: cartQty,
    });
    const cartData = await database.collection('Cart ' + uid).get();
    for (var snap of cartData.docs) {
      var data = snap.data();
      data.ID = snap.id;
      await database.collection('Buyer-Cart ' + uid).add(data);
      await database
        .collection('Cart ' + uid)
        .doc(snap.id)
        .delete();
    }
    hideModal();
    // history.push('/');
    <Toast >
        <Toast.Body>Your order has been placed successfully</Toast.Body>
    </Toast>
    // toast.success(, {
    //   position: 'top-right',
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: false,
    //   draggable: false,
    //   progress: undefined,
    // });
  };

  return (
    <div className="shade-area">
      <div className="modal-container">
        <form className="form-group" onSubmit={handleCashOnDelivery}>
          <input
            type="number"
            className="form-control"
            placeholder="Phone No"
            required
            onChange={(e) => setPhoneNo(e.target.value)}
            value={PhoneNo}
          />
          <br></br>
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            required
            onChange={(e) => setaddress(e.target.value)}
            value={address}
          />
          <br></br>
          <label>Total Quantity</label>
          <input
            type="text"
            className="form-control"
            readOnly
            required
            value={cartQty}
          />
          <br></br>
          <label>Total Price</label>
          <input
            type="text"
            className="form-control"
            readOnly
            required
            value={cartPrice}
          />
          <br></br>
          <button type="submit" className="btn btn-success btn-md">
            Submit
          </button>
        </form>
        <div className="delete-icon" onClick={handleCloseModal}>
          x
        </div>
      </div>
    </div>
  );
};

export default Modal;
