import React from "react";

const Subscribe = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="my-10 ">
      <div className="text-center">
        <h2 className="text-[24px] font-[500]">Subscribe now & get 20% off</h2>
        <p className="my-2 text-sm text-gray-400 ">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="my-4 ">
        <form action="" onSubmit={handleSubmit} className="flex items-center w-full mx-auto border sm:w-1/2 ">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-2 py-2 text-sm outline-none"
          />
          <button type="submit" className="inline px-8 py-3 text-xs text-center text-white bg-black">
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
