import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const book = {
    name: "iPhone 9",
    company: "Apple",
    img: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    price: 30000,
  };

  const initPayment = (data) => {
    const options = {
      key: "RAZORPAY_KEY_ID",
      amount: data.amount,
      currency: data.currency,
      name: book.name,
      description: "Test Transaction",
      image: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          console.log(response);
          const verifyUrl = "http://localhost:5000/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data.message);
          toast.success(data.message);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:5000/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: book.price });
      console.log(data);
      toast.success(data.message);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="payment-main-container">
      <div className="payment-container">
        <img src={book.img} alt="book_img" />
        <div className="name">{book.name}</div>
        <div className="company">By {book.company}</div>
        <div className="price">Price : &#x20B9;{book.price}</div>
        <button onClick={handlePayment} className="btn">
          buy now
        </button>
      </div>
    </div>
  );
};

export default Payment;
