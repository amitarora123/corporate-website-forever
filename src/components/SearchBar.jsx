import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";
const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('collection') && showSearch){
        setVisible(true);
    }
    else{
        setVisible(false)
    }
}, [location, showSearch]);
  return visible ? (
    <div className="text-center border-t border-b bg-gray-50">
      <div className="inline-flex items-center justify-center w-3/4 px-5 py-2 mx-3 my-5 border border-gray-400 rounded-full sm:w-1/2">
        <input
          value={search}
          type="text"
          placeholder="Search"
          className="flex-1 text-sm outline-none bg-inherit"
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={assets.search_icon} alt="search" className="w-4" />
      </div>
      <img
        src={assets.cross_icon}
        onClick={() => setShowSearch(false)}
        alt=""
        className="inline w-3 cursor-pointer"
      />
    </div>
  ) : null;
};

export default SearchBar;
