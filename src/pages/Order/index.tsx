import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';

interface Order {
  _id: string;
  date: string;
  products: {
    productId: {
      _id: string;
      title: string;
      imageSrc: string;
      offerPrice: number;
    };
    quantity: number;
  }[];
  totalAmount: number;
}

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>('/api/order');
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  function formatDate(dateString:string) {
    const options:Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="h-screen md:h-full bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Order History</h1>
        {orders.length === 0 ? (
          <h2 className="mb-10 text-center text-lg font-bold">No orders found</h2>
        ) : (
          <div className="mx-auto max-w-5xl justify-center px-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="mb-6 rounded-lg bg-white p-6 shadow-md"
              >
                <div className="mb-4">
                  <p className="text-gray-700">Order Date: {formatDate(order.date)}</p>
                </div>
                {order.products.map((product) => (
                  <div
                    key={product.productId._id}
                    className="mb-4 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <img
                        src={product.productId.imageSrc}
                        alt="product-image"
                        className="h-16 w-16 rounded-lg mr-4"
                      />
                      <h2 className="text-lg font-bold text-gray-900">
                        {product.productId.title}
                      </h2>
                    </div>
                    <div className="text-right">
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: ₹{product.productId.offerPrice}</p>
                    </div>
                  </div>
                ))}
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total Amount</p>
                  <p>₹{order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
