import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import emptyCart from "@assets/images/emptyCart.png";
import ItemCard from "@components/ItemCard";
import { useRecoilState } from "recoil";
import { cartAtom, resetCart } from "@recoil/atom/cart";

export const Cart = () => {
  const [products, setCart] = useRecoilState(cartAtom);
  const [totalAmt, setTotalAmt] = useState(0);

  useEffect(() => {
    const price = products.reduce((acc, item) => {
      return acc + item.price * (item.quantity || 1);
    }, 0);
    const formattedPrice = parseFloat(price.toFixed(2));
    setTotalAmt(formattedPrice);
  }, [products]);

  const clearCart = () => {
    setCart(resetCart());
  };

  return (
    <div className="max-w-container mx-auto py-10 px-4">
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Produto</h2>
            <h2>Preço</h2>
            <h2>Quantidade</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {products.map((product) => (
              <div key={product.id}>
                <ItemCard product={product} />
              </div>
            ))}
          </div>

          <button
            onClick={clearCart}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Resetar carrinho
          </button>

          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">
                Total do Carrinho
              </h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${totalAmt}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="#">
                  <button className="h-10 bg-primeColor text-white hover:bg-black duration-300">
                    IR PARA O PAGAMENTO
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              SEU CARRINHO DE COMPRAS SE SENTE SOLITÁRIO.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Seu carrinho de compras vive para servir. Dê a ele um propósito -
              encha-o com livros, eletrônicos, vídeos, etc. e o faça feliz.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue comprando
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};
