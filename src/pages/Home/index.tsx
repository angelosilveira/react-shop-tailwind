import React, { useCallback, useEffect } from "react";
import Slider from "react-slick";
import { Heading } from "@components/Products/Heading";
import { Product } from "@components/Products";

import { SampleNextArrow } from "@components/SampleNextArrow";
import { SamplePrevArrow } from "@components/SamplePrevArrow";
import { getAllProducts } from "@services/product";
import { useRecoilState } from "recoil";
import { productListAtom } from "@recoil/atom/product";

export const Home = () => {
  const [products, setProducts] = useRecoilState(productListAtom);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const loadProducts = useCallback(async () => {
    try {
      const response = await getAllProducts();
      setProducts(response);
    } catch (err) {
      console.log("🚀 ~ loadProducts ~ err:", err);
    }
  }, [setProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <>
      <div className="w-full py-16">
        <div className="max-w-container px-4">
          <Heading heading="Novos Produtos" />
          <Slider {...settings}>
            {products.map((product) => (
              <div className="px-2" key={product.id}>
                <Product {...product} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};
