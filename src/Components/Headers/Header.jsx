import {
  AntDesignOutlined,
  MenuOutlined,
  HomeFilled,
  OrderedListOutlined,
  AppstoreFilled,
  PlusSquareFilled,
} from "@ant-design/icons";
import { Button, Menu, Avatar, Switch } from "antd";
import React, { useContext, useState } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { FaEnvelope, FaRegUserCircle } from "react-icons/fa";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { useTheme } from "../../provider/ThemeContext";
const items = [
  {
    key: "/",
    label: (
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Home
      </NavLink>
    ),
    icon: <HomeFilled />,
  },
  {
    key: "/arts&CraftsItems",
    label: (
      <NavLink
        to="/arts&CraftsItems"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        All Arts & Craft Items
      </NavLink>
    ),
    icon: <AppstoreFilled />,
  },
  {
    key: "/addCraftItems",
    label: (
      <NavLink
        to="/addCraftItems"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Add Craft Items
      </NavLink>
    ),
    icon: <PlusSquareFilled />,
  },
  {
    key: "/myArt&CraftList",
    label: (
      <NavLink
        to="/myArt&CraftList"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        My Art & Craft
      </NavLink>
    ),
    icon: <OrderedListOutlined />,
  },
];

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const toggleCollapsed = () => {
    setOpenMenu(!openMenu);
  };

  const handleToggle = () => {
    setOpenProfile(!openProfile);
  };

  const onChange = (checked) => {
    // console.log(`switch to ${checked}`);
    toggleTheme();
  };

  return (
    <div className="relative z-20 bg-secondary/70 rounded-2xl">
      <div className="bg-secondary/50 flex justify-between md:hidden w-full min-h-20 relative rounded-xl px-2">
        <div className="">
          <Link to="/">
            <img
              className="w-[60px] py-2"
              src="https://i.postimg.cc/XJNGprHM/logo.png"
              alt=""
            />
          </Link>
        </div>
        <div className="flex items-center">
          {!user && (
            <div className="flex">
              <Link to="/login">
                <button
                  className="btn-primary font-bold px-2 py-2 mr-1 w-20"
                  type="primary"
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  className="btn-primary font-bold px-2 py-2 mr-1"
                  type="primary"
                >
                  Register
                </button>
              </Link>
            </div>
          )}
          {user ? (
            <Avatar
            onClick={handleToggle}
              className="cursor-pointer hover:opacity-70"
              size={50}
              src={user?.photoURL}
            />
          ) : (
            <Avatar
              onClick={handleToggle}
              className="cursor-pointer hover:opacity-70"
              size={50}
              icon={<AntDesignOutlined />}
            />
          )}
          <div
            className={`${
              openProfile ? "absolute" : "hidden"
            } right-2 top-[80px] min-w-44 p-2 z-10 bg-white/80 w- rounded-md `}
          >
            <ul className="space-y-2">
              <li>
                <div className="flex items-center">
                  <FaRegUserCircle className="text-xl mr-2 text-primary" />
                  {user ? user.displayName : "Username"}
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <FaEnvelope className="text-xl mr-2 text-primary" />
                  {user ? user.email : "Email"}
                </div>
              </li>
              <li>
                <div>
                  {user ? (
                    <button className="flex items-center" onClick={logOut}>
                      <IoLogOut className="text-xl mr-2 text-primary" />
                      Logout
                    </button>
                  ) : (
                    <button className="flex items-center" onClick={logOut}>
                      <IoLogIn className="text-xl mr-2 text-primary" />
                      <Link to="/login">Login</Link>
                    </button>
                  )}
                </div>
              </li>
              <li>
                <Switch
                  className={theme === "dark" ? "!bg-primary" : "!bg-secondary"}
                  defaultChecked
                  onChange={onChange}
                />{" "}
                <span className="capitalize">Theme {theme}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <AppMenu />
      </div>

      <div>
        <Button
          className="md:hidden menu-button border-none bg-transparent ml-16 absolute top-6"
          onClick={toggleCollapsed}
        >
          <MenuOutlined className="text-3xl text-white" />
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="dark"
          items={items}
          className={openMenu ? "block font-bold text-white" : "hidden"}
        />
      </div>
    </div>
  );
};

function AppMenu() {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [openProfile, setOpenProfile] = useState(false);

  const handleToggle = () => {
    setOpenProfile(!openProfile);
  };

  const onChange = (checked) => {
    // console.log(`switch to ${checked}`);
    toggleTheme();
  };
  return (
    <div className="flex flex-row justify-between lg:container mx-auto">
      <div>
        <Link to="/">
          <img
            className="w-[80px] mx-auto py-2"
            src="https://i.postimg.cc/XJNGprHM/logo.png"
            alt=""
          />
        </Link>
      </div>
      <div className="w-full">
        <Menu
          className=" hover:text-white h-full bg-transparent flex justify-center items-center"
          style={{ border: "none" }}
          items={items}
        />
      </div>
      <div className="flex items-center z-10">
        {user ? (
          <button
            onClick={logOut}
            className="btn-primary border hover:!text-white hover:!border-white font-bold px-2 py-2 mr-1 w-20"
          >
            Logout
          </button>
        ) : (
          <div className="flex">
            <Link to="/login">
              <button className="btn-primary border hover:!text-white hover:!border-white font-bold px-2 py-2 mr-1 w-20">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="btn-primary border hover:!text-white hover:!border-white font-bold px-2 py-2 mr-1">
                Register
              </button>
            </Link>
          </div>
        )}
        <div className="relative">
          {user ? (
            <Avatar
            onClick={handleToggle}
              className="cursor-pointer hover:opacity-70"
              size={60}
              src={user?.photoURL}
            />
          ) : (
            <Avatar
            onClick={handleToggle}
              className="cursor-pointer hover:opacity-70"
              size={60}
              icon={<AntDesignOutlined />}
            />
          )}
          <div
            className={`${
              openProfile ? "absolute" : "hidden"
            } right-2 top-[70px] min-w-44 p-2 bg-white/80 w- rounded-md `}
          >
            <ul className="space-y-2">
              <li>
                <div className="flex items-center">
                  <FaRegUserCircle className="text-xl mr-2 text-primary" />
                  {user ? user.displayName : "Username"}
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <FaEnvelope className="text-xl mr-2 text-primary" />
                  {user ? user.email : "Email"}
                </div>
              </li>
              <li>
                <div>
                  {user ? (
                    <button className="flex items-center " onClick={logOut}>
                      <IoLogOut className="text-xl mr-2 text-primary" />

                      <span className=" hover:text-primary">Logout</span>
                    </button>
                  ) : (
                    <button className="flex items-center">
                      <IoLogIn className="text-xl mr-2 text-primary" />
                      <Link className="hover:text-primary" to="/login">
                        Login
                      </Link>
                    </button>
                  )}
                </div>
              </li>
              <li>
                <Switch
                  className={theme === "dark" ? "!bg-primary" : "!bg-secondary"}
                  defaultChecked
                  onChange={onChange}
                />{" "}
                <span className="capitalize">Theme {theme}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
