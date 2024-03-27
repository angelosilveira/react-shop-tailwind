import React, { useCallback } from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductType } from "@interfaces/Product";
import { useAddToCart } from "@recoil/atom/cart";
import { useToggleFavorite } from "@recoil/atom/product";

export const Product = ({
  id,
  title,
  image,
  price,
  category,
  isFavorite,
}: ProductType) => {
  const addToCart = useAddToCart();
  const navigate = useNavigate();
  const toggleFavorite = useToggleFavorite();

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      image,
      price,
      category,
      quantity: 1,
    });
    toast.success("Produto adicionado ao carrinho");
  };

  const handleToggleFavorite = () => {
    toggleFavorite(id);
    toast.success("Produto favoritado");
  };

  const handleProductDetails = useCallback(() => {
    navigate(`/product/${id}`);
  }, [id, navigate]);

  return (
    <div className="w-full relative group" key={id}>
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div onClick={() => handleProductDetails()}>
          <img
            className="w-full h-full max-h-[165px] object-contain"
            src={image}
          />
        </div>

        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={handleAddToCart}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Adicionar ao Carrinho
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Ver Detalhes
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            <li
              onClick={() => handleToggleFavorite()}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              {!isFavorite && "Adicionar aos favoritos"}
              {isFavorite && "Remover dos favoritos"}
              <span>
                {!isFavorite && <MdOutlineFavoriteBorder />}
                {isFavorite && <MdOutlineFavorite />}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-base text-primeColor font-bold min-h-[100px]">
            {title}
          </h2>
        </div>
        <div>
          <p className="text-[#767676] text-lg font-bold">${price}</p>
          <p className="text-[#767676] text-[14px]">{category}</p>
        </div>
      </div>
    </div>
  );
};
