import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuth, login } from "../redux/authSlice";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (isAuthenticated !== null) {
      dispatch(login(null));
      dispatch(isAuth(false));
    }
  };

  return (
    <div className="container mx-auto flex justify-between items-center">
      {isAuthenticated !== null ? (
        <ul className="flex">
          <li className="mr-6">
            <Link to="/">HOME</Link>
          </li>
          <li className="mr-6">
            <Link to="/about">ABOUT</Link>
          </li>
          <li className="mr-6">
            <Link to="/contact">CONTACT</Link>
          </li>
        </ul>
      ) : null}
      {isAuthenticated !== null ? (
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Buy Premium
      </button>
      ) : null}
      {isAuthenticated !== null ? (
        <button
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : null}
    </div>
  );
};

export default Header;
