import { Link, useResolvedPath } from "react-router-dom";
import { useEffect, useState } from "react";

function MenuItem({
  to,
  topLevelMenu = false,
  exact = false,
  children,
  ...props
}) {
  const { pathname } = useResolvedPath();
  let active = pathname.startsWith(to);
  if (active && exact) {
    active = pathname === to || pathname === to + "/";
  }

  return (
    <Link
      className={`inline-block font-sans px-4 text-left border-b-2 ${
        active
          ? topLevelMenu
            ? "bg-emerald-300 text-white border-white font-semibold"
            : "bg-gray-100"
          : "text-black hover:bg-gray-100"
      }`}
      to={to}
      {...props}>
      {children}
    </Link>
  );
}

export default function Sidebar({ ...props }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { pathname } = useResolvedPath();
  const [openMenu, setOpenMenu] = useState([]);

  useEffect(() => {
    if (pathname === "/") return;
    /**
     * This regex will remove everything after 2nd /
     * url - /something/this-part-will-remove - output - something
     */
    const menu = pathname.slice(1).replace(/[/].+/, "");
    setOpenMenu([menu]);
    /**
     * ! Don't add openMenu to dependency it will cause infinite render
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /**
   * @param {string} menu
   * @returns {boolean} is Active
   */
  const isMainMenuOpen = (menu) => {
    return openMenu.includes(menu);
  };

  return (
    <aside
      className={`relative shadow-xl min-h-screen w-full transition bg-white ${
        isMenuOpen ? "max-w-fit" : "max-w-0"
      }`}>
      <div className="overflow-hidden transition flex flex-col">
        <MenuItem to="/school" topLevelMenu={true}>
          School
        </MenuItem>

        <div
          className={`border-b-2 ${isMainMenuOpen("school") ? "" : "hidden"}`}>
          <div className="flex flex-col ml-2">
            <MenuItem to="/school" exact={true}>
              View
            </MenuItem>
            <MenuItem to="/school/add">Add new</MenuItem>
          </div>
        </div>

        <MenuItem to="/users" topLevelMenu={true}>
          Users
        </MenuItem>

        <div
          className={`border-b-2 ${isMainMenuOpen("users") ? "" : "hidden"}`}>
          <div className="flex flex-col ml-2">
            <MenuItem to="/users/admin">Admin</MenuItem>
            <MenuItem to="/users/accountant">Accountant</MenuItem>
            <MenuItem to="/users/student">Student</MenuItem>
            <MenuItem to="/users/librarian">Librarian</MenuItem>
            <MenuItem to="/users/parent">Parent</MenuItem>
            <MenuItem to="/users/teacher">Teacher</MenuItem>
          </div>
        </div>

        <MenuItem to="/class" topLevelMenu={true}>
          Class
        </MenuItem>
        <MenuItem to="/notice" topLevelMenu={true}>
          Notice
        </MenuItem>
        <MenuItem to="/exam" topLevelMenu={true}>
          Exam
        </MenuItem>
        <MenuItem to="/book" topLevelMenu={true}>
          Books
        </MenuItem>
      </div>

      <span
        title={isMenuOpen ? "close menu" : "open menu"}
        className={`inline-block absolute bg-emerald-300 rounded-full text-white font-extrabold font-lato p-1 px-2 cursor-pointer select-none transition top-52 z-20 ${
          isMenuOpen ? "-right-5" : "-left-2 hover:left-1"
        }`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? (
          <span className="inline-block rotate-180">&#10148;</span>
        ) : (
          <span>&#10148;</span>
        )}
      </span>
    </aside>
  );
}
