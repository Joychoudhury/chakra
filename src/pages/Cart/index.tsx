import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Alert from '../error/Alert';

interface Product {
  _id: string;
  title: string;
  imageSrc: string;
  price: number;
}

interface CartItem {
  productId: Product;
  quantity: number;
}

const Cart = () => {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);

  const [error, setError] = useState({
    type: 'danger',
    message: '',
    visibility: false,
  });

  const { type, message, visibility } = error;

  const showError = (type: string, message: string) => {
    setError({
      type,
      message,
      visibility: true,
    });

    setTimeout(() => {
      setError(prevState => ({
        ...prevState,
        visibility: false,
      }));
    }, 2500);
  };


  const fetchCart = async () => {
    try {
      const response = await axios.get<{ products: CartItem[] }>('http://localhost:3000/api/cart');
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };


  const updateCart = async (id: string, value: number) => {
    try {
      if (value > 0) {
        const response = await axios.put<{ products: CartItem[] }>(
          `http://localhost:3000/api/cart/${id}`,
          { value }
        );
        setProducts(response.data.products);
      } else {
        // If the new quantity is 0 or less, delete the product
        const response = await axios.delete<{ products: CartItem[] }>(
          `http://localhost:3000/api/cart/${id}`
        );
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await axios.delete<{ products: CartItem[] }>(`http://localhost:3000/api/cart/${id}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrder = async () => {
    try {
      // Send a POST request to place an order
      const orderResponse = await axios.post("/api/order");
      console.log("Order response:", orderResponse.data);
      showError("", "Order placed Successfully")
      fetchCart()

    } catch (error) {
      showError("danger", "Error placing order")
      console.error("Error ordering and clearing cart:", error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const cartSubtotal = products.reduce(
      (total, product) => total + product.productId.price * product.quantity,
      0
    );
    setSubtotal(cartSubtotal);
  }, [products]);

  return (
    <div>
      <Navbar />
      {visibility && <Alert type={type} message={message} />}
      <div className="h-screen md:h-full bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        {products.length === 0 ? (
          <h2 className="mb-10 text-center text-lg font-bold">Cart is empty</h2>
        ) : (
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {products.map((e) => (
                <div
                  key={e.productId._id}
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <img
                    src={e.productId.imageSrc}
                    alt="product-image"
                    className="md:max-h-[7rem] w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="md:text-lg text-sm font-bold text-gray-900 p-2">{e.productId.title}</h2>
                    </div>
                    <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          onClick={() => updateCart(e.productId._id, e.quantity - 1)}
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {' '}
                          -{' '}
                        </span>
                        <input
                          readOnly
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={e.quantity}
                          min={1}
                        />
                        <span
                          onClick={() => updateCart(e.productId._id, e.quantity + 1)}
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {' '}
                          +{' '}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">₹{e.productId.price}</p>
                        <svg
                          onClick={() => deleteProduct(e.productId._id)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">₹{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">₹50</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">₹{(subtotal + 50).toFixed(2)} INR</p>
                  <p className="text-sm text-gray-700">including GST</p>
                </div>
              </div>
              <button onClick={handleOrder} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                Check out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};




export default Cart;


