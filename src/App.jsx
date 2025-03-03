import React, { useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";
import PlaceOrder from "./pages/PlaceOrder";
import { backendUrl, ShopContext } from "./context/ShopContext";
import axios from "axios";

const App = () => {
  const { authStatus, setAuthStatus } = useContext(ShopContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          backendUrl + "/api/v1/users/fetchUser",
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setAuthStatus(true);
          console.log(response.data);
        }
      } catch (error) {
        setAuthStatus(false);
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/login"
          element={!authStatus ? <Login /> : <Navigate to="/" />}
        />

        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
