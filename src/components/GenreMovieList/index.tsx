import React from "react";
import { GENERE } from "../../utils/constants";
import { MovieList } from "../MovieList";

export const GenreMovieList = () => {
  return (
    <div>
      {GENERE.map((item) => (
        <div className="p-8 px-8 md:px-16">
          <h2 className="text-[20px] text-white font-bold">{item.name}</h2>
          <MovieList genreId={item.id} />
        </div>
      ))}
    </div>
  );
};
