import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { backendUrl, ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("COD");
  const {
    navigate,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {

        try {
          const { data } = await axios.post(
            backendUrl + "/api/v1/orders/verifyRazorpay",
            response,
            {
              withCredentials: true,
            }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let orderItems = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item]) {
          const product = structuredClone(
            products.find((product) => items === product._id)
          );
          product.size = item;
          product.quantity = cartItems[items][item];
          orderItems.push(product);
        }
      }
    }

    const orderData = {
      address: data,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
    };

    try {
      switch (method) {
        case "COD":
          const response = await axios.post(
            backendUrl + "/api/v1/orders/place",
            orderData,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            setCartItems({});
            navigate("/orders");
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/v1/orders/stripe",
            orderData,
            {
              withCredentials: true,
            }
          );


          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data.data;
            window.location.replace(session_url);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/v1/orders/razorpay",
            orderData,
            {
              withCredentials: true,
            }
          );

          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.data);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:pt-14 min-h-[80vh] border-t"
    >
      <div className="flex flex-col w-full gap-4 sm:max-w-[400px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First name"
            name="firstName"
          />
          <input
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last name"
            name="lastName"
          />
        </div>
        <input
          onChange={onChangeHandler}
          value={data.email}
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Email address"
          name="email"
        />
        <input
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
          name="street"
        />

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="city"
            name="city"
          />
          <input
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
            name="state"
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            value={data.zipCode}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Zipcode"
            name="zipCode"
          />
          <input
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
            name="country"
          />
        </div>
        <input
          onChange={onChangeHandler}
          value={data.phone}
          type="number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Phone"
          name="phone"
        />
      </div>

      {/* Right Side */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* Payment Method Section */}

          <div className="flex flex-col gap-3 lg:flex-row">
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                src={assets.razorpay_logo}
                alt="razorpay_logo"
                className="h-5 mx-4"
              />
            </div>

            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                src={assets.stripe_logo}
                alt="stripe_logo"
                className="h-5 mx-4"
              />
            </div>

            <div
              onClick={() => setMethod("COD")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "COD" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="mx-4 text-sm font-medium text-gray-500">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full mt-8 text-end">
            <button
              type="submit"
              className="px-16 py-3 text-sm text-white bg-black"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
