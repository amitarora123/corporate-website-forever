import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSellers = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {

    const bestProducts = products.filter((item) => (item.bestseller));
    setBestSellers(bestProducts);
  }, [products]);
  return <div className="my-10">
    <div className="text-3xl text-center">

    <Title text1={'BEST'} text2={'SELLERS'}/>
    <p className="w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
    </div>

    <div className="grid grid-cols-2 gap-4 my-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestSellers.map((item, index)=>(
            <ProductItem key={index} _id={item._id} item={item}/>
        ))}
    </div>
  </div>;
};

export default BestSellers;
