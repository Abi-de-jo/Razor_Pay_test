import { useState } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (amount) => {
    setLoading(true);
    try {
      const { data: order } = await axios.post("http://localhost:5000/create-order", { amount });

      const options = {
        key: process.env.RAZORPAY_KEY_ID,  
        amount: order.amount,
        currency: "INR",
        name: "Test Payment",
        description: "Pay ₹1 or Free",
        order_id: order.id,
        handler: function (response) {
          alert("Payment successful! ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Abi",
          email: "test@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100">
      <h1 className="text-3xl font-bold">Razorpay Demo</h1>
      <button
        className="px-6 py-3 bg-green-500 text-white rounded"
        onClick={() => handlePayment(0)}
        disabled={loading}
      >
        Free Plan
      </button>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded"
        onClick={() => handlePayment(1)}
        disabled={loading}
      >
        Pay ₹1
      </button>
    </div>
  );
}

export default App;
