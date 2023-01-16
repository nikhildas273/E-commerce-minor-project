import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import ptron from '../../asset/ptron.jpg';
import accessories from '../../asset/accessories_.jpg';
import amazonPay from '../../asset/amazonPay.png';
import skinCare from '../../asset/skinCare.png';
import winter from '../../asset/winter.jpg';

function Banner() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={ptron} alt="ptron" />
        <Carousel.Caption>
          <h3>ptron</h3>
          <p>limited time deals</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={accessories} alt="accessories" />
        <Carousel.Caption>
          <h3>accessories</h3>
          <p>limited time deals</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={amazonPay} alt="amazonPay" />
        <Carousel.Caption>
          <h3>amazonPay</h3>
          <p>limited time deals</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={skinCare} alt="skinCare" />
        <Carousel.Caption>
          <h3>skinCare</h3>
          <p>limited time deals</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={winter} alt="winter" />
        <Carousel.Caption>
          <h3>winter</h3>
          <p>limited time deals</p>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
  );
}

export default Banner;
