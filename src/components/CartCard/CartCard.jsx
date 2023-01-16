import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { database } from '../../config/config';
import './CartCard.css';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

const CartCard = (props) => {
  const [productQuantity, setProductQuantity] = useState(
    props.itemData.quantity
  );

  let p = props.itemData.product;

  let overralltax = 10 / 100;
  let overcommission = 10 / 100;
  let extra = 10 / 100;

  let mrp = parseInt(p.price);
  mrp += overralltax * mrp + overcommission * mrp + extra * mrp;
  const salesPrice = (mrp - extra * mrp) * productQuantity;

  const incquantity = async () => {
    setProductQuantity(productQuantity + 1);

    const itemRef = doc(
      database,
      `cart-${props.userid}`,
      `${props.itemData.id}`
    );
    await updateDoc(itemRef, {
      quantity: productQuantity + 1,
    }).then(() => {
      console.log('change quantity');
    });
  };
  const decquantity = async () => {
    if (productQuantity >= 1) setProductQuantity(productQuantity - 1);
    const itemRef = doc(
      database,
      `cart-${props.userid}`,
      `${props.itemData.id}`
    );
    await updateDoc(itemRef, {
      quantity: productQuantity - 1,
    }).then(() => {
      console.log('change quantity');
    });
  };

  const deleteCartItem = async () => {
    await deleteDoc(
      doc(database, `cart-${props.userid}`, `${props.itemData.id}`)
    ).then(() => {
      console.log('doc deleted');
    });
  };

  return (
    <div className="cart-product-container">
      <span className="cart-prod-img">
        <span className="product-img">
          <img src={p.productImage} alt={p.productTitle} />
        </span>
      </span>
      <span className="cart-prod-quantity-sec">
        <button className="card-prod-btn green" onClick={incquantity}>
          <AiOutlinePlusCircle />
        </button>
        <span>{productQuantity}</span>
        <button className="card-prod-btn red" onClick={decquantity}>
          <AiOutlineMinusCircle />
        </button>
      </span>
      <span className="prod-price">&#8377; {salesPrice}</span>
      <button className="det-btn" onClick={deleteCartItem}>
        <MdOutlineDeleteOutline />
      </button>
    </div>
  );
};

export default CartCard;
