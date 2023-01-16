import React from 'react';
import './SliderProductCard.css';

const SliderProductCard = (product) => {
  let overralltax = 10 / 100;
  let overcommission = 10 / 100;
  let extra = 10 / 100;

  let mrp = parseInt(product.product.price);
  mrp += overralltax * mrp + overcommission * mrp + extra * mrp;
  const salesPrice = mrp - extra * mrp;
  return (
    <div className="mini-product-container">
      <div className="mini-img-container">
        <img
          src={product.product.productImage}
          alt={product.product.productType}
        />
      </div>
      <div className="mini-info-container">
        <div className="mini-product-title">{product.product.productTitle}</div>
        <div className="price-container">
          <del className="mrp"> MRP: &#8377; {mrp} </del>
          <div className="sale-price">Discount Price: &#8377; {salesPrice}</div>
          <div className="you-save">
            You Save: &#8377; {Math.round(mrp - salesPrice)}
          </div>
        </div>
        <a
          href={`/product/${product.product.id}/${product.product.productType}`}
        >
          <button className="prod-btn">Show More &gt; </button>
        </a>
      </div>
    </div>
  );
};

export default SliderProductCard;
