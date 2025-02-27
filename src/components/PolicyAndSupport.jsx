import React from "react";
import { assets } from "../assets/frontend_assets/assets";
const PolicyAndSupport = () => {
  return (
    <div className="px-5 my-10">
      <div className="flex gap-2 justify-evenly gap-y-10 max-sm:flex-col">
        <div className="flex flex-col items-center gap-y-1">
          <div>
            <img
              src={assets.exchange_icon}
              alt="exchange-icon"
              className="h-12"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Easy Exchange Policy</p>
          </div>
          <div>
            <p className="text-sm text-[rgb(156,163,175)] text-center">
              We offer hassle free exchange policy
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-y-1">
          <div>
            <img
              src={assets.quality_icon}
              alt="exchange-icon"
              className="h-12"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">7 Days Return Policy</p>
          </div>
          <div>
            <p className="text-sm text-[rgb(156,163,175)] text-center">
            We provide 7 days free return policy
            </p>
          </div>
        </div>
      
        <div className="flex flex-col items-center gap-y-1">
          <div>
            <img
              src={assets.support_img}
              alt="exchange-icon"
              className="h-12"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Best customer support</p>
          </div>
          <div>
            <p className="text-sm text-[rgb(156,163,175)] text-center">
            we provide 24/7 customer support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyAndSupport;
