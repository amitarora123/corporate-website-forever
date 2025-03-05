import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ _id, item }) => {
  return (
    <Link to={`/product/${_id}`} key={_id} className="flex flex-col gap-2 " onClick={() => {}}>
      <div>
        <img src={item.image[0]} alt="" className="" />
      </div>
      <div>
        <p className="text-xs text-gray-600 sm:text-sm ">{item.name}</p>
      </div>
      <div>
        <p className="text-xs text-gray-600 ">${item.price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
