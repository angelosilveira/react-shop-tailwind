import React, { useCallback, useEffect, useRef, useState } from "react";
import { getMovieByGenreId } from "../../services/movies";
import { MovieCard } from "../MovieCard";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

type MovieListType = {
  genreId: number;
};

export const MovieList = ({ genreId }: MovieListType) => {
  const [movieList, setMovieList] = useState([]);
  const elementRef = useRef<HTMLElement | null>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;

  const loadMovieByGenreId = useCallback(() => {
    getMovieByGenreId(genreId).then((resp) => {
      setMovieList(resp.results);
    });
  }, [genreId]);

  useEffect(() => {
    loadMovieByGenreId();
  }, [loadMovieByGenreId]);

  const slideRight = (element: HTMLElement) => {
    element.scrollLeft += 500;
  };

  const slideLeft = (element: HTMLElement) => {
    element.scrollLeft -= 500;
  };

  return (
    <div className="relative">
      <IoChevronBackOutline
        onClick={() => slideLeft(elementRef.current!)}
        className={`text-[50px] text-white p-2 z-10 cursor-pointer hidden md:block absolute mt-[150px]`}
      />

      <div
        ref={elementRef}
        className="flex overflow-x-auto gap-8 scrollbar-none scroll-smooth pt-4 px-3 pb-4"
      >
        {movieList.map((item) => (
          <MovieCard movie={item} />
        ))}
      </div>
      <IoChevronForwardOutline
        onClick={() => slideRight(elementRef.current!)}
        className={`text-[50px] text-white hidden md:block p-2 cursor-pointer z-10 top-0 absolute right-0 mt-[150px] `}
      />
    </div>
  );
};
