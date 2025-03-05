import React, { useContext, useEffect, useState } from "react";
import { backendUrl, ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { toast } from "react-toastify";
import axios from "axios";
import { formatDate } from "../utils/formatDate";

const Orders = () => {
  const { currency, authStatus } = useContext(ShopContext);
  const [orderItems, setOrderItems] = useState([]);

  const fetchOrderItems = async () => {
    try {
      if (!authStatus) {
        return null;
      }

      const response = await axios.get(
        backendUrl + "/api/v1/orders/user-orders",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        let allOrderItems = [];
        response.data.data.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = formatDate(order.createdAt);
            allOrderItems.push(item);
          });
        });
        setOrderItems(allOrderItems.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchOrderItems();
  }, [authStatus]);
  return (
    <div>
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 py-4 text-gray-400 border-t border-b md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={item.image[0]} alt="" className="w-16 sm:w-20" />

              <div>
                <p className="font-medium sm:text-base">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray-400">{item.date}</span>
                </p>
                <p className="mt-2">
                  Payment mode: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-between md:w-1/2">
              <div className="flex items-center gap-2">
                <p className="h-2 bg-green-500 rounded-full min-w-2" />
                <p className="text-sm md:text-base">{item.status}</p>
              </div>

              <button onClick={fetchOrderItems} className="px-4 py-2 text-sm font-medium border rounded-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
