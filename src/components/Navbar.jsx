import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { setShowSearch, getCartCount } = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <img src={assets.logo} alt="logo" className="w-36" />

      <ul className="hidden gap-5 text-sm text-gray-700 sm:flex">
        <NavLink to="/" className={`flex flex-col items-center gap-1`}>
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700  hidden" />
        </NavLink>

        <NavLink
          to="/collection"
          className={`flex flex-col items-center gap-1`}
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className={`flex flex-col items-center gap-1`}>
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className={`flex flex-col items-center gap-1`}>
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          onClick={() => setShowSearch((prev) => !prev)}
          alt=""
          className="w-5 cursor-pointer"
        />

        <div className="relative group">
          <img
            src={assets.profile_icon}
            alt="profile"
            className="w-5 cursor-pointer"
          />
          <div className="absolute right-0 hidden pt-4 group-hover:block dropdown-menu">
            <div className="flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount() || 0}
          </p>
        </Link>

        <img
          src={assets.menu_icon}
          alt="menu"
          onClick={() => setVisible(true)}
          className="block w-5 sm:hidden"
        />
      </div>

      {/* sidebar menu for smaller screens */}

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3"
            onClick={() => setVisible(false)}
          >
            <img src={assets.dropdown_icon} alt="" className="h-4" />
            <p>Back</p>
          </div>

          <NavLink
            to="/"
            onClick={() => setVisible(false)}
            className={`flex flex-col border-b-2  gap-1 py-1.5  px-3`}
          >
            <p>HOME</p>
          </NavLink>

          <NavLink
            to="/collection"
            onClick={() => setVisible(false)}
            className={`flex flex-col  gap-1 py-1.5 border-b-2 px-3`}
          >
            <p>COLLECTION</p>
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setVisible(false)}
            className={`flex flex-col border-b-2  gap-1 py-1.5  px-3`}
          >
            <p>ABOUT</p>
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setVisible(false)}
            className={`flex flex-col border-b-2  gap-1 py-1.5  px-3`}
          >
            <p>CONTACT</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
