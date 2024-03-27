import React from "react";

type Props = {
  heading: string;
};

export const Heading = ({ heading }: Props) => {
  return <div className="text-3xl font-semibold pb-6">{heading}</div>;
};
