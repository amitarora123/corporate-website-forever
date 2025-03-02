import React from "react";
import Title from "../components/Title";
import {assets} from "../assets/frontend_assets/assets"
const Contact = () => {
  return (
    <div>
      <div className="pt-10 text-2xl text-center border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
        <div className="flex flex-col justify-center gap-10 my-10 md:flex-row mb-28">
          <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]"/>
          
          <div className="flex flex-col items-start justify-center gap-6">
            <p className="text-xl font-semibold text-gray-600">Our Store</p>
            <p className="text-gray-500">54789 Willms Station <br /> Suite 350, Washington, USA </p>
            <p className="text-gray-500">Tel: (415) 555-0132 <br /> Email: admin@forever.com </p>
            <p className="text-xs font-semibold text-gray-600">Careers at forever</p>
            <p className="text-gray-500">Learn more about our teams and job openings.</p>
            <button className="px-8 py-4 text-sm transition-all duration-500 border border-black hover:bg-black hover:text-white">Explore Jobs</button>
          </div>
        </div>
    </div>
  );
};

export default Contact;
