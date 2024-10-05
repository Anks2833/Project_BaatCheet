import { NavLink, useLocation } from "react-router-dom";
import Routing from "./utils/Routing";

import { FaHeadset } from "react-icons/fa";
import Navbar from "./Components/Navbar";

const App = () => {
  const location = useLocation();
  const navLocation = useLocation();

  const visibleOnRoutes = ["/login", "/options", "/create", "/success"];
  const visibleNavRoutes = ["/"];

  const shouldShowNavLink = visibleOnRoutes.includes(location.pathname);
  const shouldShowNavBarLink = visibleNavRoutes.includes(navLocation.pathname);

  return (
    <>
      {shouldShowNavLink && (
        <NavLink to="/" className="w-fit absolute z-10 top-10 left-10 text-white text-3xl flex items-center gap-2 cup">
          <FaHeadset />
          <h1 className="text-xl">BaatCheet</h1>
        </NavLink>
      )}

      {shouldShowNavBarLink && (
        <Navbar />
      )}


      <Routing />
    </>
  );
};

export default App;
