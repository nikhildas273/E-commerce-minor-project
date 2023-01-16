import { Link } from 'react-router-dom';
import './Product.css';

const Product = (product) => {
  let overralltax = 10 / 100;
  let overcommission = 10 / 100;
  let extra = 10 / 100;

  let mrp = parseInt(product.product.price);
  mrp += overralltax * mrp + overcommission * mrp + extra * mrp;
  const salesPrice = mrp - extra * mrp;

  return (
    <div className="product-container">
      <div className="product-img-container">
        <img src={product.product.productImage} />
      </div>
      <div className="product-details">
        <Link
          to={`/product/${product.product.id}/${product.product.productType}`}
        >
          <p className="producttitle">{product.product.productTitle}</p>
        </Link>
        <div className="price-container">
          <del className="mrp">MRP: &#8377; {mrp}</del>
          <div className="sale-price">Discount Price: &#8377; {salesPrice}</div>
          <div className="you-save">
            You Save: &#8377; {Math.round(mrp - salesPrice)}
          </div>
        </div>
        <div className="buy-cart">
          <Link
            to={`/product/${product.product.id}/${product.product.productType}`}
          >
            <button className="prod-btn">More Details &gt;</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
