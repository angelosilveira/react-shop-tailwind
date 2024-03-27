import { atom, selector, useSetRecoilState } from "recoil";
import { ProductType } from "@interfaces/Product";

export const productListAtom = atom<ProductType[]>({
  key: "productListState",
  default: [],
});

export const favoritesTotalAtom = selector({
  key: "favoritesTotal",
  get: ({ get }) => {
    const favoritesProducts = get(productListAtom);

    return favoritesProducts.filter((product) => product.isFavorite).length;
  },
});

export const useToggleFavorite = () => {
  const setFavorites = useSetRecoilState(productListAtom);

  return (id: number) => {
    setFavorites((currentProductsFavorites) => {
      const newArrayProductsFavorites = currentProductsFavorites.map(
        (product) =>
          product.id === id
            ? { ...product, isFavorite: !product.isFavorite }
            : product
      );

      return newArrayProductsFavorites;
    });
  };
};
