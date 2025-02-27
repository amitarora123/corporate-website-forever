import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div >
      <div className="grid md:grid-cols-[3fr_1fr_1fr] grid-cols-1 my-10 gap-14">
        <div className="">
          <div className="mb-5">
            <img src={assets.logo} alt="" width={125} />
          </div>

          <p className="w-2/3 text-xs text-gray-700">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

            <div>
            <h2 className="mb-5 text-xl font-medium">COMPANY</h2>
            <ul className="flex flex-col gap-1 text-sm text-gray-600">
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
            </div>
            <div>
            <h2 className="mb-5 text-xl font-medium">GET IN TOUCH</h2>
            
            <ul className="flex flex-col gap-1 text-sm text-gray-600">
              <li>+1-000-000-0000</li>
              <li>baghlaamit06@gmail.com</li>
              <li>
                <Link to='#'>Instagram</Link>
              </li>
            </ul>
            </div>
      </div>
      <hr />
      <p className="my-5 text-sm text-center">Copyright 2024@ amitbaghla123 - All Right Reserved.</p>
    </div>
  );
};

export default Footer;
