import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const ShopContextProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(false);

  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/v1/products/list");
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const addToCart = async (itemId, size) => {
    if (authStatus) {
      if (!size) {
        toast.error("Select Product size");
        return;
      }
      let cartData = structuredClone(cartItems);
      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
      }
      setCartItems(cartData);

      try {
        await axios.post(
          backendUrl + "/api/v1/cart",
          { itemId, size },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

    
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Login to use cart functionality");
    }
  };
  const getUserCart = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/v1/cart/", {
        withCredentials: true,
      });

      if (response.data) {
        setCartItems(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log("Error in getCartCount function");
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (authStatus) {
      try {
        const response = await axios.put(
          backendUrl + "/api/v1/cart/",
          { itemId, size, quantity },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);

      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };
  useEffect(() => {
    getProductsData();
    getUserCart();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    authStatus,
    setAuthStatus,
    setCartItems,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
