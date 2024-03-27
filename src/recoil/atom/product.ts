import { atom, useSetRecoilState } from "recoil";
import { ProductType } from "@interfaces/Product";

export const productListAtom = atom<ProductType[]>({
  key: "productListState",
  default: [],
});

export const favoritesAtom = atom<ProductType[]>({
  key: "favoritesState",
  default: [],
});

export const useToggleFavorite = () => {
  const setFavorites = useSetRecoilState(favoritesAtom);

  return (product: ProductType) => {
    setFavorites((currentFavorites) => {
      const foundIndex = currentFavorites.findIndex((x) => x.id === product.id);
      if (foundIndex >= 0) {
        // Produto encontrado nos favoritos, remove-o
        return currentFavorites.filter((_, index) => index !== foundIndex);
      } else {
        // Produto não encontrado, adiciona aos favoritos
        return [...currentFavorites, product];
      }
    });
  };
};
