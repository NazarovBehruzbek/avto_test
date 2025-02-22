import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <div>
      <header className="text-right text-3xl font-bold">
        <button onClick={LogOut}>Log Out</button>
      </header>
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-3 p-4 bg-gray-200 h-[94vh]">
          <div> <NavLink to="/" activeclassName= "active">Categories</NavLink></div>
          <div> <NavLink to="/brands" activeclassName= "active">Brands</NavLink></div>
          <div> <NavLink to="/models" activeclassName= "active">Models</NavLink></div>
        </div>
        <div className="col-span-9 p-4 overflow-y-scroll h-[94vh]"><Outlet/></div>
      </div>
    </div>
  );
}

export default Layout;
