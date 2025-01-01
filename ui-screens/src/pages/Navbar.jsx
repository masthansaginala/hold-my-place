import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo-hmp.png";
import Profile from "../assets/profile_pic.png";
import Dropdown from "../assets/dropdown_icon.svg";
import { useAuth } from "./api/AuthContextRedux";

const profile_link = {
  "user-dashboard": "/user-dashboard/profile",
  organizer: "/organizer/profile",
  admin: "/admin/profile",
  vendor: "/vendor/profile",
};

const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location path->", location?.pathname);
  const path = location?.pathname?.split("/")?.[1];

  return (
    <div className="flex justify-between text-sm py-4 px-8  items-center border-b border-b-grey-400 p-3 ">
      <h3 className="flex w-44 cursor-pointer font-outfit font-bold text-2xl text-primary text-orange-500 mb-0">
        <img src={Logo} alt="logo" className="w-10 rounded-full" />
        HoldYourPlace
      </h3>

      <ul className="hidden md:flex items-start gap-5 font-medium text-sm uppercase mb-0">
        {path === "organizer" && (
          <>
            <NavLink to="/organizer/events">
              <li className="py-1">Events</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
          </>
        )}
        {path === "user-dashboard" && (
          <>
            <NavLink to="/user-dashboard/dashboard">
              <li className="py-1">Events</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
          </>
        )}

        {path === "vendor" && (
          <>
            <NavLink to="/vendor/services">
              <li className="py-1">Services</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/vendor/requests">
              <li className="py-1">Requests</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
          </>
        )}

        {path === "admin" && (
          <>
            <NavLink to="/admin/users">
              <li className="py-1">Users</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/admin/organizers">
              <li className="py-1">Organizers</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/admin/vendors">
              <li className="py-1">Vendors</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/admin/vendors-business">
              <li className="py-1">Vendors Businesses</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/admin/events">
              <li className="py-1">Events</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/admin/suport-tickets">
              <li className="py-1">Suport Tickets</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/admin/contact-requests">
              <li className="py-1">Contact Requests</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
          </>
        )}
        {!["organizer", "user-dashboard", "admin", "vendor"].includes(path) && (
          <>
            {" "}
            <NavLink to="/">
              <li className="py-1">Home</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/Organizer-page">
              <li className="py-1">Organizer</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/Vendor-page">
              <li className="py-1">Vendor</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/Events">
              <li className="py-1">Events</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/about">
              <li className="py-1">About</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/contact">
              <li className="py-1">Contact</li>
              <hr className="border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden" />
            </NavLink>
          </>
        )}
      </ul>
      {!["organizer", "user-dashboard", "admin", "vendor"].includes(path) ? (
        <button
          className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300 "
          onClick={() => {
            navigate("/login");
          }}
        >
          Login / Register
        </button>
      ) : (
        <div className="flex items-center gap-2 cursor-pointer group relative">
          <img src={Profile} alt="profile" className="w-8 rounded-full" />
          <img src={Dropdown} alt="dropdown" className="w-2.5" />
          <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden  group-hover:block">
            <div className="min-w-48 bg-stone-100  rounded flex flex-col gap-4 p-4 text-left">
              <p
                className="hover:text-orange-500 cursor-pointer mb-0"
                onClick={() => {
                  const url = profile_link?.[path];
                  console.log("url->", url);
                  navigate(url);
                }}
              >
                My Profile
              </p>
              <p
                className="hover:text-orange-500 cursor-pointer mb-0"
                onClick={logout}
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
