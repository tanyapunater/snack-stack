import { Link } from "react-router-dom";
import { MouseEvent } from "react";
import Auth from "../../utils/auth";

const Header = () => {
  const navigation = [
    { name: "Home", to: "/" },
    { name: "Search", to: "/searchrecipes" },
    { name: "Create Your Own", to: "/addrecipe" },
  ];

  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo / App Name */}
        <Link to="/" className="text-xl font-bold text-indigo-600">
          Snack Stack
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          {Auth.loggedIn() ? (
            <>
              <Link
                to="/me"
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                {Auth.getProfile().data.username}'s Profile
              </Link>
              <button
                onClick={logout}
                className="text-sm font-medium text-gray-700 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
