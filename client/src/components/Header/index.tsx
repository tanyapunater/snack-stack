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
    <>
      <header className="sticky top-0 z-50 bg-blue-200">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-3xl font-extrabold text-blue-900">
            🍽️ Snack Stack
          </h1>

          <div className="flex gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-blue-800 hover:text-blue-600 font-medium transition cursor-pointer"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-4 items-center justify-center">
            {Auth.loggedIn() ? (
              <div className="flex items-center justify-center gap-4">
                <Link
                  to="/me"
                  className="text-blue-800 hover:text-blue-600 font-medium transition"
                >
                  {Auth.getProfile().data.username}'s Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-blue-800 hover:text-blue-600 font-medium transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <Link
                  to="/login"
                  className="rounded-md text-blue-800 px-4 py-2 hover:text-blue-600 font-medium transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
