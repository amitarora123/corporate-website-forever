import React, { useContext, useEffect } from "react";
import { backendUrl, ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Verify = () => {
  const { navigate, setCartItems, authStatus } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!authStatus) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/v1/orders/verifyStripe",
        { success, orderId },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [authStatus]);
  return <div></div>;
};

export default Verify;
