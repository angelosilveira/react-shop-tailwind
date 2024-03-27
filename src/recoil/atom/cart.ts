import { atom, selector, useSetRecoilState } from "recoil";
import { ProductType } from "@interfaces/Product";

// Definindo o átomo de estado para o carrinho
export const cartAtom = atom<ProductType[]>({
  key: "cart",
  default: [],
});

// Selector para calcular o total do carrinho
export const cartTotal = selector({
  key: "cartTotal",
  get: ({ get }) => {
    const cart = get(cartAtom);
    return cart.reduce((total, item) => {
      return total + item.price * (item.quantity || 1); // Usando 1 como fallback para quantity
    }, 0);
  },
});

// Hook para adicionar um item ao carrinho
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

// Função para aumentar a quantidade de um item no carrinho
export const increaseQuantity = (productId: number) => {
  return (cart: ProductType[]) => {
    return cart.map((item) => {
      if (item.id === productId) {
        // Aumenta a quantidade
        return { ...item, quantity: item.quantity! + 1 };
      }
      return item;
    });
  };
};

// Função para diminuir a quantidade de um item no carrinho
export const decreaseQuantity = (productId: number) => {
  return (cart: ProductType[]) => {
    return cart.map((item) => {
      if (item.id === productId) {
        // Diminui a quantidade, mas garante que não seja menor que 1
        return { ...item, quantity: Math.max(item.quantity! - 1, 1) };
      }
      return item;
    });
  };
};

// Função para remover um item do carrinho
export const deleteItem = (productId: number) => {
  return (cart: ProductType[]) => {
    // Filtra todos os itens exceto o que será excluído
    return cart.filter((item) => item.id !== productId);
  };
};

// Função para limpar o carrinho
export const resetCart = () => {
  return () => {
    return []; // Retorna um array vazio para limpar o carrinho
  };
};
