import { atom, selector, useSetRecoilState } from "recoil";
import { ProductType } from "../../interfaces/Product";

export const cartAtom = atom<ProductType[]>({
  key: "cart",
  default: [],
});

export const cartTotal = selector({
  key: "cartTotal",
  get: ({ get }) => {
    const cart = get(cartAtom);

    return cart.reduce((total, item) => {
      return total + item.price * item.quantity!;
    }, 0);
  },
});

export const useAddToCart = () => {
  const setCart = useSetRecoilState(cartAtom);

  return (product: ProductType) => {
    setCart((cart) => {
      const foundIndex = cart.findIndex((x) => x.id === product.id);

      if (foundIndex >= 0) {
        // Produto encontrado, aumenta a quantidade
        return cart.map((item, index) =>
          index === foundIndex
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      } else {
        // Produto não encontrado, adiciona ao carrinho com quantidade inicial de 1
        return [...cart, { ...product, quantity: 1 }];
      }
    });
  };
};
