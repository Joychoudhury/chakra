import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router'

import Filters from "@/components/Filters";
import Alert from "../error/Alert";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";

const API_BASE_URL = "https://joy-chakra-deploy.vercel.app/api";
const PRODUCT_URI = `${API_BASE_URL}/product`;
const CATEGORY_URI = `${API_BASE_URL}/categories/`;

type product = {
  _id: string,
  title: string,
  offerPrice: number,
  originalPrice: number,
  description: string,
  imageSrc: string,
  category: string,
  addToCart: () => void
}

const index = ({ product }: { product: product[] }) => {
  const { data: session, status } = useSession();
  const router = useRouter();


  const { categorySelected } = router.query;
  const [products, setProducts] = useState(product);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);


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



  const handleFetch = (uri: string) => {
    axios.get(uri)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }

  const handleAddToCart = async (id: string) => {
    try {
      const cartUri = `${API_BASE_URL}/cart`;

      if (status !== 'authenticated' || !session) {
        showError("danger", "Please Login first");
        return;
      }

      const email = session.user.email;
      const cartResponse = await axios.post(cartUri, { email, id });

      showError("", "Product added to cart");
      console.log("Product added to cart:", cartResponse.data);

    } catch (error) {
      console.error('Error adding product to cart:', error);
      showError("danger", "Error adding product to cart");
    }
  };


  useEffect(() => {
    axios.get(CATEGORY_URI)
      .then(response => {
        setCategories(response.data);
      });

    if (categorySelected) {
      // Ensure categorySelected is treated as a string
      const selectedCategory = Array.isArray(categorySelected)
        ? categorySelected[0] // Use the first element if it's an array
        : categorySelected;

      setCategory(selectedCategory);
      handleFetch('https://joy-chakra-deploy.vercel.app/api/categories/' + selectedCategory)
    }

  }, []);



  useEffect(() => {
    let customUri = category ? `${CATEGORY_URI}${category}` : PRODUCT_URI;
    if (sortBy === 'desc') {
      customUri += '?sortBy=price&type=desc';
    }

    handleFetch(customUri);
  }, [category, sortBy]);


  return (
    <>
      <Navbar />
      {visibility && <Alert type={type} message={message} />}

      <div className="flex flex-col md:flex-row gap-1 mt-2">
        <div className="my-1 mx-2">
          <Filters
            category={category}
            setCategory={setCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={categories}
            open={open}
            setOpen={setOpen}
          />
        </div>

        <div className=' flex flex-1 flex-wrap items-center justify-center h-screen gap-2 m-1'>
          {products.map((e: product) => (
            <ProductCard key={e._id} id={e._id} imgSrc={e.imageSrc} category={e.category} title={e.title} offerPrice={e.offerPrice} originalPrice={e.originalPrice} addToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    // Fetch the products data from your API
    const response = await axios.get(`${PRODUCT_URI}`);

    // Extract the products array from the response data
    const product = response.data;

    // Return the products as props
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error);

    // Return an empty array if there was an error
    return {
      props: {
        product: [],
      },
    };
  }
}


export default index;
