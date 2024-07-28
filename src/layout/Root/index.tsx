import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/logo.png";
import MenuIcon from "../../assets/menu-icon.gif";

const Root = () => {
  return (
    <div className="min-h-screen w-full bg-[#141414] text-[#999999]">
      {/* header */}
      <div className="flex w-full bg-[rgba(20,20,20,0.5)] fixed h-[50px] px-5 py-2">
        <div className="flex w-fit items-center gap-5">
          <div>
            <img className="h-6 w-6" src={MenuIcon} alt="menu-icon" />
          </div>
          <div>
            <img className="h-6" src={Logo} alt="logo" />
          </div>
        </div>
      </div>

      <div className="min-h-screen overflow-auto flex flex-col pt-[50px]">
        {/* body */}
        <div className="flex-1">
          <Outlet />
        </div>

        {/* footer */}
        <div className="flex gap-4 flex-wrap px-5 py-6">
          <span className="text-base">Terms of Use</span>
          <span className="text-base">Privacy Statement</span>
          <span className="text-base">Cookie Preferences</span>
          <span className="text-base">Help Center</span>
        </div>
      </div>
    </div>
  );
};

export default Root;
