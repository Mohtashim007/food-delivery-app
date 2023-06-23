import React from "react";
import logo from "./asserts/logo.png";

function Header() {
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4">
      <div className="flex items-center h-full">
        <div className="h-12">
          <img src={logo} alt="" className="h-full " />
        </div>
      </div>
    </header>
  );
}

export default Header;
