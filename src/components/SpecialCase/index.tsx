import React from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { cartAtom } from "@recoil/atom/cart";
import { useRecoilState, useRecoilValue } from "recoil";
import { favoritesAtom } from "@recoil/atom/product";

const SpecialCase = () => {
  const [cart] = useRecoilState(cartAtom);
  const favoritesTotal = useRecoilValue(favoritesAtom);

  return (
    <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
      <Link to="/favorites">
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            <MdOutlineFavoriteBorder className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <MdOutlineFavoriteBorder className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Favoritos</p>
          {favoritesTotal.length > 0 && (
            <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {favoritesTotal.length}
            </p>
          )}
        </div>
      </Link>

      <Link to="/cart">
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Carrinho</p>
          {cart.length > 0 && (
            <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {cart.length}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default SpecialCase;
