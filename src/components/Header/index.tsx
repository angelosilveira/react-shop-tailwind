import React from "react";
import logo from "../../assets/images/logo.png";
import {
  HiHome,
  HiMagnifyingGlass,
  HiStar,
  HiPlayCircle,
} from "react-icons/hi2";
import { HeaderItem } from "../HeaderItem";
export const Header = () => {
  // const [toggle, setToggle] = useState(false);
  const menu = [
    {
      name: "HOME",
      icon: HiHome,
    },
    {
      name: "SEARCH",
      icon: HiMagnifyingGlass,
    },
    {
      name: "FAVORITE",
      icon: HiStar,
    },
    {
      name: "CART",
      icon: HiPlayCircle,
    },
  ];
  return (
    <div className="flex items-center justify-between p-5">
      <div className="flex gap-8 items-center w-full justify-between">
        <img
          src={logo}
          className="w-[80px] 
        md:w-[115px] object-cover"
        />
        <div className="hidden md:flex gap-8 flex-end alingn-center juntify-end">
          {menu.map((item) => (
            <HeaderItem key={item.name} name={item.name} Icon={item.icon} />
          ))}
        </div>
        <div className="flex md:hidden gap-5 flex-end alingn-center juntify-end">
          {menu.map((item) => (
            <HeaderItem key={item.name} name={""} Icon={item.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};
